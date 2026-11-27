/**
 * Đổi dương lịch <-> âm lịch Việt Nam (múi giờ UTC+7), theo thuật toán của Hồ Ngọc Đức.
 * Chạy hoàn toàn trên trình duyệt, không cần thư viện ngoài.
 */
const TZ = 7;
const PI = Math.PI;

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export type LunarDate = { day: number; month: number; year: number; leap: boolean };

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  return jd;
}

function newMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Jd1 + C1 - deltat;
}

function sunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - PI * 2 * Math.floor(L / (PI * 2));
  return L;
}

const getSunLongitude = (dayNumber: number) => Math.floor((sunLongitude(dayNumber - 0.5 - TZ / 24) / PI) * 6);
const getNewMoonDay = (k: number) => Math.floor(newMoon(k) + 0.5 + TZ / 24);

function getLunarMonth11(yy: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k);
  if (getSunLongitude(nm) >= 9) nm = getNewMoonDay(k - 1);
  return nm;
}

function getLeapMonthOffset(a11: number): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i));
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i));
  } while (arc !== last && i < 14);
  return i - 1;
}

export function solarToLunar(dd: number, mm: number, yy: number): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k);
  let a11 = getLunarMonth11(yy);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let leap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11);
    if (diff >= leapOff) {
      lunarMonth = diff + 10;
      if (diff === leapOff) leap = true;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return { day: lunarDay, month: lunarMonth, year: lunarYear, leap };
}

/** Tên năm âm lịch, ví dụ "Bính Ngọ". */
export function yearName(lunarYear: number): string {
  return `${CAN[(lunarYear + 6) % 10]} ${CHI[(lunarYear + 8) % 12]}`;
}

/** Tên ngày can chi của một ngày dương lịch. */
export function dayCanChi(dd: number, mm: number, yy: number): string {
  const jd = jdFromDate(dd, mm, yy);
  return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
}

/** Nhãn hiển thị trong ô lịch: mùng 1 hiện "1/tháng", các ngày khác chỉ hiện số ngày. */
export function lunarLabel(l: LunarDate, withMonth = false): string {
  if (l.day === 1 || withMonth) return `${l.day}/${l.month}${l.leap ? "n" : ""}`;
  return String(l.day);
}

// ---------------------------------------------------------------------------
// Đổi ngược âm -> dương. Hai lịch lệch nhau theo từng năm nên ngày âm "15/7" rơi vào
// ngày dương khác nhau mỗi năm; ở đây dò từng ngày của năm dương để tìm đúng ngày.
// ---------------------------------------------------------------------------
type TableRow = { key: string; lunar: LunarDate };
const yearTables = new Map<number, TableRow[]>();

const pad2 = (n: number) => String(n).padStart(2, "0");

function yearTable(year: number): TableRow[] {
  const cached = yearTables.get(year);
  if (cached) return cached;
  const rows: TableRow[] = [];
  for (let m = 1; m <= 12; m++) {
    const total = new Date(year, m, 0).getDate();
    for (let d = 1; d <= total; d++) rows.push({ key: `${year}-${pad2(m)}-${pad2(d)}`, lunar: solarToLunar(d, m, year) });
  }
  yearTables.set(year, rows);
  return rows;
}

/** Ngày 30 mà tháng âm đó chỉ có 29 ngày (tháng thiếu) thì tính vào ngày 29 (ngày cuối tháng). */
function matchesDay(table: TableRow[], i: number, year: number, day: number): boolean {
  const current = table[i]!.lunar;
  if (current.day === day) return true;
  if (day !== 30 || current.day !== 29) return false;
  const next = table[i + 1]?.lunar ?? solarToLunar(1, 1, year + 1);
  return next.day === 1;
}

/** Tất cả ngày dương (yyyy-MM-dd) trong năm dương `year` có ngày âm là `day/month` (tháng thường, không nhuận). */
export function lunarOccurrences(year: number, month: number, day: number): string[] {
  const table = yearTable(year);
  const result: string[] = [];
  table.forEach((row, i) => {
    if (row.lunar.leap || row.lunar.month !== month) return;
    if (matchesDay(table, i, year, day)) result.push(row.key);
  });
  return result;
}

/** Ngày dương (yyyy-MM-dd) của một ngày âm trong năm âm `lunarYear`; null nếu không tồn tại (vd. tháng nhuận không có). */
export function lunarToSolar(day: number, month: number, lunarYear: number, leap = false): { key: string; adjusted: boolean } | null {
  // Năm âm bắt đầu quanh tháng 1-2 dương và kết thúc quanh tháng 1-2 năm sau, nên dò cả hai năm dương.
  for (const solarYear of [lunarYear, lunarYear + 1]) {
    const table = yearTable(solarYear);
    for (let i = 0; i < table.length; i++) {
      const l = table[i]!.lunar;
      if (l.year !== lunarYear || l.month !== month || l.leap !== leap) continue;
      if (matchesDay(table, i, solarYear, day)) return { key: table[i]!.key, adjusted: l.day !== day };
    }
  }
  return null;
}
