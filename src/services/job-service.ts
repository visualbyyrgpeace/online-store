import { FunctionsHttpError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export type JobStatus = "received" | "priority" | "doing" | "done";

export type Job = {
  id: string; // dạng "T11:31" (tab:dòng) do script cấp
  tab: string;
  task: string; // loại task: Post Social, Sửa Ảnh, Thiệp…
  title: string;
  date: string; // deadline, yyyy-MM-dd ("" nếu trống)
  status: JobStatus;
  designer: string;
  quantity: number;
  assigner: string; // người giao (TASK ASSIGNMENT)
};

export type JobInput = Pick<Job, "task" | "title" | "date" | "status" | "designer" | "quantity" | "assigner">;
/** Job mới không có trạng thái do người dùng chọn: luôn tự là "Đã nhận". */
export type JobCreateInput = Omit<JobInput, "status">;

/** admin = quản trị; editor = người admin đã thêm; viewer = mọi tài khoản còn lại (chỉ xem + xuất báo cáo). */
export type JobAccess = "admin" | "editor" | "viewer";
export const canEditJobs = (access: JobAccess | null): boolean => access === "admin" || access === "editor";

/** Đúng chữ trong cột COMPLETED STATUS của bảng. */
export const STATUS_LABEL: Record<JobStatus, string> = {
  received: "Đã nhận",
  priority: "Ưu tiên",
  doing: "Đang thực hiện",
  done: "Kết thúc",
};

/** Gợi ý ban đầu (lấy từ bảng); các giá trị có trong dữ liệu sẽ được gộp thêm. */
export const DEFAULT_TASKS = ["Post Social", "Sửa Ảnh", "Banner", "Thiệp", "Task khác", "In ấn", "Sửa file ấn phẩm", "Mô hình 3D"];
export const DEFAULT_DESIGNERS = ["Vũ", "Thành"];
export const DEFAULT_ASSIGNERS = ["Ms. Ngân", "Ms. Diệu", "Ms. Tuyền", "Mr. Huy", "Mr. Vinh"];

export type JobErrorCode =
  | "token_not_set"
  | "unauthorized"
  | "not_found"
  | "missing_title"
  | "stale"
  | "protected"
  | "tab_other_year"
  | "no_source_tab"
  | "no_tab"
  | "no_layout"
  | "cell_has_formula"
  | "forbidden"
  | "not_configured"
  | "unauthenticated"
  | "proxy_missing"
  | "user_not_found"
  | "bad_request"
  | "server_misconfigured"
  | "bad_response"
  | "network"
  | "timeout"
  | "unknown";

export class JobApiError extends Error {
  readonly code: JobErrorCode;
  constructor(code: JobErrorCode, detail?: string) {
    super(detail ?? code);
    this.code = code;
  }
}

export function describeError(error: unknown): string {
  const code = error instanceof JobApiError ? error.code : "unknown";
  switch (code) {
    case "token_not_set":
      return "Trong Apps Script chưa đổi dòng TOKEN. Hãy đặt mật mã riêng rồi triển khai lại.";
    case "unauthorized":
      return "Mật mã không khớp với TOKEN trong Apps Script.";
    case "not_found":
    case "stale":
      return "Bảng vừa thay đổi (dòng này đã bị sửa, xóa hoặc dời chỗ). Hãy bấm Làm mới rồi thử lại.";
    case "protected":
      return "Tab này đang bị khóa, tài khoản của bạn không có quyền sửa.";
    case "tab_other_year":
      return "Tab của tháng này đang chứa việc của năm khác. Hãy đổi tên tab cũ (ví dụ T1-2026) để web tạo tab mới.";
    case "no_source_tab":
      return "Chưa có tab tháng nào để làm mẫu. Hãy tạo tab T1…T12 đầu tiên theo đúng cấu trúc bảng.";
    case "no_tab":
      return "Không thấy tab tháng nào (T10, T11, T12…) có dòng tiêu đề TASK / TITLE / DEADLINE trong file này.";
    case "no_layout":
      return "Không nhận ra dòng tiêu đề của tab. Cần có các cột TITLE, DEADLINE và COMPLETED STATUS.";
    case "cell_has_formula":
      return "Ô cần ghi đang chứa công thức nên web không ghi đè. Hãy nhập tay dòng này trong Sheet.";
    case "forbidden":
      return "Bạn chỉ có quyền xem. Chỉ admin và người được admin thêm mới chỉnh sửa được.";
    case "not_configured":
      return "Quản trị viên chưa kết nối Google Sheet cho mục này.";
    case "unauthenticated":
      return "Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại.";
    case "proxy_missing":
      return "Chưa triển khai Edge Function job-proxy trên Supabase (xem supabase/functions/job-proxy/README.md).";
    case "user_not_found":
      return "Không tìm thấy tài khoản nào có email này. Người đó cần đăng ký tài khoản trước.";
    case "bad_request":
      return "Dữ liệu gửi đi không hợp lệ. Hãy kiểm tra lại các ô đã nhập.";
    case "server_misconfigured":
      return "Máy chủ chưa cấu hình xong (chưa chạy migration hoặc thiếu khóa). Hãy báo quản trị viên.";
    case "missing_title":
      return "Hãy nhập tên công việc.";
    case "bad_response":
      return "Không đọc được phản hồi từ Google. Hãy kiểm tra đã triển khai web app với quyền truy cập “Bất kỳ ai”.";
    case "network":
      return "Không kết nối được tới Google. Kiểm tra mạng rồi thử lại.";
    case "timeout":
      return "Google phản hồi quá lâu. Vui lòng thử lại.";
    default: {
      const detail = error instanceof JobApiError && error.message !== "unknown" ? ` (mã lỗi: ${error.message.slice(0, 120)})` : "";
      return `Chưa thực hiện được. Vui lòng thử lại.${detail}`;
    }
  }
}

// ---- Chuẩn hóa dữ liệu đọc từ Sheet ----
function plain(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase();
}

function parseStatus(raw: string): JobStatus {
  const text = plain(raw);
  if (/ket thuc|xong|hoan thanh|done/.test(text)) return "done";
  if (/dang|doing|progress/.test(text)) return "doing";
  if (/uu tien|priority|gap/.test(text)) return "priority";
  return "received";
}

type RawJob = Record<string, unknown>;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseJob(raw: RawJob): Job | null {
  const id = text(raw.id);
  const title = text(raw.title);
  if (!id || !title) return null;
  const date = typeof raw.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.date) ? raw.date : "";
  const quantity = typeof raw.quantity === "number" && Number.isFinite(raw.quantity) && raw.quantity > 0 ? raw.quantity : 1;
  return {
    id,
    tab: text(raw.tab),
    task: text(raw.task),
    title,
    date,
    status: parseStatus(text(raw.status)),
    designer: text(raw.designer),
    quantity,
    assigner: text(raw.assigner),
  };
}

