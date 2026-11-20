-- Giangho Forum: diễn đàn ẩn danh cho mọi tài khoản.
--   * Bài viết và bình luận hiện dưới TÊN NHÂN VẬT + avatar có sẵn; tài khoản thật không bao giờ lộ ra cho thành viên khác
--     (các bảng khóa hoàn toàn với trình duyệt, chỉ đọc/ghi qua hàm bên dưới).
--   * Tên nhân vật chọn từ danh sách do admin quản lý (forum_names); avatar chỉ chọn trong bộ có sẵn của web, không tải ảnh lên.
--   * Từ cấm (forum_banned_words) được kiểm tra ngay trong cơ sở dữ liệu khi đăng bài / bình luận.
--   * Admin ẩn/xóa nội dung, chặn / bỏ chặn người dùng khỏi diễn đàn (forum_profiles.blocked_at).
begin;

-- ---------- Chuẩn hóa chữ để so khớp từ cấm: bỏ dấu tiếng Việt, hạ chữ thường, dấu câu thành khoảng trắng ----------
create function public.forum_norm(p text) returns text
language sql immutable set search_path = '' as $$
  select btrim(regexp_replace(
    lower(translate(normalize(coalesce(p, ''), NFC), 'àáạảãâầấậẩẫăằắặẳẵÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴèéẹẻẽêềếệểễÈÉẸẺẼÊỀẾỆỂỄìíịỉĩÌÍỊỈĨòóọỏõôồốộổỗơờớợởỡÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠùúụủũưừứựửữÙÚỤỦŨƯỪỨỰỬỮỳýỵỷỹỲÝỴỶỸđĐ', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeeeeeeeeiiiiiiiiiioooooooooooooooooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuuyyyyyyyyyydd')),
    '[^a-z0-9]+', ' ', 'g'));
$$;
revoke all on function public.forum_norm(text) from public, anon, authenticated;

-- ---------- Bảng ----------
create table public.forum_names (
  id         bigint generated always as identity primary key,
  name       text not null unique check (char_length(name) between 2 and 40),
  created_at timestamptz not null default now()
);

create table public.forum_profiles (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  display_name   text not null check (char_length(display_name) between 2 and 40),
  avatar         text not null check (avatar ~ '^a(0[1-9]|1[0-6])$'),
  blocked_at     timestamptz,
  blocked_reason text check (char_length(blocked_reason) <= 300),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table public.forum_posts (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid not null references auth.users(id) on delete cascade,
  title      text not null check (char_length(title) between 3 and 120),
  body       text not null check (char_length(body) between 1 and 5000),
  hidden     boolean not null default false,
  created_at timestamptz not null default now()
);
create index forum_posts_feed_idx   on public.forum_posts (created_at desc, id desc) where not hidden;
create index forum_posts_author_idx on public.forum_posts (author_id, created_at desc);

create table public.forum_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.forum_posts(id) on delete cascade,
  author_id  uuid not null references auth.users(id) on delete cascade,
  body       text not null check (char_length(body) between 1 and 1000),
  hidden     boolean not null default false,
  created_at timestamptz not null default now()
);
create index forum_comments_post_idx   on public.forum_comments (post_id, created_at);
create index forum_comments_author_idx on public.forum_comments (author_id, created_at desc);

create table public.forum_banned_words (
  id         bigint generated always as identity primary key,
  word       text not null unique check (char_length(word) between 1 and 60),
  created_at timestamptz not null default now()
);

-- Không cấp quyền nào cho trình duyệt: mọi thao tác đi qua hàm security definer bên dưới.
alter table public.forum_names        enable row level security;
alter table public.forum_profiles     enable row level security;
alter table public.forum_posts        enable row level security;
alter table public.forum_comments     enable row level security;
alter table public.forum_banned_words enable row level security;
revoke all on public.forum_names, public.forum_profiles, public.forum_posts, public.forum_comments, public.forum_banned_words
  from public, anon, authenticated;

insert into public.forum_names (name) values
  ('Tiến Bịp'), ('Khá Bảnh'), ('Dũng Trọc Hà Đông'), ('Long 9 Ngón'), ('Huấn Hoa Hồng'),
  ('Phú Lê'), ('Khánh Sky'), ('5 Can'), ('Hải Bánh'), ('Đàm Vĩnh Hưng');

-- ---------- Hàm nội bộ ----------
create function public.forum_has_banned_word(p_text text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from (select public.forum_norm(w.word) as n from public.forum_banned_words w) x
    where x.n <> '' and position(' ' || x.n || ' ' in ' ' || public.forum_norm(p_text) || ' ') > 0
  );
$$;

-- Người đang đăng nhập có được viết không? Trả về user id, hoặc báo lỗi.
create function public.forum_guard_writer() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare
  v_uid     uuid := (select auth.uid());
  v_blocked timestamptz;
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if public.is_banned(v_uid) then raise exception 'account_banned'; end if;
  select p.blocked_at into v_blocked from public.forum_profiles p where p.user_id = v_uid;
  if not found then raise exception 'no_profile'; end if;
  if v_blocked is not null then raise exception 'blocked'; end if;
  return v_uid;
end $$;

revoke all on function public.forum_has_banned_word(text) from public, anon, authenticated;
revoke all on function public.forum_guard_writer()        from public, anon, authenticated;

-- ---------- Hồ sơ nhân vật ----------
create function public.forum_my_profile()
returns table (display_name text, avatar text, blocked boolean)
language sql stable security definer set search_path = '' as $$
  select p.display_name, p.avatar, (p.blocked_at is not null or public.is_banned(p.user_id))
  from public.forum_profiles p
  where p.user_id = (select auth.uid());
$$;

create function public.forum_names_list()
returns table (id bigint, name text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if (select auth.uid()) is null then raise exception 'login_required'; end if;
  return query select n.id, n.name from public.forum_names n order by n.id;
end $$;

create function public.forum_save_profile(p_name text, p_avatar text) returns void
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
  if p_avatar is null or p_avatar !~ '^a(0[1-9]|1[0-6])$' then raise exception 'invalid_avatar'; end if;
  insert into public.forum_profiles (user_id, display_name, avatar)
  values (v_uid, p_name, p_avatar)
  on conflict (user_id) do update
    set display_name = excluded.display_name, avatar = excluded.avatar, updated_at = now();
end $$;

-- ---------- Đọc bài viết (mới nhất lên đầu, phân trang theo con trỏ) ----------
create function public.forum_list_posts(
  p_limit integer default 20, p_before timestamptz default null, p_before_id uuid default null)
returns table (id uuid, title text, excerpt text, display_name text, avatar text,
               created_at timestamptz, comment_count bigint, is_mine boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select p.id, p.title, left(p.body, 280), fp.display_name, fp.avatar, p.created_at,
           (select count(*) from public.forum_comments c where c.post_id = p.id and not c.hidden),
           p.author_id = v_uid
    from public.forum_posts p
    join public.forum_profiles fp on fp.user_id = p.author_id
    where not p.hidden
      and (p_before is null or (p.created_at, p.id) < (p_before, p_before_id))
    order by p.created_at desc, p.id desc
    limit greatest(1, least(coalesce(p_limit, 20), 50));
end $$;

create function public.forum_get_post(p_id uuid)
returns table (id uuid, title text, body text, display_name text, avatar text, created_at timestamptz, is_mine boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select p.id, p.title, p.body, fp.display_name, fp.avatar, p.created_at, p.author_id = v_uid
    from public.forum_posts p
    join public.forum_profiles fp on fp.user_id = p.author_id
    where p.id = p_id and not p.hidden;
end $$;

create function public.forum_list_comments(p_post_id uuid)
returns table (id uuid, body text, display_name text, avatar text, created_at timestamptz,
               is_mine boolean, is_author boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select c.id, c.body, fp.display_name, fp.avatar, c.created_at, c.author_id = v_uid, c.author_id = p.author_id
    from public.forum_comments c
    join public.forum_posts p on p.id = c.post_id
    join public.forum_profiles fp on fp.user_id = c.author_id
    where c.post_id = p_post_id and not c.hidden and not p.hidden
    order by c.created_at, c.id
    limit 500;
end $$;

-- ---------- Viết bài / bình luận / xóa ----------
create function public.forum_create_post(p_title text, p_body text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_uid   uuid := public.forum_guard_writer();
  v_title text := btrim(regexp_replace(coalesce(p_title, ''), '\s+', ' ', 'g'));
  v_body  text := btrim(regexp_replace(replace(coalesce(p_body, ''), E'\r', ''), E'\n{3,}', E'\n\n', 'g'));
  v_id    uuid;
begin
  if char_length(v_title) < 3 or char_length(v_title) > 120 then raise exception 'invalid_title'; end if;
  if char_length(v_body) < 1 or char_length(v_body) > 5000 then raise exception 'invalid_body'; end if;
  if public.forum_has_banned_word(v_title) or public.forum_has_banned_word(v_body) then raise exception 'banned_word'; end if;
  if exists (select 1 from public.forum_posts x where x.author_id = v_uid and x.created_at > now() - interval '30 seconds') then
    raise exception 'too_fast';
  end if;
  insert into public.forum_posts (author_id, title, body) values (v_uid, v_title, v_body) returning id into v_id;
  return v_id;
end $$;

create function public.forum_create_comment(p_post_id uuid, p_body text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_uid  uuid := public.forum_guard_writer();
  v_body text := btrim(regexp_replace(replace(coalesce(p_body, ''), E'\r', ''), E'\n{3,}', E'\n\n', 'g'));
  v_id   uuid;
begin
  if char_length(v_body) < 1 or char_length(v_body) > 1000 then raise exception 'invalid_body'; end if;
  if not exists (select 1 from public.forum_posts x where x.id = p_post_id and not x.hidden) then raise exception 'not_found'; end if;
  if public.forum_has_banned_word(v_body) then raise exception 'banned_word'; end if;
  if exists (select 1 from public.forum_comments x where x.author_id = v_uid and x.created_at > now() - interval '5 seconds') then
    raise exception 'too_fast';
  end if;
  insert into public.forum_comments (post_id, author_id, body) values (p_post_id, v_uid, v_body) returning id into v_id;
  return v_id;
end $$;

-- Tác giả xóa bài / bình luận của mình; admin xóa được của mọi người.
create function public.forum_delete_post(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  delete from public.forum_posts x where x.id = p_id and (x.author_id = v_uid or public.is_admin());
  if not found then raise exception 'not_found'; end if;
end $$;

create function public.forum_delete_comment(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  delete from public.forum_comments x where x.id = p_id and (x.author_id = v_uid or public.is_admin());
  if not found then raise exception 'not_found'; end if;
end $$;

-- ---------- Admin: kiểm duyệt ----------
create function public.forum_admin_posts()
returns table (id uuid, title text, excerpt text, display_name text, author_id uuid, author_email text,
               hidden boolean, author_blocked boolean, created_at timestamptz, comment_count bigint)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select p.id, p.title, left(p.body, 280), fp.display_name, p.author_id, u.email::text, p.hidden,
           fp.blocked_at is not null, p.created_at,
           (select count(*) from public.forum_comments c where c.post_id = p.id)
    from public.forum_posts p
    join public.forum_profiles fp on fp.user_id = p.author_id
    join auth.users u on u.id = p.author_id
    order by p.created_at desc, p.id desc
    limit 100;
end $$;

create function public.forum_admin_comments()
returns table (id uuid, post_id uuid, post_title text, body text, display_name text, author_id uuid,
               author_email text, hidden boolean, author_blocked boolean, created_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select c.id, c.post_id, p.title, c.body, fp.display_name, c.author_id, u.email::text, c.hidden,
           fp.blocked_at is not null, c.created_at
    from public.forum_comments c
    join public.forum_posts p on p.id = c.post_id
    join public.forum_profiles fp on fp.user_id = c.author_id
    join auth.users u on u.id = c.author_id
    order by c.created_at desc, c.id desc
    limit 100;
end $$;

create function public.forum_admin_set_hidden(p_kind text, p_id uuid, p_hidden boolean) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  if p_kind = 'post' then
    update public.forum_posts set hidden = coalesce(p_hidden, false) where id = p_id;
  elsif p_kind = 'comment' then
    update public.forum_comments set hidden = coalesce(p_hidden, false) where id = p_id;
  else
    raise exception 'invalid_kind';
  end if;
  if not found then raise exception 'not_found'; end if;
end $$;

-- ---------- Admin: chặn / bỏ chặn người dùng ----------
create function public.forum_admin_set_blocked(
  p_user_id uuid, p_blocked boolean, p_reason text default null, p_hide boolean default false) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  if exists (select 1 from public.profiles x where x.id = p_user_id and x.role = 'admin') then
    raise exception 'cannot_ban_admin';
  end if;
  update public.forum_profiles
     set blocked_at = case when p_blocked then now() else null end,
         blocked_reason = case when p_blocked then nullif(left(btrim(coalesce(p_reason, '')), 300), '') else null end
   where user_id = p_user_id;
  if not found then raise exception 'user_not_found'; end if;
  if p_blocked and coalesce(p_hide, false) then
    update public.forum_posts set hidden = true where author_id = p_user_id;
    update public.forum_comments set hidden = true where author_id = p_user_id;
  end if;
end $$;

create function public.forum_admin_blocked_list()
returns table (user_id uuid, email text, display_name text, blocked_at timestamptz, blocked_reason text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select fp.user_id, u.email::text, fp.display_name, fp.blocked_at, fp.blocked_reason
    from public.forum_profiles fp
    join auth.users u on u.id = fp.user_id
    where fp.blocked_at is not null
    order by fp.blocked_at desc;
end $$;

-- ---------- Admin: từ cấm ----------
create function public.forum_admin_words_list()
returns table (id bigint, word text, created_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query select w.id, w.word, w.created_at from public.forum_banned_words w order by w.created_at desc, w.id desc;
end $$;

create function public.forum_admin_word_add(p_word text) returns void
language plpgsql security definer set search_path = '' as $$
declare v_word text := btrim(regexp_replace(coalesce(p_word, ''), '\s+', ' ', 'g'));
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  if char_length(v_word) < 1 or char_length(v_word) > 60 or public.forum_norm(v_word) = '' then raise exception 'invalid_word'; end if;
  if exists (select 1 from public.forum_banned_words w where public.forum_norm(w.word) = public.forum_norm(v_word)) then return; end if;
  insert into public.forum_banned_words (word) values (v_word) on conflict (word) do nothing;
end $$;

create function public.forum_admin_word_remove(p_id bigint) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  delete from public.forum_banned_words where id = p_id;
end $$;

-- ---------- Admin: danh sách tên nhân vật ----------
create function public.forum_admin_name_add(p_name text) returns void
language plpgsql security definer set search_path = '' as $$
declare v_name text := btrim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g'));
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  if char_length(v_name) < 2 or char_length(v_name) > 40 then raise exception 'invalid_name'; end if;
  insert into public.forum_names (name) values (v_name) on conflict (name) do nothing;
end $$;

create function public.forum_admin_name_remove(p_id bigint) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  delete from public.forum_names where id = p_id;
end $$;

-- ---------- Quyền thực thi ----------
do $$
declare f text;
begin
  foreach f in array array[
    'forum_my_profile()', 'forum_names_list()', 'forum_save_profile(text,text)',
    'forum_list_posts(integer,timestamptz,uuid)', 'forum_get_post(uuid)', 'forum_list_comments(uuid)',
    'forum_create_post(text,text)', 'forum_create_comment(uuid,text)',
    'forum_delete_post(uuid)', 'forum_delete_comment(uuid)',
    'forum_admin_posts()', 'forum_admin_comments()', 'forum_admin_set_hidden(text,uuid,boolean)',
    'forum_admin_set_blocked(uuid,boolean,text,boolean)', 'forum_admin_blocked_list()',
    'forum_admin_words_list()', 'forum_admin_word_add(text)', 'forum_admin_word_remove(bigint)',
    'forum_admin_name_add(text)', 'forum_admin_name_remove(bigint)'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

commit;
