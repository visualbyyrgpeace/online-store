"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CloseIcon, CopyIcon, PlusIcon } from "@/components/utilities/tool-icons";
import { JOB_APPS_SCRIPT } from "@/lib/job-apps-script";
import {
  addJobEditor,
  clearSheetConfig,
  describeError,
  isValidScriptUrl,
  listJobEditors,
  removeJobEditor,
  saveSheetConfig,
  type JobEditor,
} from "@/services/job-service";
import { copyText } from "@/utils/clipboard";

export const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100";
export const outlineButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50";
export const blackButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300";

const SETUP_STEPS: string[] = [
  "Mở file Google Sheet công việc (có các tab T1…T12) rồi vào menu Tiện ích mở rộng → Apps Script.",
  "Xóa mã cũ, bấm “Sao chép mã script” bên dưới rồi dán vào. Đổi dòng TOKEN thành mật mã riêng, dài và khó đoán (không dùng lại mật mã cũ), bấm Lưu.",
  "Bấm Triển khai → Tùy chọn triển khai mới → loại “Ứng dụng web”. Chọn Thực thi dưới tên: Tôi; Người có quyền truy cập: Bất kỳ ai. Bấm Triển khai và cấp quyền khi Google hỏi. (Nếu đã triển khai trước đó: Quản lý bản triển khai → bút chì → Phiên bản mới.)",
  "Trong Apps Script chọn hàm caiDatTuDong → Chạy (một lần, cấp quyền) để bật tự đồng bộ khi gõ/tick trực tiếp trong Sheet. Sau đó chọn hàm dongBoTatCa → Chạy (một lần) để đồng bộ các dòng có sẵn.",
  "Sao chép “URL ứng dụng web” (kết thúc bằng /exec), dán vào ô bên dưới cùng mật mã vừa đặt.",
];