// ---- Gọi máy chủ (Edge Function job-proxy) ----
/** Chỉ nhận địa chỉ web app của Google (admin nhập khi kết nối). */
export function isValidScriptUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "script.google.com" && url.pathname.endsWith("/exec");
  } catch {
    return false;
  }
}

const KNOWN_ERRORS: JobErrorCode[] = [
  "token_not_set",
  "unauthorized",
  "not_found",
  "missing_title",
  "stale",
  "protected",
  "tab_other_year",
  "no_source_tab",
  "no_tab",
  "no_layout",
  "cell_has_formula",
  "forbidden",
  "not_configured",
  "unauthenticated",
  "bad_request",
  "server_misconfigured",
  "bad_response",
  "timeout",
];

async function call(payload: Record<string, unknown>): Promise<Record<string, unknown>> {
  const { data, error } = await createClient().functions.invoke("job-proxy", { body: payload });
  if (error) {
    if (error instanceof FunctionsHttpError) {
      const status = error.context instanceof Response ? error.context.status : 0;
      if (status === 404) throw new JobApiError("proxy_missing");
      if (status === 401) throw new JobApiError("unauthenticated");
    }
    throw new JobApiError("network");
  }
  if (typeof data !== "object" || data === null) throw new JobApiError("bad_response");
  const body = data as Record<string, unknown>;
  if (body.ok !== true) {
    const code = String(body.error ?? "");
    const match = KNOWN_ERRORS.find((item) => item === code);
    if (match) throw new JobApiError(match);
    throw new JobApiError("unknown", code);
  }
  return body;
}

function toSheetFields(input: Partial<JobInput>): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  if (input.task !== undefined) out.task = input.task;
  if (input.title !== undefined) out.title = input.title;
  if (input.date !== undefined) out.date = input.date;
  if (input.status !== undefined) out.status = STATUS_LABEL[input.status];
  if (input.designer !== undefined) out.designer = input.designer;
  if (input.quantity !== undefined) out.quantity = input.quantity;
  if (input.assigner !== undefined) out.assigner = input.assigner;
  return out;
}

function requireJob(raw: unknown): Job {
  const job = typeof raw === "object" && raw !== null ? parseJob(raw as RawJob) : null;
  if (!job) throw new JobApiError("bad_response");
  return job;
}

export type JobList = {
  jobs: Job[];
  /** Chỉ admin / người được sửa mới có (người chỉ xem nhận chuỗi rỗng). */
  sheetUrl: string;
  /** Tên các tab tháng trong file Sheet (T12, T11…), theo thứ tự trong file. */
  tabs: string[];
  /** Tab của tháng hiện tại. */
  currentTab: string;
  /** Các tab nằm trong phạm vi "gần đây" (tháng này ± 1). Rỗng nếu script cũ chưa cập nhật. */
  recentTabs: string[];
  /** Mã nội bộ (gid) của từng tab, để mở đúng tab trong Google Sheet. */
  tabGids: Record<string, number>;
  /** true nếu Apps Script trên Google còn là bản cũ (chưa có tự đồng bộ COMPLETED). */
  outdated: boolean;
};

