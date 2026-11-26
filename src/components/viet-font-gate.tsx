"use client";

import { useCallback, useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

const TOOL = "viet-font";
const STORE_KEY = "viet-font-unlocked";

type Status = { is_set: boolean; version: number; is_admin: boolean };
type VerifyResult = { ok: boolean; reason?: string; version?: number; remaining?: number };

const btn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300";
const card = "rounded-2xl border border-slate-200 bg-white p-5";
const pinInput =
  "h-12 w-full rounded-xl border border-slate-200 px-3 text-center text-2xl font-semibold tracking-[0.6em] outline-none focus:border-slate-900";

function readUnlocked(): string | null {
  try {
    return window.sessionStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
}

function writeUnlocked(value: string) {
  try {
    window.sessionStorage.setItem(STORE_KEY, value);
  } catch {
    /* trình duyệt chặn lưu trữ: người dùng sẽ phải nhập lại mỗi lần tải trang */
  }
}

const onlyDigits = (e: ChangeEvent<HTMLInputElement>) => e.target.value.replace(/\D/g, "").slice(0, 4);

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mx-auto h-9 w-9 text-slate-900">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** Thanh dành riêng cho admin: đặt hoặc đổi mã 4 số. */
function AdminPinBar({ isSet, onSaved }: { isSet: boolean; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    if (value.length !== 4 || saving) return;
    setSaving(true);
    setMsg("");
    const { error } = await createClient().rpc("utility_pin_set", { p_tool: TOOL, p_pin: value });
    setSaving(false);
    if (error) {
      setMsg(error.message || "Không lưu được mã.");
      return;
    }
    setValue("");
    setOpen(false);
    setMsg("Đã lưu mã mới. Người đã mở khóa trước đó sẽ phải nhập lại.");
    onSaved();
  }

  return (
    <div className={`${card} mb-5`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <b className="text-slate-900">Khóa tiện ích (chỉ admin thấy)</b>
          <p className="mt-0.5 text-slate-500">{isSet ? "Người khác phải nhập mã 4 số mới dùng được. Admin vào thẳng, không cần mã." : "Chưa đặt mã nên người khác chưa vào được tiện ích này."}</p>
        </div>
        {!open && (
          <button type="button" className={btn} onClick={() => { setOpen(true); setMsg(""); }}>
            {isSet ? "Đổi mã 4 số" : "Đặt mã 4 số"}
          </button>
        )}
      </div>
      {open && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={value}
            onChange={(e) => setValue(onlyDigits(e))}
            onKeyDown={(e) => {
              if (e.key === "Enter") void save();
            }}
            placeholder="••••"
            aria-label="Mã mới gồm 4 chữ số"
            className={`${pinInput} max-w-[10rem]`}
          />
          <button type="button" className={btnPrimary} disabled={value.length !== 4 || saving} onClick={() => void save()}>
            {saving ? "Đang lưu…" : "Lưu mã"}
          </button>
          <button type="button" className={btn} onClick={() => { setOpen(false); setValue(""); }}>
            Hủy
          </button>
        </div>
      )}
      {msg && <p className="mt-3 text-sm font-medium text-slate-700">{msg}</p>}
    </div>
  );
}

/** Bọc tiện ích: chỉ hiện nội dung khi là admin hoặc đã nhập đúng mã 4 số. */
export function VietFontGate({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<Status | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [unlockedVersion, setUnlockedVersion] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const loadStatus = useCallback(async () => {
    setLoadError(false);
    const { data, error } = await createClient().rpc("utility_pin_status", { p_tool: TOOL });
    if (error || !data) {
      setLoadError(true);
      return;
    }
    setStatus(data as Status);
  }, []);

  useEffect(() => {
    setUnlockedVersion(readUnlocked());
  }, []);

  useEffect(() => {
    if (!authLoading) void loadStatus();
  }, [authLoading, user?.id, loadStatus]);

  async function submit(value: string) {
    if (busy || value.length !== 4) return;
    setBusy(true);
    setMsg("");
    const { data, error } = await createClient().rpc("utility_pin_verify", { p_tool: TOOL, p_pin: value });
    setBusy(false);
    setPin("");
    if (error || !data) {
      setMsg("Không kiểm tra được mã. Vui lòng thử lại sau.");
      return;
    }
    const r = data as VerifyResult;
    if (r.ok) {
      writeUnlocked(String(r.version ?? 0));
      setUnlockedVersion(String(r.version ?? 0));
      return;
    }
    if (r.reason === "locked") setMsg("Nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.");
    else if (r.reason === "not_set") setMsg("Tiện ích chưa được mở. Hãy liên hệ quản trị viên.");
    else setMsg(`Mã không đúng.${typeof r.remaining === "number" ? ` Còn ${r.remaining} lần thử.` : ""}`);
  }

  if (loadError) {
    return (
      <div className={`${card} mx-auto max-w-sm text-center`}>
        <p className="text-sm text-slate-700">Không kiểm tra được khóa của tiện ích. Vui lòng thử lại.</p>
        <button type="button" className={`${btn} mt-4`} onClick={() => void loadStatus()}>
          Thử lại
        </button>
      </div>
    );
  }

  if (!status) {
    return <p className="text-center text-sm text-slate-500">Đang kiểm tra…</p>;
  }

  if (status.is_admin) {
    return (
      <>
        <AdminPinBar isSet={status.is_set} onSaved={() => void loadStatus()} />
        {children}
      </>
    );
  }

  if (status.is_set && unlockedVersion === String(status.version)) {
    return <>{children}</>;
  }

  return (
    <div className={`${card} mx-auto max-w-sm space-y-4 text-center`}>
      <LockIcon />
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Tiện ích đang khóa</h2>
        <p className="mt-1 text-sm text-slate-500">{status.is_set ? "Nhập mã 4 chữ số để sử dụng." : "Tiện ích chưa được mở. Hãy liên hệ quản trị viên."}</p>
      </div>
      {status.is_set && (
        <input
          type="password"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          maxLength={4}
          value={pin}
          disabled={busy}
          onChange={(e) => {
            const v = onlyDigits(e);
            setPin(v);
            if (v.length === 4) void submit(v);
          }}
          placeholder="••••"
          aria-label="Mã gồm 4 chữ số"
          className={pinInput}
        />
      )}
      {msg && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {msg}
        </p>
      )}
    </div>
  );
}