/** Kết nối Google Sheet. Chỉ admin thấy. URL + mật mã được lưu trên máy chủ, không ai khác (kể cả admin) đọc lại được từ trình duyệt. */
export function SetupPanel({
  connected,
  onConnected,
  onDisconnected,
  onToast,
}: {
  connected: boolean;
  onConnected: () => void;
  onDisconnected: () => void;
  onToast: (text: string, ok?: boolean) => void;
}) {
  const [scriptUrl, setScriptUrl] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);

  async function connect(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const url = scriptUrl.trim();
    const secret = token.trim();
    if (!isValidScriptUrl(url)) {
      setError("Địa chỉ phải bắt đầu bằng https://script.google.com/ và kết thúc bằng /exec.");
      return;
    }
    if (secret.length < 8) {
      setError("Mật mã cần ít nhất 8 ký tự (giống dòng TOKEN trong Apps Script).");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await saveSheetConfig(url, secret); // máy chủ thử kết nối thật rồi mới lưu
      setScriptUrl("");
      setToken("");
      onConnected();
    } catch (err) {
      console.error(err);
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    setBusy(true);
    try {
      await clearSheetConfig();
      onDisconnected();
    } catch (err) {
      console.error(err);
      setError("Chưa ngắt kết nối được. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <ol className="space-y-3">
        {SETUP_STEPS.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-white">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void copyText(JOB_APPS_SCRIPT).then((ok) => onToast(ok ? "Đã sao chép mã script." : "Trình duyệt chưa cho phép sao chép.", ok))}
            className={outlineButton}
          >
            <CopyIcon className="h-4 w-4" />
            Sao chép mã script
          </button>
          <button type="button" onClick={() => setShowCode((current) => !current)} aria-expanded={showCode} className="h-10 rounded-xl px-2.5 text-sm font-medium text-slate-500 transition hover:text-slate-950">
            {showCode ? "Ẩn mã" : "Xem mã"}
          </button>
        </div>
        {showCode && <pre className="mt-3 max-h-64 overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-[11px] leading-5 text-slate-100">{JOB_APPS_SCRIPT}</pre>}
      </div>

      <form onSubmit={(event) => void connect(event)} className="space-y-4 rounded-2xl bg-slate-50 p-4">
        {connected && (
          <p role="status" className="rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-800">
            Đã kết nối Google Sheet. Muốn đổi sang script/mật mã mới thì nhập lại hai ô dưới (giá trị đang dùng được giữ kín trên máy chủ nên không hiển thị).
          </p>
        )}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">URL ứng dụng web</span>
          <input
            type="password"
            value={scriptUrl}
            onChange={(event) => setScriptUrl(event.target.value)}
            placeholder="https://script.google.com/macros/s/…/exec"
            spellCheck={false}
            autoComplete="off"
            className={`${inputClass} font-mono text-xs`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Mật mã (TOKEN)</span>
          <input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Giống dòng TOKEN trong Apps Script" autoComplete="off" className={inputClass} />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {connected ? (
            <button type="button" onClick={() => void disconnect()} disabled={busy} className="h-10 rounded-xl px-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50">
              Ngắt kết nối
            </button>
          ) : (
            <span />
          )}
          <button type="submit" disabled={busy} className={`${blackButton} px-6`}>
            {busy ? "Đang kết nối…" : connected ? "Lưu & kiểm tra" : "Kết nối Google Sheet"}
          </button>
        </div>
      </form>

      <p className="text-xs leading-5 text-slate-500">Mật mã chỉ lưu trên máy chủ, trình duyệt của thành viên không bao giờ thấy. Sau khi sửa mã Apps Script, nhớ Triển khai → Quản lý bản triển khai → chọn phiên bản mới để áp dụng.</p>
    </div>
  );
}

/** Admin thêm / bớt người được phép chỉnh sửa job (theo email tài khoản đã đăng ký). */
export function EditorsPanel({ onToast }: { onToast: (text: string, ok?: boolean) => void }) {
  const [editors, setEditors] = useState<JobEditor[] | null>(null);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((current) => current + 1), []);

  useEffect(() => {
    let current = true;
    listJobEditors().then(
      (rows) => {
        if (current) setEditors(rows);
      },
      (err) => {
        console.error(err);
        if (!current) return;
        setError("Không tải được danh sách. Hãy chạy migration job_access trên Supabase rồi thử lại.");
        setEditors([]);
      },
    );
    return () => {
      current = false;
    };
  }, [version]);

  async function add(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (busy || !value) return;
    setBusy(true);
    setError("");
    try {
      await addJobEditor(value);
      setEmail("");
      reload();
      onToast("Đã cho phép chỉnh sửa job.");
    } catch (err) {
      console.error(err);
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  }

  async function remove(editor: JobEditor) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await removeJobEditor(editor.userId);
      reload();
      onToast("Đã thu hồi quyền chỉnh sửa.");
    } catch (err) {
      console.error(err);
      setError("Chưa thu hồi được. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-slate-600">
        Mọi tài khoản đều xem được toàn bộ job và xuất báo cáo. Chỉ admin và những người bên dưới mới thêm, sửa, hoàn thành hoặc xóa được job.
      </p>

      <form onSubmit={(event) => void add(event)} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="Email tài khoản cần cho phép chỉnh sửa"
          autoComplete="off"
          className={inputClass}
        />
        <button type="submit" disabled={busy || email.trim() === ""} className={`${blackButton} h-11 shrink-0`}>
          <PlusIcon className="h-4 w-4" />
          Thêm
        </button>
      </form>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {editors === null ? (
        <div className="h-16 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />
      ) : editors.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">Chưa thêm ai. Hiện chỉ admin được chỉnh sửa.</p>
      ) : (
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
          {editors.map((editor) => (
            <li key={editor.userId} className="flex items-center gap-3 px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{editor.fullName || editor.email}</p>
                {editor.fullName && <p className="truncate text-xs text-slate-500">{editor.email}</p>}
              </div>
              <button
                type="button"
                onClick={() => void remove(editor)}
                disabled={busy}
                aria-label={`Thu hồi quyền của ${editor.email}`}
                title="Thu hồi quyền"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