/** Phiên bản script tối thiểu cho tự đồng bộ ô COMPLETED + trạng thái "Đã nhận". */
const SCRIPT_VERSION = 3;

function gidMap(value: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (typeof value === "object" && value !== null) {
    for (const [key, gid] of Object.entries(value)) if (typeof gid === "number" && Number.isFinite(gid)) out[key] = gid;
  }
  return out;
}

function textList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

/** tab: tên tab tháng muốn xem thêm (ví dụ "T9"); bỏ trống = các tháng gần đây. Mọi tài khoản đăng nhập đều gọi được. */
export async function listJobs(tab = ""): Promise<JobList> {
  const body = await call(tab ? { action: "list", tab } : { action: "list" });
  const rows = Array.isArray(body.jobs) ? (body.jobs as RawJob[]) : [];
  const jobs = rows.map(parseJob).filter((job): job is Job => job !== null);
  const tabs = textList(body.tabs);
  const version = typeof body.version === "number" ? body.version : 0;
  return {
    jobs,
    sheetUrl: typeof body.sheetUrl === "string" ? body.sheetUrl : "",
    // Script bản cũ chưa trả danh sách tab: tạm lấy từ chính dữ liệu.
    tabs: tabs.length > 0 ? tabs : [...new Set(jobs.map((job) => job.tab).filter(Boolean))],
    currentTab: typeof body.currentTab === "string" ? body.currentTab : "",
    recentTabs: textList(body.recentTabs),
    tabGids: gidMap(body.tabGids),
    outdated: !Array.isArray(body.tabs) || version < SCRIPT_VERSION,
  };
}

/** Chỉ admin / người được sửa. Trạng thái luôn tự là "Đã nhận" (cả web lẫn script đều ép như vậy). */
export async function createJob(input: JobCreateInput): Promise<{ job: Job; tabCreated: boolean }> {
  const body = await call({ action: "create", job: toSheetFields(input) });
  return { job: requireJob(body.job), tabCreated: body.tabCreated === true };
}

/** expectedTitle: tên việc lúc web tải, để script chắc chắn đang sửa đúng dòng. Đổi sang "Kết thúc" thì ô COMPLETED trong Sheet tự được tích. */
export async function updateJob(job: Pick<Job, "id" | "title">, patch: Partial<JobInput>): Promise<Job> {
  const body = await call({ action: "update", id: job.id, expectedTitle: job.title, patch: toSheetFields(patch) });
  return requireJob(body.job);
}

export async function deleteJob(job: Pick<Job, "id" | "title">): Promise<void> {
  await call({ action: "delete", id: job.id, expectedTitle: job.title });
}

// ---- Quyền của tài khoản hiện tại ----
export async function getMyJobAccess(): Promise<JobAccess> {
  const { data, error } = await createClient().rpc("job_my_access");
  if (error) throw error;
  return data === "admin" || data === "editor" ? data : "viewer";
}

// ---- Cấu hình liên kết Google Sheet (chỉ admin; URL + TOKEN nằm trên máy chủ) ----
export async function getSheetConfigured(): Promise<boolean> {
  const body = await call({ action: "config_status" });
  return body.configured === true;
}

/** Máy chủ thử kết nối thật tới Apps Script trước khi lưu. */
export async function saveSheetConfig(scriptUrl: string, token: string): Promise<void> {
  await call({ action: "config_save", scriptUrl, token });
}

export async function clearSheetConfig(): Promise<void> {
  await call({ action: "config_clear" });
}

// ---- Người được admin cho phép chỉnh sửa ----
export type JobEditor = { userId: string; email: string; fullName: string; addedAt: string };

export async function listJobEditors(): Promise<JobEditor[]> {
  const { data, error } = await createClient().rpc("job_editors_list");
  if (error) throw error;
  const rows = Array.isArray(data) ? (data as Record<string, unknown>[]) : [];
  return rows.map((row) => ({
    userId: String(row.user_id ?? ""),
    email: String(row.email ?? ""),
    fullName: typeof row.full_name === "string" ? row.full_name : "",
    addedAt: String(row.created_at ?? ""),
  }));
}

export async function addJobEditor(email: string): Promise<void> {
  const { error } = await createClient().rpc("job_editor_add", { p_email: email.trim() });
  if (error) {
    if (/user_not_found/.test(error.message)) throw new JobApiError("user_not_found");
    if (/forbidden/.test(error.message)) throw new JobApiError("forbidden");
    throw error;
  }
}

export async function removeJobEditor(userId: string): Promise<void> {
  const { error } = await createClient().rpc("job_editor_remove", { p_user_id: userId });
  if (error) throw error;
}
