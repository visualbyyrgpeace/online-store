-- Thả icon (reaction) bản 12 icon. Chạy được dù trước đó đã chạy 20261120000500 hay chưa.
begin;

create table if not exists public.forum_post_reactions (
  user_id    uuid not null references auth.users(id) on delete cascade,
  post_id    uuid not null references public.forum_posts(id) on delete cascade,
  reaction   text not null,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);
create index if not exists forum_post_reactions_user_idx on public.forum_post_reactions (user_id);

create table if not exists public.forum_comment_reactions (
  user_id    uuid not null references auth.users(id) on delete cascade,
  comment_id uuid not null references public.forum_comments(id) on delete cascade,
  reaction   text not null,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);
create index if not exists forum_comment_reactions_user_idx on public.forum_comment_reactions (user_id);

alter table public.forum_post_reactions    enable row level security;
alter table public.forum_comment_reactions enable row level security;
revoke all on public.forum_post_reactions, public.forum_comment_reactions from public, anon, authenticated;

-- Danh sách icon cho phép (đổi tại đây khi thêm icon mới).
alter table public.forum_post_reactions    drop constraint if exists forum_post_reactions_reaction_check;
alter table public.forum_comment_reactions drop constraint if exists forum_comment_reactions_reaction_check;
alter table public.forum_post_reactions
  add constraint forum_post_reactions_reaction_check
  check (reaction in ('like','love','haha','wow','sad','angry','fire','party','cool','star','skull','watch'));
alter table public.forum_comment_reactions
  add constraint forum_comment_reactions_reaction_check
  check (reaction in ('like','love','haha','wow','sad','angry','fire','party','cool','star','skull','watch'));

create or replace function public.forum_react(p_kind text, p_id uuid, p_reaction text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := public.forum_guard_writer();
  v_r   text := nullif(btrim(coalesce(p_reaction, '')), '');
begin
  if v_r is not null and v_r not in ('like','love','haha','wow','sad','angry','fire','party','cool','star','skull','watch') then
    raise exception 'invalid_reaction';
  end if;

  if p_kind = 'post' then
    if not exists (select 1 from public.forum_posts x where x.id = p_id and not x.hidden) then raise exception 'not_found'; end if;
    if v_r is null then
      delete from public.forum_post_reactions x where x.post_id = p_id and x.user_id = v_uid;
    else
      insert into public.forum_post_reactions (user_id, post_id, reaction) values (v_uid, p_id, v_r)
      on conflict (post_id, user_id) do update set reaction = excluded.reaction, created_at = now();
    end if;
  elsif p_kind = 'comment' then
    if not exists (
      select 1 from public.forum_comments c join public.forum_posts p on p.id = c.post_id
      where c.id = p_id and not c.hidden and not p.hidden
    ) then raise exception 'not_found'; end if;
    if v_r is null then
      delete from public.forum_comment_reactions x where x.comment_id = p_id and x.user_id = v_uid;
    else
      insert into public.forum_comment_reactions (user_id, comment_id, reaction) values (v_uid, p_id, v_r)
      on conflict (comment_id, user_id) do update set reaction = excluded.reaction, created_at = now();
    end if;
  else
    raise exception 'invalid_kind';
  end if;
end $$;

create or replace function public.forum_reactions_get(p_kind text, p_ids uuid[])
returns table (target_id uuid, reaction text, total bigint, mine boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if p_ids is null or cardinality(p_ids) = 0 then return; end if;
  if cardinality(p_ids) > 200 then raise exception 'invalid_body'; end if;

  if p_kind = 'post' then
    return query
      select r.post_id, r.reaction, count(*), coalesce(bool_or(r.user_id = v_uid), false)
      from public.forum_post_reactions r
      where r.post_id = any (p_ids)
      group by r.post_id, r.reaction;
  elsif p_kind = 'comment' then
    return query
      select r.comment_id, r.reaction, count(*), coalesce(bool_or(r.user_id = v_uid), false)
      from public.forum_comment_reactions r
      where r.comment_id = any (p_ids)
      group by r.comment_id, r.reaction;
  else
    raise exception 'invalid_kind';
  end if;
end $$;

do $$
declare f text;
begin
  foreach f in array array['forum_react(text,uuid,text)', 'forum_reactions_get(text,uuid[])'] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

commit;
