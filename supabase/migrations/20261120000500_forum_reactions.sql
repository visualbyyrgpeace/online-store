-- Thả cảm xúc (Thích, Yêu thích, Haha, Wow, Buồn, Phẫn nộ) cho bài viết và bình luận, kiểu Facebook.
-- Mỗi tài khoản thả tối đa 1 cảm xúc cho mỗi bài / bình luận; chọn lại cảm xúc khác thì đổi, bấm lại cùng cảm xúc thì bỏ.
begin;

create table if not exists public.forum_reactions (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  post_id    uuid references public.forum_posts(id) on delete cascade,
  comment_id uuid references public.forum_comments(id) on delete cascade,
  kind       text not null check (kind in ('like', 'love', 'haha', 'wow', 'sad', 'angry')),
  created_at timestamptz not null default now(),
  check ((post_id is not null)::int + (comment_id is not null)::int = 1)
);
create unique index if not exists forum_reactions_post_uq    on public.forum_reactions (user_id, post_id)    where post_id is not null;
create unique index if not exists forum_reactions_comment_uq on public.forum_reactions (user_id, comment_id) where comment_id is not null;
create index if not exists forum_reactions_post_idx    on public.forum_reactions (post_id)    where post_id is not null;
create index if not exists forum_reactions_comment_idx on public.forum_reactions (comment_id) where comment_id is not null;

alter table public.forum_reactions enable row level security;
revoke all on public.forum_reactions from public, anon, authenticated;

-- Thả / đổi / bỏ cảm xúc. p_reaction = null nghĩa là bỏ. Trả về số liệu mới của bài / bình luận đó.
drop function if exists public.forum_react(text, uuid, text);
create function public.forum_react(p_kind text, p_id uuid, p_reaction text)
returns table (reactions jsonb, my_reaction text)
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := public.forum_guard_writer();
begin
  if p_reaction is not null and p_reaction not in ('like', 'love', 'haha', 'wow', 'sad', 'angry') then
    raise exception 'invalid_reaction';
  end if;

  if p_kind = 'post' then
    if not exists (select 1 from public.forum_posts x where x.id = p_id and not x.hidden) then raise exception 'not_found'; end if;
    if p_reaction is null then
      delete from public.forum_reactions r where r.user_id = v_uid and r.post_id = p_id;
    else
      insert into public.forum_reactions (user_id, post_id, kind) values (v_uid, p_id, p_reaction)
      on conflict (user_id, post_id) where post_id is not null do update set kind = excluded.kind;
    end if;
    return query
      select coalesce((select jsonb_object_agg(g.kind, g.n)
                         from (select r.kind, count(*) as n from public.forum_reactions r where r.post_id = p_id group by r.kind) g), '{}'::jsonb),
             (select r.kind from public.forum_reactions r where r.post_id = p_id and r.user_id = v_uid);

  elsif p_kind = 'comment' then
    if not exists (select 1 from public.forum_comments c join public.forum_posts x on x.id = c.post_id
                    where c.id = p_id and not c.hidden and not x.hidden) then raise exception 'not_found'; end if;
    if p_reaction is null then
      delete from public.forum_reactions r where r.user_id = v_uid and r.comment_id = p_id;
    else
      insert into public.forum_reactions (user_id, comment_id, kind) values (v_uid, p_id, p_reaction)
      on conflict (user_id, comment_id) where comment_id is not null do update set kind = excluded.kind;
    end if;
    return query
      select coalesce((select jsonb_object_agg(g.kind, g.n)
                         from (select r.kind, count(*) as n from public.forum_reactions r where r.comment_id = p_id group by r.kind) g), '{}'::jsonb),
             (select r.kind from public.forum_reactions r where r.comment_id = p_id and r.user_id = v_uid);

  else
    raise exception 'invalid_kind';
  end if;
end $$;

-- Các hàm đọc trả thêm số cảm xúc và cảm xúc của chính người xem.
drop function if exists public.forum_list_posts(integer, timestamptz, uuid, boolean);
create function public.forum_list_posts(
  p_limit integer default 20, p_before timestamptz default null, p_before_id uuid default null,
  p_mine boolean default false)
returns table (id uuid, title text, excerpt text, display_name text, avatar text, created_at timestamptz,
               comment_count bigint, is_mine boolean, reactions jsonb, my_reaction text)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select p.id, p.title, left(p.body, 280), coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), p.created_at,
           (select count(*) from public.forum_comments c where c.post_id = p.id and not c.hidden),
           p.author_id = v_uid,
           coalesce((select jsonb_object_agg(g.kind, g.n)
                       from (select r.kind, count(*) as n from public.forum_reactions r where r.post_id = p.id group by r.kind) g), '{}'::jsonb),
           (select r.kind from public.forum_reactions r where r.post_id = p.id and r.user_id = v_uid)
    from public.forum_posts p
    left join public.forum_profiles fp on fp.user_id = p.author_id
    where not p.hidden
      and (not coalesce(p_mine, false) or p.author_id = v_uid)
      and (p_before is null or (p.created_at, p.id) < (p_before, p_before_id))
    order by p.created_at desc, p.id desc
    limit greatest(1, least(coalesce(p_limit, 20), 50));
end $$;

drop function if exists public.forum_get_post(uuid);
create function public.forum_get_post(p_id uuid)
returns table (id uuid, title text, body text, display_name text, avatar text, created_at timestamptz,
               is_mine boolean, reactions jsonb, my_reaction text)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select p.id, p.title, p.body, coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), p.created_at,
           p.author_id = v_uid,
           coalesce((select jsonb_object_agg(g.kind, g.n)
                       from (select r.kind, count(*) as n from public.forum_reactions r where r.post_id = p.id group by r.kind) g), '{}'::jsonb),
           (select r.kind from public.forum_reactions r where r.post_id = p.id and r.user_id = v_uid)
    from public.forum_posts p
    left join public.forum_profiles fp on fp.user_id = p.author_id
    where p.id = p_id and not p.hidden;
end $$;

drop function if exists public.forum_list_comments(uuid);
create function public.forum_list_comments(p_post_id uuid)
returns table (id uuid, body text, display_name text, avatar text, created_at timestamptz,
               is_mine boolean, is_author boolean, reactions jsonb, my_reaction text)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  return query
    select c.id, c.body, coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), c.created_at,
           c.author_id = v_uid, c.author_id = p.author_id,
           coalesce((select jsonb_object_agg(g.kind, g.n)
                       from (select r.kind, count(*) as n from public.forum_reactions r where r.comment_id = c.id group by r.kind) g), '{}'::jsonb),
           (select r.kind from public.forum_reactions r where r.comment_id = c.id and r.user_id = v_uid)
    from public.forum_comments c
    join public.forum_posts p on p.id = c.post_id
    left join public.forum_profiles fp on fp.user_id = c.author_id
    where c.post_id = p_post_id and not c.hidden and not p.hidden
    order by c.created_at, c.id
    limit 500;
end $$;

do $$
declare f text;
begin
  foreach f in array array[
    'forum_react(text,uuid,text)', 'forum_list_posts(integer,timestamptz,uuid,boolean)',
    'forum_get_post(uuid)', 'forum_list_comments(uuid)'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

commit;
