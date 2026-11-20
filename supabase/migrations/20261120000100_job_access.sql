-- Quản lý Job: phân quyền xem / chỉnh sửa.
--   * Ai có tài khoản cũng XEM được toàn bộ job và xuất báo cáo.
--   * Chỉ admin và những người admin thêm vào danh sách (job_editors) mới thêm/sửa/hoàn thành/xóa được.
-- Liên kết Google Sheet (URL Apps Script + TOKEN) nay chỉ nằm trên máy chủ (bảng job_sheet_config),
-- trình duyệt không bao giờ thấy TOKEN; mọi thao tác đi qua Edge Function "job-proxy" để kiểm quyền.
begin;

-- 1) Cấu hình dùng chung (1 dòng duy nhất). Không cấp quyền nào cho trình duyệt: chỉ Edge Function (service role) đọc/ghi.
create table public.job_sheet_config (
  id         boolean primary key default true check (id),
  script_url text not null check (
    char_length(script_url) <= 500
    and script_url ~ '^https://script\.google\.com/.+/exec$'
  ),
  token      text not null check (char_length(token) between 8 and 200),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);
alter table public.job_sheet_config enable row level security;
revoke all on public.job_sheet_config from public, anon, authenticated;

-- 2) Người được admin cho phép chỉnh sửa.
create table public.job_editors (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  added_by   uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.job_editors enable row level security;
revoke all on public.job_editors from public, anon, authenticated;

-- 3) Quyền của chính người đang đăng nhập: 'admin' | 'editor' | 'viewer'.
create function public.job_my_access() returns text
language sql stable security definer set search_path = '' as $$
  select case
    when public.is_admin() then 'admin'
    when exists (select 1 from public.job_editors e where e.user_id = (select auth.uid())) then 'editor'
    else 'viewer'
  end;
$$;

-- 4) Quản lý danh sách người được sửa (chỉ admin).
create function public.job_editors_list()
returns table (user_id uuid, email text, full_name text, created_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select e.user_id, u.email::text, p.full_name, e.created_at
    from public.job_editors e
    join auth.users u on u.id = e.user_id
    left join public.profiles p on p.id = e.user_id
    order by e.created_at;
end $$;

create function public.job_editor_add(p_email text) returns void
language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  select u.id into v_id from auth.users u where lower(u.email) = lower(btrim(p_email)) limit 1;
  if v_id is null then raise exception 'user_not_found'; end if;
  insert into public.job_editors (user_id, added_by) values (v_id, (select auth.uid()))
  on conflict (user_id) do nothing;
end $$;

create function public.job_editor_remove(p_user_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  delete from public.job_editors where user_id = p_user_id;
end $$;

revoke all on function public.job_my_access()            from public, anon, authenticated;
revoke all on function public.job_editors_list()         from public, anon, authenticated;
revoke all on function public.job_editor_add(text)       from public, anon, authenticated;
revoke all on function public.job_editor_remove(uuid)    from public, anon, authenticated;
grant execute on function public.job_my_access()         to authenticated;
grant execute on function public.job_editors_list()      to authenticated;
grant execute on function public.job_editor_add(text)    to authenticated;
grant execute on function public.job_editor_remove(uuid) to authenticated;

-- 5) Bảng cũ job_sheet_links (mỗi người từng tự lưu URL + TOKEN riêng) không còn được web dùng.
-- Migration này KHÔNG xóa nó. Khi đã chuyển xong, bạn có thể tự chạy dòng dưới để dọn các TOKEN cũ:
--   drop table if exists public.job_sheet_links;

commit;
