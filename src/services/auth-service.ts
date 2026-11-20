import { createClient } from "@/lib/supabase/client";
import { absoluteUrl } from "@/lib/site";

export type Result = { ok: true } | { ok: false; message: string; unconfirmed?: boolean };
export type SignUpResult = { ok: true; needsConfirm: boolean } | { ok: false; message: string };

const GENERIC = "Có lỗi xảy ra, vui lòng thử lại sau.";
// Tài khoản cũ (tạo bằng tên đăng nhập) vẫn đăng nhập được qua địa chỉ email nội bộ này.
const USERNAME_EMAIL_DOMAIN = "accounts.online-store.invalid";

function authEmail(identifier: string): string {
  const value = identifier.trim();
  return value.includes("@") ? value.toLowerCase() : `${value.toLowerCase()}@${USERNAME_EMAIL_DOMAIN}`;
}

/** Đăng ký bằng email thật. Supabase gửi email xác nhận; chỉ sau khi bấm liên kết trong email mới đăng nhập được. */
export async function signUp(email: string, password: string): Promise<SignUpResult> {
  const normalized = email.trim().toLowerCase();
  const { data, error } = await createClient().auth.signUp({
    email: normalized,
    password,
    options: {
      data: { full_name: normalized.split("@")[0] },
      emailRedirectTo: absoluteUrl("/login/?verified=1"),
    },
  });
  if (error) {
    console.error(error);
    if (error.code === "weak_password") return { ok: false, message: "Mật khẩu quá yếu, hãy chọn mật khẩu khác." };
    if (error.code === "user_already_exists" || error.code === "email_exists") return { ok: false, message: "Email này đã được đăng ký." };
    if (error.code === "over_email_send_rate_limit" || error.status === 429) {
      return { ok: false, message: "Đã gửi quá nhiều email, vui lòng thử lại sau ít phút." };
    }
    if (error.code === "email_address_invalid") return { ok: false, message: "Email không hợp lệ." };
    return { ok: false, message: GENERIC };
  }
  // Email đã đăng ký: Supabase không báo lỗi mà trả về người dùng không có danh tính nào.
  if (data.user && data.user.identities?.length === 0) return { ok: false, message: "Email này đã được đăng ký." };
  return { ok: true, needsConfirm: !data.session };
}

export async function resendConfirmation(email: string): Promise<Result> {
  const { error } = await createClient().auth.resend({
    type: "signup",
    email: email.trim().toLowerCase(),
    options: { emailRedirectTo: absoluteUrl("/login/?verified=1") },
  });
  if (error) {
    console.error(error);
    if (error.code === "over_email_send_rate_limit" || error.status === 429) {
      return { ok: false, message: "Vui lòng chờ một lát rồi gửi lại." };
    }
    return { ok: false, message: GENERIC };
  }
  return { ok: true };
}

export async function signIn(identifier: string, password: string): Promise<Result> {
  const { error } = await createClient().auth.signInWithPassword({ email: authEmail(identifier), password });
  if (error) {
    console.error(error);
    if (error.code === "email_not_confirmed") {
      return { ok: false, unconfirmed: true, message: "Email chưa được xác nhận. Hãy mở hộp thư và bấm vào liên kết xác nhận." };
    }
    return { ok: false, message: error.status === 400 ? "Tên đăng nhập hoặc mật khẩu không đúng." : GENERIC };
  }
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const { error } = await createClient().auth.signOut();
  if (error) console.error(error);
}

export async function requestPasswordReset(email: string): Promise<Result> {
  const { error } = await createClient().auth.resetPasswordForEmail(email, {
    redirectTo: absoluteUrl("/reset-password/"),
  });
  if (error) console.error(error); // still report success to the user: no account enumeration
  return { ok: true };
}

export async function updatePassword(password: string): Promise<Result> {
  const { error } = await createClient().auth.updateUser({ password });
  if (error) {
    console.error(error);
    return { ok: false, message: error.code === "same_password" ? "Mật khẩu mới phải khác mật khẩu cũ." : GENERIC };
  }
  return { ok: true };
}
