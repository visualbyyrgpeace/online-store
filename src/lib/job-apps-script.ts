/**
 * Mã Google Apps Script dán vào file Google Sheet "Nawon Marketing Design" (bản 3).
 * Đọc/ghi các tab tháng (T1…T12) theo đúng cột của bảng, KHÔNG đụng vào cột công thức (SCORE, DATE & TIME…)
 * và các bảng thống kê bên phải. Tự đồng bộ cột COMPLETED (ô tích) với trạng thái, job mới tự là "Đã nhận".
 * (Dùng String.raw, không có dấu ` hay ${ bên trong để chép nguyên văn.)
 */
export const JOB_APPS_SCRIPT = String.raw`// ===== Quản lý Job - bản 3 cho bảng Nawon Marketing Design =====
// BƯỚC QUAN TRỌNG 1: đổi TOKEN thành mật mã riêng, dài, khó đoán (ít nhất 8 ký tự).
//   Mật mã này CHỈ nhập một lần ở phần Cài đặt (admin) trên web; trình duyệt của mọi người không bao giờ thấy nó.
// BƯỚC QUAN TRỌNG 2: sau khi dán mã và triển khai, chạy hàm caiDatTuDong một lần (chọn hàm → Chạy) để bật
//   tự đồng bộ khi bạn gõ/tick trực tiếp trong Sheet; rồi chạy dongBoTatCa một lần để đồng bộ các dòng có sẵn.
var TOKEN = 'doi-ma-nay-thanh-mat-ma-rieng-cua-ban';
var PLACEHOLDER = 'doi-ma-nay-thanh-mat-ma-rieng-cua-ban';

// ID file Google Sheet (đoạn giữa /d/ và /edit trong địa chỉ của Sheet). Để trống nếu script được mở từ menu của chính file Sheet.
var SHEET_ID = '';

// Chữ trong cột COMPLETED STATUS. Phải khớp đúng danh sách chọn của bảng.
var NEW_LABEL = 'Đã nhận';
var DOING_LABEL = 'Đang thực hiện';
var DONE_LABEL = 'Kết thúc';

var TAB_PREFIX = 'T';   // tab tháng đặt tên T1, T2, ... T12
var MONTHS_BACK = 1;    // ngoài tháng này, đọc thêm bao nhiêu tháng trước (để thấy việc quá hạn)
var MONTHS_AHEAD = 1;   // và bao nhiêu tháng sau
var KEEP_DAYS = 93;     // việc có deadline cũ hơn số ngày này sẽ không hiện trên web
var CACHE_SECONDS = 15; // giữ kết quả đọc bảng vài giây để nhiều người cùng xem không đọc Sheet liên tục
var VERSION = 3;

function openSheet_() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function doGet() {
  return reply_({ ok: true, message: 'Job API dang chay', version: VERSION });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;
  try {
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!TOKEN || TOKEN === PLACEHOLDER || TOKEN.length < 8) return reply_({ ok: false, error: 'token_not_set' });
    if (req.token !== TOKEN) return reply_({ ok: false, error: 'unauthorized' });

    var ss = openSheet_();
    // Chỉ đọc: không cần khóa, và dùng bản lưu tạm nếu còn mới.
    if (req.action === 'list') return reply_(cachedList_(ss, req.tab));

    lock.waitLock(20000);
    locked = true;
    if (req.action === 'create') {
      var made = create_(ss, req.job || {});
      dropCache_();
      return reply_({ ok: true, job: made.job, tabCreated: made.tabCreated });
    }
    if (req.action === 'update') {
      var updated = update_(ss, req.id, req.expectedTitle, req.patch || {});
      dropCache_();
      return reply_({ ok: true, job: updated });
    }
    if (req.action === 'delete') {
      remove_(ss, req.id, req.expectedTitle);
      dropCache_();
      return reply_({ ok: true });
    }
    return reply_({ ok: false, error: 'unknown_action' });
  } catch (err) {
    var msg = String(err && err.message ? err.message : err);
    if (/protected/i.test(msg)) msg = 'protected';
    return reply_({ ok: false, error: msg });
  } finally {
    if (locked) lock.releaseLock();
  }
}

// ---------- Bản lưu tạm kết quả đọc bảng ----------
function listKey_(tab) {
  return 'list:' + (isMonthTab_(tab) ? tab : '');
}

function cachedList_(ss, tab) {
  var cache = CacheService.getScriptCache();
  var key = listKey_(tab);
  try {
    var hit = cache.get(key);
    if (hit) return JSON.parse(hit);
  } catch (err) {}
  var result = list_(ss, tab);
  if (result.ok) {
    try { cache.put(key, JSON.stringify(result), CACHE_SECONDS); } catch (err) {}
  }
  return result;
}

function dropCache_() {
  var keys = ['list:'];
  for (var m = 1; m <= 12; m++) keys.push('list:' + TAB_PREFIX + m);
  try { CacheService.getScriptCache().removeAll(keys); } catch (err) {}
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ---------- Tiện ích ----------
function clean_(v) {
  return String(v == null ? '' : v).replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function norm_(v) {
  var s = clean_(v);
  try { s = s.normalize('NFC'); } catch (err) {}
  return s.toUpperCase();
}

// Ô trạng thái có nghĩa là "xong" (chấp nhận vài cách viết quen thuộc).
function isDoneLabel_(v) {
  var t = norm_(v);
  return t === norm_(DONE_LABEL) || t === 'HOÀN THÀNH' || t === 'XONG' || t === 'DONE' || t === 'COMPLETED';
}

function isTicked_(v) {
  return v === true || norm_(v) === 'TRUE';
}

function pad_(n) {
  n = String(n);
  return n.length < 2 ? '0' + n : n;
}

// Ô ngày là Date hoặc chữ "d/M/yyyy" hoặc "yyyy-MM-dd"; luôn trả về "yyyy-MM-dd".
function dateText_(ss, v) {
  if (v instanceof Date) return Utilities.formatDate(v, ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
  var s = clean_(v);
  var p = s.split('/');
  if (p.length === 3 && p[2].length === 4) return p[2] + '-' + pad_(p[1]) + '-' + pad_(p[0]);
  if (s.length >= 10 && s.charAt(4) === '-' && s.charAt(7) === '-') return s.slice(0, 10);
  return '';
}

function todayText_(ss) {
  return Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
}

// T1…T12; vòng qua năm (tháng 12 thì đọc T11, T12 và T1).
function monthName_(m) {
  return TAB_PREFIX + ((((m - 1) % 12) + 12) % 12 + 1);
}

function tabNames_(ss) {
  var month = parseInt(todayText_(ss).slice(5, 7), 10);
  var names = [];
  for (var k = -MONTHS_BACK; k <= MONTHS_AHEAD; k++) names.push(monthName_(month + k));
  return names;
}

function cutoffText_(ss) {
  return Utilities.formatDate(new Date(new Date().getTime() - KEEP_DAYS * 86400000), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
}

function isMonthTab_(name) {
  var rest = String(name).slice(TAB_PREFIX.length);
  return String(name).indexOf(TAB_PREFIX) === 0 && /^[0-9]{1,2}$/.test(rest) && +rest >= 1 && +rest <= 12;
}

// Tìm dòng tiêu đề (TASK / TITLE / DEADLINE / ... STATUS ...) và vị trí từng cột.
function layout_(sheet) {
  var maxCol = Math.min(sheet.getLastColumn(), 30);
  var maxRow = Math.min(10, sheet.getMaxRows());
  if (maxCol < 1 || maxRow < 1) return null;
  var top = sheet.getRange(1, 1, maxRow, maxCol).getValues();
  for (var r = 0; r < top.length; r++) {
    var cols = {};
    for (var c = 0; c < maxCol; c++) {
      var h = norm_(top[r][c]);
      if (!h) continue;
      var key = null;
      if (h === 'TASK') key = 'task';
      else if (h === 'TITLE') key = 'title';
      else if (h === 'DEADLINE') key = 'date';
      else if (h.indexOf('STATUS') >= 0) key = 'status';
      else if (h === 'COMPLETED' || h === 'COMPLETE' || h === 'DONE') key = 'completed'; // cột ô tích
      else if (h === 'DESIGNER') key = 'designer';
      else if (h === 'QUANTITY') key = 'quantity';
      else if (h === 'TASK ASSIGNMENT') key = 'assigner';
      else if (h.indexOf('DATE') === 0 && h.indexOf('TIME') > 0) key = 'stamp';
      if (key && !cols[key]) cols[key] = c + 1;
    }
    if (cols.title && cols.date && cols.status) return { headerRow: r + 1, cols: cols };
  }
  return null;
}

function width_(lay) {
  var w = 1;
  for (var k in lay.cols) if (Object.prototype.hasOwnProperty.call(lay.cols, k) && lay.cols[k] > w) w = lay.cols[k];
  return w;
}

function pick_(lay, row, key) {
  return lay.cols[key] ? row[lay.cols[key] - 1] : '';
}

// Trạng thái hiển thị: ô COMPLETED đã tích thì luôn là "Kết thúc"; ô trạng thái trống thì là "Đã nhận".
function toJob_(ss, sheet, lay, rowNum, row) {
  var qty = parseFloat(pick_(lay, row, 'quantity'));
  var status = clean_(pick_(lay, row, 'status'));
  var blank = status === '';
  if (lay.cols.completed && isTicked_(pick_(lay, row, 'completed'))) status = DONE_LABEL;
  else if (blank) status = NEW_LABEL;
  return {
    id: sheet.getName() + ':' + rowNum,
    tab: sheet.getName(),
    task: clean_(pick_(lay, row, 'task')),
    title: clean_(pick_(lay, row, 'title')),
    date: dateText_(ss, pick_(lay, row, 'date')),
    status: status,
    statusBlank: blank,
    designer: clean_(pick_(lay, row, 'designer')),
    quantity: isNaN(qty) ? 1 : qty,
    assigner: clean_(pick_(lay, row, 'assigner'))
  };
}

function readTab_(ss, sheet, lay) {
  var first = lay.headerRow + 1;
  var n = sheet.getLastRow() - lay.headerRow;
  if (n < 1) return [];
  var values = sheet.getRange(first, 1, n, width_(lay)).getValues();
  var jobs = [];
  for (var i = 0; i < values.length; i++) {
    if (!clean_(pick_(lay, values[i], 'title'))) continue;
    jobs.push(toJob_(ss, sheet, lay, first + i, values[i]));
  }
  return jobs;
}

// wantedTab (tuỳ chọn): đọc thêm một tab tháng nằm ngoài phạm vi gần đây, ví dụ "T9".
function list_(ss, wantedTab) {
  var names = tabNames_(ss);
  var recent = names.slice();
  var wanted = isMonthTab_(wantedTab) ? String(wantedTab) : '';
  if (wanted && names.indexOf(wanted) < 0) names.push(wanted);
  var thisTab = TAB_PREFIX + parseInt(todayText_(ss).slice(5, 7), 10);
  var focusTab = wanted || thisTab;
  var cutoff = cutoffText_(ss);
  var jobs = [];
  var pending = []; // dòng đã có tên việc nhưng ô trạng thái còn trống -> tự điền "Đã nhận"
  var found = 0;
  for (var i = 0; i < names.length; i++) {
    var sheet = ss.getSheetByName(names[i]);
    if (!sheet) continue;
    var lay = layout_(sheet);
    if (!lay) continue;
    found++;
    var rows = readTab_(ss, sheet, lay);
    // Tab được chọn xem thì hiện đủ; các tab còn lại chỉ lấy việc chưa quá cũ.
    if (names[i] !== wanted) rows = rows.filter(function (j) { return !j.date || j.date >= cutoff; });
    if (recent.indexOf(names[i]) >= 0) {
      for (var p = 0; p < rows.length; p++) {
        if (rows[p].statusBlank && rows[p].status === NEW_LABEL) {
          pending.push({ sheet: sheet, lay: lay, row: parseInt(rows[p].id.split(':')[1], 10), job: rows[p] });
        }
      }
    }
    jobs = jobs.concat(rows);
  }
  if (found === 0) return { ok: false, error: 'no_tab' };
  fillNewRows_(pending);
  for (var q = 0; q < jobs.length; q++) delete jobs[q].statusBlank;
  var tabs = [];
  var gids = {};
  var all = ss.getSheets();
  for (var s = 0; s < all.length; s++) {
    var tabName = all[s].getName();
    if (!isMonthTab_(tabName)) continue;
    tabs.push(tabName);
    gids[tabName] = all[s].getSheetId();
  }
  var url = ss.getUrl() + (gids[focusTab] !== undefined ? '#gid=' + gids[focusTab] : '');
  return { ok: true, version: VERSION, jobs: jobs, sheetUrl: url, tabs: tabs, tabGids: gids, currentTab: thisTab, recentTabs: recent };
}

// Job mới được book thẳng trong Sheet (hoặc qua form) mà chưa có trạng thái: điền "Đã nhận" và bỏ tích COMPLETED.
function fillNewRows_(pending) {
  if (!pending.length) return;
  var lock = LockService.getScriptLock();
  var got = false;
  try {
    got = lock.tryLock(1500);
    if (!got) return;
    var limit = Math.min(pending.length, 60);
    for (var i = 0; i < limit; i++) {
      var it = pending[i];
      var cell = it.sheet.getRange(it.row, it.lay.cols.status);
      if (cell.getFormula() || clean_(cell.getValue())) continue; // có người vừa điền: không đè
      cell.setValue(NEW_LABEL);
      if (it.lay.cols.completed) setTick_(it.sheet.getRange(it.row, it.lay.cols.completed), false);
    }
  } catch (err) {
  } finally {
    if (got) lock.releaseLock();
  }
}

// id có dạng "T11:31" (tab:dòng). Chỉ cho phép tab tháng để không ghi nhầm tab khác.
function locate_(ss, id, expectedTitle) {
  var parts = String(id || '').split(':');
  if (parts.length !== 2 || !isMonthTab_(parts[0])) throw new Error('not_found');
  var sheet = ss.getSheetByName(parts[0]);
  var lay = sheet ? layout_(sheet) : null;
  var row = parseInt(parts[1], 10);
  if (!sheet || !lay || !(row > lay.headerRow) || row > sheet.getMaxRows()) throw new Error('not_found');
  // Bảng có thể đã bị sắp xếp/chèn dòng sau khi web tải: đối chiếu tên việc cho chắc.
  if (clean_(sheet.getRange(row, lay.cols.title).getValue()) !== clean_(expectedTitle)) throw new Error('stale');
  return { sheet: sheet, lay: lay, row: row };
}

function dateUsesObjects_(sheet, lay) {
  var n = sheet.getLastRow() - lay.headerRow;
  if (n < 1) return true;
  var vals = sheet.getRange(lay.headerRow + 1, lay.cols.date, n, 1).getValues();
  for (var i = 0; i < vals.length; i++) {
    if (vals[i][0] instanceof Date) return true;
    if (clean_(vals[i][0])) return false;
  }
  return true;
}

function safeText_(v, max) {
  var s = clean_(v).slice(0, max);
  return /^[=+\-@]/.test(s) ? ' ' + s : s; // không để nội dung bị hiểu là công thức
}

var LIMITS = { task: 60, title: 300, status: 30, designer: 60, assigner: 60 };

function cellValue_(ss, sheet, lay, key, raw) {
  if (key === 'quantity') {
    var q = parseFloat(raw);
    return isNaN(q) ? 1 : Math.max(1, Math.min(999, q));
  }
  if (key === 'date') {
    var t = dateText_(ss, raw);
    if (!t) return '';
    if (dateUsesObjects_(sheet, lay)) return Utilities.parseDate(t, ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
    return t.slice(8, 10) + '/' + t.slice(5, 7) + '/' + t.slice(0, 4);
  }
  return safeText_(raw, LIMITS[key]);
}

var INPUT_KEYS = ['task', 'title', 'date', 'status', 'designer', 'quantity', 'assigner'];

// Tích / bỏ tích ô COMPLETED. Ô đang có công thức thì bỏ qua (không ghi đè).
function setTick_(cell, on) {
  if (cell.getFormula()) return;
  var rule = cell.getDataValidation();
  var isBox = rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX;
  if (isBox) cell.setValue(on);
  else if (on) cell.setValue(true);
  else cell.clearContent();
}

// Ghi từng ô theo cột đã nhận diện; từ chối nếu ô đang chứa công thức (tránh ghi đè công thức của bạn).
// Đổi trạng thái thì ô COMPLETED tự tích khi "Kết thúc" và tự bỏ tích khi mở lại.
function writeCells_(ss, sheet, lay, rowNum, data) {
  var writes = [];
  for (var i = 0; i < INPUT_KEYS.length; i++) {
    var key = INPUT_KEYS[i];
    if (!Object.prototype.hasOwnProperty.call(data, key) || !lay.cols[key]) continue;
    var cell = sheet.getRange(rowNum, lay.cols[key]);
    if (cell.getFormula()) throw new Error('cell_has_formula');
    writes.push([cell, cellValue_(ss, sheet, lay, key, data[key])]);
  }
  for (var j = 0; j < writes.length; j++) writes[j][0].setValue(writes[j][1]);
  if (Object.prototype.hasOwnProperty.call(data, 'status') && lay.cols.completed) {
    setTick_(sheet.getRange(rowNum, lay.cols.completed), isDoneLabel_(data.status));
  }
}

function jobAt_(ss, sheet, lay, rowNum) {
  var job = toJob_(ss, sheet, lay, rowNum, sheet.getRange(rowNum, 1, 1, width_(lay)).getValues()[0]);
  delete job.statusBlank;
  return job;
}

function tabYear_(ss, sheet, lay) {
  var n = sheet.getLastRow() - lay.headerRow;
  if (n < 1) return 0;
  var vals = sheet.getRange(lay.headerRow + 1, lay.cols.date, n, 1).getValues();
  for (var i = 0; i < vals.length; i++) {
    var t = dateText_(ss, vals[i][0]);
    if (t) return parseInt(t.slice(0, 4), 10);
  }
  return 0;
}

function releaseProtections_(sheet) {
  try {
    var list = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    for (var i = 0; i < list.length; i++) if (list[i].canEdit()) list[i].remove();
  } catch (err) {}
}

// Tab mới: xóa dữ liệu cũ ở các cột nhập tay (kể cả ô COMPLETED), GIỮ NGUYÊN công thức, định dạng và bảng thống kê.
function clearCopy_(sheet) {
  var lay = layout_(sheet);
  if (!lay) throw new Error('no_layout');
  var first = lay.headerRow + 1;
  var n = sheet.getLastRow() - lay.headerRow;
  if (n < 1) return;
  var keys = INPUT_KEYS.concat(['stamp', 'completed']);
  for (var k = 0; k < keys.length; k++) {
    var col = lay.cols[keys[k]];
    if (!col) continue;
    var range = sheet.getRange(first, col, n, 1);
    var formulas = range.getFormulas();
    var any = false;
    for (var i = 0; i < n; i++) if (formulas[i][0]) any = true;
    if (!any) {
      range.clearContent();
    } else {
      for (var j = 0; j < n; j++) if (!formulas[j][0]) sheet.getRange(first + j, col).clearContent();
    }
  }
}

// Chưa có tab của tháng (ví dụ T12) thì nhân bản tab tháng gần nhất rồi dọn dữ liệu cũ.
function ensureTab_(ss, name, month) {
  var existing = ss.getSheetByName(name);
  if (existing) return { sheet: existing, created: false };
  var source = null;
  for (var k = 1; k <= 12 && !source; k++) {
    var cand = ss.getSheetByName(monthName_(month - k));
    if (cand && layout_(cand)) source = cand;
  }
  if (!source) throw new Error('no_source_tab');
  var copy = source.copyTo(ss);
  try {
    copy.setName(name);
    ss.setActiveSheet(copy);
    ss.moveActiveSheet(source.getIndex()); // đứng ngay trước tab nguồn, giống thứ tự T11, T10, ...
    releaseProtections_(copy);
    clearCopy_(copy);
  } catch (err) {
    ss.deleteSheet(copy);
    throw err;
  }
  return { sheet: copy, created: true };
}

function create_(ss, job) {
  if (!clean_(job.title)) throw new Error('missing_title');
  var t = dateText_(ss, job.date) || todayText_(ss);
  var year = parseInt(t.slice(0, 4), 10);
  var month = parseInt(t.slice(5, 7), 10);
  var tab = monthName_(month);

  // Tab T1 của năm cũ vẫn còn trong file thì không ghi nhầm việc năm mới vào đó.
  var old = ss.getSheetByName(tab);
  var oldLay = old ? layout_(old) : null;
  var oldYear = oldLay ? tabYear_(ss, old, oldLay) : 0;
  if (oldYear && oldYear !== year) throw new Error('tab_other_year');

  var made = ensureTab_(ss, tab, month);
  var sheet = made.sheet;
  var lay = layout_(sheet);
  if (!lay) throw new Error('no_layout');

  // Dòng trống đầu tiên: cả cột TASK và TITLE đều trống (các dòng dưới có thể đã có sẵn công thức điểm).
  var first = lay.headerRow + 1;
  var n = Math.max(sheet.getLastRow() - lay.headerRow, 0);
  var target = first + n;
  if (n > 0) {
    var titles = sheet.getRange(first, lay.cols.title, n, 1).getValues();
    var tasks = lay.cols.task ? sheet.getRange(first, lay.cols.task, n, 1).getValues() : null;
    for (var i = 0; i < n; i++) {
      if (!clean_(titles[i][0]) && !(tasks && clean_(tasks[i][0]))) {
        target = first + i;
        break;
      }
    }
  }
  if (target > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), target - sheet.getMaxRows());

  // Job mới LUÔN là "Đã nhận" và chưa tích COMPLETED, bất kể web gửi gì.
  var data = {
    task: job.task,
    title: job.title,
    date: t,
    status: NEW_LABEL,
    designer: job.designer,
    quantity: job.quantity,
    assigner: job.assigner
  };
  writeCells_(ss, sheet, lay, target, data);
  return { job: jobAt_(ss, sheet, lay, target), tabCreated: made.created };
}

function update_(ss, id, expectedTitle, patch) {
  var loc = locate_(ss, id, expectedTitle);
  if (Object.prototype.hasOwnProperty.call(patch, 'title') && !clean_(patch.title)) throw new Error('missing_title');
  writeCells_(ss, loc.sheet, loc.lay, loc.row, patch);
  return jobAt_(ss, loc.sheet, loc.lay, loc.row);
}

// "Xóa" = xóa nội dung các ô nhập liệu của dòng đó (cả ô COMPLETED). Không xóa dòng nên công thức và bảng thống kê vẫn nguyên.
function remove_(ss, id, expectedTitle) {
  var loc = locate_(ss, id, expectedTitle);
  var keys = INPUT_KEYS.concat(['completed']);
  for (var i = 0; i < keys.length; i++) {
    var col = loc.lay.cols[keys[i]];
    if (!col) continue;
    var cell = loc.sheet.getRange(loc.row, col);
    if (!cell.getFormula()) cell.clearContent();
  }
}

// ---------- Tự đồng bộ khi gõ / tick trực tiếp trong Sheet ----------
// Chạy bằng trình kích hoạt (trigger) tạo bởi caiDatTuDong(). Ghi bằng script không kích hoạt lại chính nó.
//   - Tích COMPLETED            -> trạng thái thành "Kết thúc"; bỏ tích -> "Đang thực hiện".
//   - Đổi trạng thái            -> "Kết thúc" thì tự tích COMPLETED, trạng thái khác thì bỏ tích.
//   - Gõ tên việc vào dòng mới  -> trạng thái tự là "Đã nhận".
function dongBoKhiSua(e) {
  try {
    if (!e || !e.range) return;
    var sheet = e.range.getSheet();
    if (!isMonthTab_(sheet.getName())) return;
    var lay = layout_(sheet);
    if (!lay) return;
    var r1 = Math.max(e.range.getRow(), lay.headerRow + 1);
    var r2 = Math.min(e.range.getLastRow(), r1 + 199); // dán nhiều dòng: xử lý tối đa 200 dòng
    if (r2 < r1) return;
    var c1 = e.range.getColumn();
    var c2 = e.range.getLastColumn();
    function hit(key) { return lay.cols[key] && lay.cols[key] >= c1 && lay.cols[key] <= c2; }
    var hitStatus = hit('status');
    var hitTick = hit('completed');
    var hitTitle = hit('title');
    if (!hitStatus && !hitTick && !hitTitle) return;
    for (var r = r1; r <= r2; r++) syncRow_(sheet, lay, r, hitStatus, hitTick, hitTitle);
  } catch (err) {}
}

function syncRow_(sheet, lay, r, hitStatus, hitTick, hitTitle) {
  var statusCell = sheet.getRange(r, lay.cols.status);
  var tickCell = lay.cols.completed ? sheet.getRange(r, lay.cols.completed) : null;
  var title = clean_(sheet.getRange(r, lay.cols.title).getValue());
  var status = clean_(statusCell.getValue());
  var canWriteStatus = !statusCell.getFormula();

  if (hitStatus) {
    if (!title) return;
    if (status === '' && canWriteStatus) { statusCell.setValue(NEW_LABEL); status = NEW_LABEL; }
    if (tickCell) setTick_(tickCell, isDoneLabel_(status));
  } else if (hitTick && tickCell) {
    var on = isTicked_(tickCell.getValue());
    if (on && canWriteStatus) statusCell.setValue(DONE_LABEL);
    else if (!on && isDoneLabel_(status) && canWriteStatus) statusCell.setValue(DOING_LABEL);
  } else if (hitTitle) {
    if (title && status === '' && canWriteStatus) {
      statusCell.setValue(NEW_LABEL);
      if (tickCell) setTick_(tickCell, false);
    }
  }
}

// Chạy MỘT LẦN (chọn hàm → Chạy → cấp quyền): bật tự đồng bộ khi sửa trực tiếp trong Sheet.
function caiDatTuDong() {
  var ss = openSheet_();
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'dongBoKhiSua') {
      Logger.log('Da bat tu dong bo tu truoc, khong tao them.');
      return;
    }
  }
  ScriptApp.newTrigger('dongBoKhiSua').forSpreadsheet(ss).onEdit().create();
  Logger.log('Da bat tu dong bo COMPLETED va trang thai khi sua trong Sheet.');
}

// Chạy MỘT LẦN sau khi cập nhật: đồng bộ các dòng có sẵn.
// Dòng "Kết thúc" mà chưa tích -> tích; dòng đã tích mà chưa "Kết thúc" -> "Kết thúc"; trạng thái trống -> "Đã nhận".
function dongBoTatCa() {
  var ss = openSheet_();
  var sheets = ss.getSheets();
  var changed = 0;
  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    if (!isMonthTab_(sheet.getName())) continue;
    var lay = layout_(sheet);
    if (!lay) continue;
    var first = lay.headerRow + 1;
    var n = sheet.getLastRow() - lay.headerRow;
    if (n < 1) continue;
    var titles = sheet.getRange(first, lay.cols.title, n, 1).getValues();
    var stRange = sheet.getRange(first, lay.cols.status, n, 1);
    var stVals = stRange.getValues();
    var stForms = stRange.getFormulas();
    var tkRange = lay.cols.completed ? sheet.getRange(first, lay.cols.completed, n, 1) : null;
    var tkVals = tkRange ? tkRange.getValues() : null;
    var tkForms = tkRange ? tkRange.getFormulas() : null;
    var stOut = [];
    var tkOut = [];
    for (var i = 0; i < n; i++) {
      var st = stForms[i][0] || stVals[i][0];
      var tk = tkForms ? (tkForms[i][0] || tkVals[i][0]) : '';
      if (clean_(titles[i][0]) && !stForms[i][0] && !(tkForms && tkForms[i][0])) {
        var label = clean_(stVals[i][0]);
        var ticked = tkVals ? isTicked_(tkVals[i][0]) : false;
        var done = isDoneLabel_(label) || ticked;
        if (label === '') label = NEW_LABEL;
        if (done) label = isDoneLabel_(label) ? label : DONE_LABEL;
        if (label !== clean_(stVals[i][0]) || (tkVals && done !== ticked)) changed++;
        st = label;
        tk = tkVals ? done : '';
      }
      stOut.push([st]);
      tkOut.push([tk]);
    }
    stRange.setValues(stOut);
    if (tkRange) {
      // Ô không phải hộp tích: chỉ ghi lại giá trị cũ, không tự thêm hộp tích.
      tkRange.setValues(tkOut);
    }
  }
  dropCache_();
  Logger.log('Da dong bo xong. So dong duoc chinh: ' + changed);
}

// ---------- Chạy thử trong Apps Script (chọn hàm kiemTra rồi bấm Chạy, xem Nhật ký thực thi) ----------
function kiemTra() {
  var ss = openSheet_();
  var r = list_(ss);
  Logger.log('File Sheet: ' + ss.getName());
  Logger.log('Ma la ban moi (co danh sach tab): ' + (r.tabs ? 'CO' : 'KHONG'));
  Logger.log('Danh sach tab: ' + JSON.stringify(r.tabs));
  Logger.log('Phien ban doGet: ' + JSON.parse(doGet().getContent()).version);
  Logger.log('URL web app: ' + ScriptApp.getService().getUrl());
  var lay = null;
  var any = ss.getSheetByName(r.currentTab);
  if (any) lay = layout_(any);
  Logger.log('Cot COMPLETED (o tich) tim thay: ' + (lay && lay.cols.completed ? 'CO (cot ' + lay.cols.completed + ')' : 'KHONG - kiem tra tieu de cot'));
}
`;
