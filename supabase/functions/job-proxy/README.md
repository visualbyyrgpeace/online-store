# job-proxy

Cổng kiểm quyền cho "Quản lý Job". Trình duyệt không còn biết URL Apps Script / TOKEN; mọi thao tác đi qua đây.

| Hành động | Ai được dùng |
|---|---|
| `list` (xem job, xuất báo cáo) | mọi tài khoản đã đăng nhập |
| `create`, `update`, `delete` | admin + người nằm trong `job_editors` |
| `config_status`, `config_save`, `config_clear` | chỉ admin |

## Triển khai (làm đúng thứ tự)

1. Chạy migration `supabase/migrations/20261120000100_job_access.sql` (SQL Editor hoặc `supabase db push`).
2. `supabase functions deploy job-proxy` (giữ "Verify JWT" **bật**).
3. Trên Google: dán `Code.gs` mới vào Apps Script, đổi `TOKEN` sang mật mã mới, Triển khai → phiên bản mới,
   rồi chạy hàm `caiDatTuDong` và `dongBoTatCa` một lần.
4. Đăng nhập tài khoản admin → trang Quản lý Job → bánh răng → dán URL `/exec` + TOKEN → "Kết nối".
5. Cũng trong bánh răng: nhập email những người được phép chỉnh sửa.

## Muốn chỉ admin được xóa job?

Trong `index.ts`, bỏ `"delete"` khỏi `EDITOR_ACTIONS` và thêm vào `ADMIN_ACTIONS`.
