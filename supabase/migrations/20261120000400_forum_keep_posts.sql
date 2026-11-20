-- Đổi tên / avatar không bao giờ làm mất bài:
--   * Bài và bình luận gắn với TÀI KHOẢN (không gắn với tên hay avatar); hồ sơ thiếu thì vẫn hiện bài với tên "Ẩn danh".
--   * Tự tạo lại hồ sơ cho mọi tác giả đang có bài mà chưa có hồ sơ.
--   * Thêm chế độ xem "Bài của tôi".
--   * Lưu lại tên hiện tại được, kể cả khi admin đã xóa tên đó khỏi danh sách.
begin;

-- Khôi phục hồ sơ bị thiếu cho những ai đã đăng bài / bình luận.
insert into public.forum_profiles (user_id, display_name, avatar)
select u.id, coalesce((select n.name from public.forum_names n order by n.id limit 1), 'Ẩn danh'), 'a01'
from (select author_id as id from public.forum_posts union select author_id from public.forum_comments) u
where not exists (select 1 from public.forum_profiles p where p.user_id = u.id)
  and exists (select 1 from auth.users a where a.id = u.id);

-- Lưu hồ sơ: chọn lại tên hiện tại vẫn được dù tên đó đã bị xóa khỏi danh sách.
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
  if not exists (select 1 from public.forum_names n where n.name = p_name)
     and not exists (select 1 from public.forum_profiles p where p.user_id = v_uid and p.display_name = p_name) then
    raise exception 'invalid_name';
  end if;
  if p_avatar is null or p_avatar !~ '^(a(0[1-9]|1[0-6])|img:[A-Za-z0-9._-]{1,80})$' then raise exception 'invalid_avatar'; end if;
  insert into public.forum_profiles (user_id, display_name, avatar)
  values (v_uid, p_name, p_avatar)
  on conflict (user_id) do update
    set display_name = excluded.display_name, avatar = excluded.avatar, updated_at = now();
end $$;

-- Danh sách bài: nối mềm với hồ sơ, thêm chế độ "Bài của tôi".
drop function if exists public.forum_list_posts(integer, timestamptz, uuid);
create function public.forum_list_posts(
  p_limit integer default 20, p_before timestamptz default null, p_before_id uuid default null,
  p_mine boolean default false)
returns table (id uuid, title text, excerpt text, display_name text, avatar text,
               created_at timestamptz, comment_count bigint, is_mine boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select p.id, p.title, left(p.body, 280), coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), p.created_at,
           (select count(*) from public.forum_comments c where c.post_id = p.id and not c.hidden),
           p.author_id = v_uid
    from public.forum_posts p
    left join public.forum_profiles fp on fp.user_id = p.author_id
    where not p.hidden
      and (not coalesce(p_mine, false) or p.author_id = v_uid)
      and (p_before is null or (p.created_at, p.id) < (p_before, p_before_id))
    order by p.created_at desc, p.id desc
    limit greatest(1, least(coalesce(p_limit, 20), 50));
end $$;
revoke all on function public.forum_list_posts(integer, timestamptz, uuid, boolean) from public, anon, authenticated;
grant execute on function public.forum_list_posts(integer, timestamptz, uuid, boolean) to authenticated;

create or replace function public.forum_get_post(p_id uuid)
returns table (id uuid, title text, body text, display_name text, avatar text, created_at timestamptz, is_mine boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select p.id, p.title, p.body, coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), p.created_at, p.author_id = v_uid
    from public.forum_posts p
    left join public.forum_profiles fp on fp.user_id = p.author_id
    where p.id = p_id and not p.hidden;
end $$;

create or replace function public.forum_list_comments(p_post_id uuid)
returns table (id uuid, body text, display_name text, avatar text, created_at timestamptz,
               is_mine boolean, is_author boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select c.id, c.body, coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), c.created_at,
           c.author_id = v_uid, c.author_id = p.author_id
    from public.forum_comments c
    join public.forum_posts p on p.id = c.post_id
    left join public.forum_profiles fp on fp.user_id = c.author_id
    where c.post_id = p_post_id and not c.hidden and not p.hidden
    order by c.created_at, c.id
    limit 500;
end $$;

create or replace function public.forum_admin_posts()
returns table (id uuid, title text, excerpt text, display_name text, author_id uuid, author_email text,
               hidden boolean, author_blocked boolean, created_at timestamptz, comment_count bigint)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select p.id, p.title, left(p.body, 280), coalesce(fp.display_name, 'Ẩn danh'), p.author_id, u.email::text, p.hidden,
           fp.blocked_at is not null, p.created_at,
           (select count(*) from public.forum_comments c where c.post_id = p.id)
    from public.forum_posts p
    left join public.forum_profiles fp on fp.user_id = p.author_id
    join auth.users u on u.id = p.author_id
    order by p.created_at desc, p.id desc
    limit 100;
end $$;

create or replace function public.forum_admin_comments()
returns table (id uuid, post_id uuid, post_title text, body text, display_name text, author_id uuid,
               author_email text, hidden boolean, author_blocked boolean, created_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select c.id, c.post_id, p.title, c.body, coalesce(fp.display_name, 'Ẩn danh'), c.author_id, u.email::text, c.hidden,
           fp.blocked_at is not null, c.created_at
    from public.forum_comments c
    join public.forum_posts p on p.id = c.post_id
    left join public.forum_profiles fp on fp.user_id = c.author_id
    join auth.users u on u.id = c.author_id
    order by c.created_at desc, c.id desc
    limit 100;
end $$;

commit;
