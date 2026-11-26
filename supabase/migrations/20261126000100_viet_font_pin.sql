-- Khóa 4 chữ số cho tiện ích "Việt hóa font".
-- Chỉ admin được đặt / đổi mã. Người khác nhập đúng mã mới vào được.
-- Mã được lưu dạng băm (bcrypt), không ai đọc lại được; nhập sai 5 lần sẽ bị khóa 15 phút.

begin;

create table if not exists public.utility_pins (
  tool text primary key,
  pin_hash text not null,
  version integer not null default 1,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

create table if not exists public.utility_pin_attempts (
  tool text not null,
  client text not null,
  fails integer not null default 0,
  window_start timestamptz not null default now(),
  locked_until timestamptz,
  primary key (tool, client)
);

-- Không có policy nào => không ai đọc / ghi trực tiếp được, chỉ qua các hàm bên dưới.
alter table public.utility_pins enable row level security;
alter table public.utility_pin_attempts enable row level security;
revoke all on public.utility_pins from public, anon, authenticated;
revoke all on public.utility_pin_attempts from public, anon, authenticated;

-- Trạng thái khóa: đã có mã chưa, phiên bản mã, người gọi có phải admin không.
create or replace function public.utility_pin_status(p_tool text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'is_set', exists (select 1 from public.utility_pins where tool = p_tool),
    'version', coalesce((select version from public.utility_pins where tool = p_tool), 0),
    'is_admin', coalesce(public.is_admin(), false)
  );
$$;

-- Kiểm tra mã người dùng nhập.
create or replace function public.utility_pin_verify(p_tool text, p_pin text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hash text;
  v_version integer;
  v_client text;
  v_c text;
  v_max integer;
  v_fails integer;
  v_remaining integer := 0;
  v_locked boolean := false;
begin
  if p_tool is null or p_pin is null or p_pin !~ '^[0-9]{4}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid');
  end if;

  v_client := btrim(split_part(coalesce((nullif(current_setting('request.headers', true), '')::jsonb) ->> 'x-forwarded-for', ''), ',', 1));
  if v_client = '' then v_client := 'unknown'; end if;

  if exists (
    select 1 from public.utility_pin_attempts
     where tool = p_tool and client in (v_client, '*') and locked_until > now()
  ) then
    return jsonb_build_object('ok', false, 'reason', 'locked');
  end if;

  select pin_hash, version into v_hash, v_version from public.utility_pins where tool = p_tool;
  if v_hash is null then
    return jsonb_build_object('ok', false, 'reason', 'not_set');
  end if;

  if extensions.crypt(p_pin, v_hash) = v_hash then
    delete from public.utility_pin_attempts where tool = p_tool and client = v_client;
    return jsonb_build_object('ok', true, 'version', v_version);
  end if;

  -- Sai mã: ghi nhận theo từng địa chỉ (tối đa 5 lần) và chung toàn hệ thống (tối đa 40 lần) trong 15 phút.
  foreach v_c in array array[v_client, '*'] loop
    v_max := case when v_c = '*' then 40 else 5 end;
    insert into public.utility_pin_attempts as a (tool, client, fails, window_start)
    values (p_tool, v_c, 1, now())
    on conflict (tool, client) do update
      set fails = case when a.window_start < now() - interval '15 minutes' then 1 else a.fails + 1 end,
          window_start = case when a.window_start < now() - interval '15 minutes' then now() else a.window_start end
    returning a.fails into v_fails;

    if v_c = v_client then v_remaining := greatest(0, 5 - v_fails); end if;

    if v_fails >= v_max then
      update public.utility_pin_attempts
         set locked_until = now() + interval '15 minutes', fails = 0
       where tool = p_tool and client = v_c;
      v_locked := true;
    end if;
  end loop;

  if v_locked then
    return jsonb_build_object('ok', false, 'reason', 'locked');
  end if;
  return jsonb_build_object('ok', false, 'reason', 'wrong', 'remaining', v_remaining);
end
$$;

-- Đặt / đổi mã (chỉ admin). Mỗi lần đổi, mọi người đã mở khóa trước đó sẽ phải nhập lại.
create or replace function public.utility_pin_set(p_tool text, p_pin text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or not coalesce(public.is_admin(), false) then
    raise exception 'Chỉ quản trị viên mới được đặt mã.';
  end if;
  if p_tool is distinct from 'viet-font' then
    raise exception 'Tiện ích không hợp lệ.';
  end if;
  if p_pin is null or p_pin !~ '^[0-9]{4}$' then
    raise exception 'Mã phải gồm đúng 4 chữ số.';
  end if;

  insert into public.utility_pins as t (tool, pin_hash, version, updated_by)
  values (p_tool, extensions.crypt(p_pin, extensions.gen_salt('bf')), 1, auth.uid())
  on conflict (tool) do update
    set pin_hash = excluded.pin_hash,
        version = t.version + 1,
        updated_at = now(),
        updated_by = auth.uid();

  delete from public.utility_pin_attempts where tool = p_tool;
  return jsonb_build_object('ok', true);
end
$$;

revoke all on function public.utility_pin_status(text) from public, anon, authenticated;
revoke all on function public.utility_pin_verify(text, text) from public, anon, authenticated;
revoke all on function public.utility_pin_set(text, text) from public, anon, authenticated;
grant execute on function public.utility_pin_status(text) to anon, authenticated;
grant execute on function public.utility_pin_verify(text, text) to anon, authenticated;
grant execute on function public.utility_pin_set(text, text) to authenticated;

commit;
