-- Tiện ích "Lịch": ghi chú theo ngày (dương lịch). Chỉ admin được xem và ghi chú.
-- Mỗi ngày có thể có nhiều ghi chú; mục "lặp lại hằng năm" dùng cho sinh nhật, ngày kỷ niệm.

begin;

create table if not exists public.calendar_notes (
  id uuid primary key default gen_random_uuid(),
  note_date date not null,
  title text not null check (char_length(btrim(title)) between 1 and 120),
  detail text not null default '' check (char_length(detail) <= 1000),
  repeat_yearly boolean not null default false,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists calendar_notes_date_idx on public.calendar_notes (note_date);

alter table public.calendar_notes enable row level security;

revoke all on public.calendar_notes from public, anon;
grant select, insert, update, delete on public.calendar_notes to authenticated;

drop policy if exists calendar_notes_admin_select on public.calendar_notes;
drop policy if exists calendar_notes_admin_insert on public.calendar_notes;
drop policy if exists calendar_notes_admin_update on public.calendar_notes;
drop policy if exists calendar_notes_admin_delete on public.calendar_notes;

create policy calendar_notes_admin_select on public.calendar_notes
  for select to authenticated using ((select public.is_admin()));
create policy calendar_notes_admin_insert on public.calendar_notes
  for insert to authenticated with check ((select public.is_admin()));
create policy calendar_notes_admin_update on public.calendar_notes
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy calendar_notes_admin_delete on public.calendar_notes
  for delete to authenticated using ((select public.is_admin()));

-- Cho giao diện biết người đang xem có phải admin không (để ẩn/hiện phần ghi chú).
create or replace function public.calendar_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.is_admin(), false);
$$;

revoke all on function public.calendar_is_admin() from public, anon;
grant execute on function public.calendar_is_admin() to authenticated;

commit;
