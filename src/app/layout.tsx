import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { Footer, Header } from "@/components/header";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";
import "./globals.css";

const font = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Chính sách bảo mật nội dung (CSP). GitHub Pages không cho đặt HTTP header nên dùng thẻ <meta>.
// Chặn: script từ nguồn lạ (chống chèn mã XSS), plugin/object, đổi thẻ <base>, gửi form ra ngoài.
// Chỉ bật ở bản build thật; chế độ dev của Next cần 'unsafe-eval'.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // Next xuất tĩnh cần script inline khởi động
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https: wss:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_TAGLINE,
  manifest: `${basePath}/manifest.webmanifest`, // cho phép "Cài đặt ứng dụng": thông báo hiện tên app thay vì Google Chrome
  openGraph: { title: SITE_NAME, description: SITE_TAGLINE, type: "website", locale: "vi_VN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={font.variable}>
      <head>
        {process.env.NODE_ENV === "production" && <meta httpEquiv="Content-Security-Policy" content={csp} />}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {supabaseOrigin && (
          <>
            {/* Open the connection to Supabase early: faster first thumbnails and data. */}
            <link rel="preconnect" href={supabaseOrigin} />
            <link rel="preconnect" href={supabaseOrigin} crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
