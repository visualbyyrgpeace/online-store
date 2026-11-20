-- Cho phép avatar là ảnh trong thư mục public/avatars (dạng "img:ten-file.jpg") bên cạnh bộ icon a01..a16.
begin;

alter table public.forum_profiles drop constraint if exists forum_profiles_avatar_check;
alter table public.forum_profiles
  add constraint forum_profiles_avatar_check
  check (avatar ~ '^(a(0[1-9]|1[0-6])|img:[A-Za-z0-9._-]{1,80})$');

create or replace function public.forum_save_profile(p_name text, p_avatar text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := (select auth.uid());
  v_blocked timestamptz;
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if public.is_banned(v_uid) then raise exception 'account_banned'; end if;
  select p.blocked_at into v_blocked from public.forum_profiles p where p.user_id = v_uid;
  if v_blocked is not null then raise exception 'blocked'; end if;
  if not exists (select 1 from public.forum_names n where n.name = p_name) then raise exception 'invalid_name'; end if;
  if p_avatar is null or p_avatar !~ '^(a(0[1-9]|1[0-6])|img:[A-Za-z0-9._-]{1,80})$' then raise exception 'invalid_avatar'; end if;
  insert into public.forum_profiles (user_id, display_name, avatar)
  values (v_uid, p_name, p_avatar)
  on conflict (user_id) do update
    set display_name = excluded.display_name, avatar = excluded.avatar, updated_at = now();
end $$;

commit;
