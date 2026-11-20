// Supabase Edge Function: cổng kiểm quyền cho "Quản lý Job".
//
// Trình duyệt KHÔNG còn biết URL Apps Script hay TOKEN. Mọi thao tác đi qua đây:
//   - list                         : mọi tài khoản đã đăng nhập (xem + xuất báo cáo)
//   - create / update / delete     : chỉ admin hoặc người nằm trong public.job_editors
//   - config_status / config_save / config_clear : chỉ admin
// Quyền được hỏi lại từ cơ sở dữ liệu (rpc job_my_access) bằng chính JWT của người gọi, nên không giả mạo được.
//
// Triển khai: supabase functions deploy job-proxy   (giữ "Verify JWT" BẬT, mặc định)
// SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY do Supabase cấp sẵn lúc chạy.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Luôn trả HTTP 200 kèm { ok, error } để trình duyệt đọc được mã lỗi.
function reply(body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
const fail = (error: string) => reply({ ok: false, error });

const EDITOR_ACTIONS = new Set(["create", "update", "delete"]); // muốn chỉ admin được xóa: bỏ "delete" ở đây và thêm vào ADMIN_ACTIONS
const ADMIN_ACTIONS = new Set(["config_status", "config_save", "config_clear"]);

const STATUS_LABELS = new Set(["Đã nhận", "Ưu tiên", "Đang thực hiện", "Kết thúc"]);
const TEXT_LIMITS: Record<string, number> = { task: 60, title: 300, designer: 60, assigner: 60 };
const SCRIPT_URL = /^https:\/\/script\.google\.com\/.+\/exec$/;
const REQUEST_TIMEOUT_MS = 25_000;

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

/** Chỉ cho phép đúng các trường biết trước, đúng kiểu và độ dài. */
function cleanFields(raw: unknown, allowStatus: boolean): Obj | null {
  if (!isObj(raw)) return null;
  const out: Obj = {};
  for (const [key, limit] of Object.entries(TEXT_LIMITS)) {
    if (raw[key] === undefined) continue;
    if (typeof raw[key] !== "string") return null;
    out[key] = (raw[key] as string).slice(0, limit);
  }
  if (raw.date !== undefined) {
    if (typeof raw.date !== "string" || !/^(\d{4}-\d{2}-\d{2})?$/.test(raw.date)) return null;
    out.date = raw.date;
  }
  if (raw.quantity !== undefined) {
    const q = Number(raw.quantity);
    if (!Number.isFinite(q)) return null;
    out.quantity = Math.max(1, Math.min(999, Math.round(q)));
  }
  // Job mới luôn là "Đã nhận" (script cũng ép lại); chỉ khi sửa mới được đổi trạng thái.
  if (allowStatus && raw.status !== undefined) {
    if (typeof raw.status !== "string" || !STATUS_LABELS.has(raw.status)) return null;
    out.status = raw.status;
  }
  return out;
}

async function callScript(url: string, token: string, payload: Obj): Promise<Obj> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    // text/plain tránh preflight; Apps Script trả 302 sang googleusercontent, fetch tự đi theo.
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, token }),
      signal: controller.signal,
    });
    const data = await response.json();
    if (!isObj(data)) return { ok: false, error: "bad_response" };
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return { ok: false, error: "timeout" };
    return { ok: false, error: "bad_response" };
  } finally {
    clearTimeout(timer);
  }
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return fail("bad_request");

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return fail("unauthenticated");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) return fail("server_misconfigured");

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData.user) return fail("unauthenticated");
  const userId = authData.user.id;

  const { data: access, error: accessError } = await userClient.rpc("job_my_access");
  if (accessError || typeof access !== "string") return fail("server_misconfigured");
  const canEdit = access === "admin" || access === "editor";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("bad_request");
  }
  if (!isObj(body) || typeof body.action !== "string") return fail("bad_request");
  const action = body.action;

  if (ADMIN_ACTIONS.has(action) && access !== "admin") return fail("forbidden");
  if (EDITOR_ACTIONS.has(action) && !canEdit) return fail("forbidden");

  const service = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // ---- Cấu hình (admin) ----
  if (action === "config_clear") {
    const { error } = await service.from("job_sheet_config").delete().eq("id", true);
    return error ? fail("server_misconfigured") : reply({ ok: true });
  }
  if (action === "config_save") {
    const scriptUrl = typeof body.scriptUrl === "string" ? body.scriptUrl.trim() : "";
    const token = typeof body.token === "string" ? body.token.trim() : "";
    if (!SCRIPT_URL.test(scriptUrl) || scriptUrl.length > 500 || token.length < 8 || token.length > 200) return fail("bad_request");
    const probe = await callScript(scriptUrl, token, { action: "list" }); // thử kết nối thật trước khi lưu
    if (probe.ok !== true) return fail(typeof probe.error === "string" ? probe.error : "bad_response");
    const { error } = await service
      .from("job_sheet_config")
      .upsert({ id: true, script_url: scriptUrl, token, updated_by: userId, updated_at: new Date().toISOString() }, { onConflict: "id" });
    return error ? fail("server_misconfigured") : reply({ ok: true });
  }

  const { data: config, error: configError } = await service.from("job_sheet_config").select("script_url, token").eq("id", true).maybeSingle();
  if (configError) return fail("server_misconfigured");
  if (action === "config_status") return reply({ ok: true, configured: Boolean(config) });
  if (!config) return fail("not_configured");
  const scriptUrl = String(config.script_url);
  const token = String(config.token);

  // ---- Đọc (mọi tài khoản) ----
  if (action === "list") {
    const tab = typeof body.tab === "string" && /^T([1-9]|1[0-2])$/.test(body.tab) ? body.tab : "";
    const result = await callScript(scriptUrl, token, tab ? { action: "list", tab } : { action: "list" });
    if (result.ok === true && !canEdit) {
      // Người chỉ xem không cần (và không nên có) đường dẫn tới file Google Sheet.
      result.sheetUrl = "";
      result.tabGids = {};
    }
    return reply({ ...result, access });
  }

  // ---- Ghi (admin + người được thêm) ----
  if (action === "create") {
    const job = cleanFields(body.job, false);
    if (!job) return fail("bad_request");
    return reply(await callScript(scriptUrl, token, { action: "create", job }));
  }
  if (action === "update") {
    const patch = cleanFields(body.patch, true);
    if (!patch || typeof body.id !== "string" || typeof body.expectedTitle !== "string") return fail("bad_request");
    return reply(await callScript(scriptUrl, token, { action: "update", id: body.id, expectedTitle: body.expectedTitle, patch }));
  }
  if (action === "delete") {
    if (typeof body.id !== "string" || typeof body.expectedTitle !== "string") return fail("bad_request");
    return reply(await callScript(scriptUrl, token, { action: "delete", id: body.id, expectedTitle: body.expectedTitle }));
  }

  return fail("unknown_action");
});
