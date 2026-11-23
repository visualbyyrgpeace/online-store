-- Giangho Forum: nhạc chung. Ai có tài khoản cũng dán được link YouTube; bài dán sau vào danh sách chờ.
--   * Mọi người đang mở diễn đàn nghe cùng một bài, cùng một thời điểm (server giữ giờ bắt đầu của bài đang phát).
--   * Bảng khóa hoàn toàn với trình duyệt, chỉ đọc/ghi qua hàm bên dưới; người xem chỉ thấy TÊN NHÂN VẬT, không thấy tài khoản thật.
--   * Chạy lại nhiều lần vẫn an toàn.
begin;

create table if not exists public.forum_music (
  id               uuid primary key default gen_random_uuid(),
  added_by         uuid not null references auth.users(id) on delete cascade,
  video_id         text not null check (video_id ~ '^[A-Za-z0-9_-]{11}$'),
  title            text not null check (char_length(title) between 1 and 200),
  duration_seconds integer check (duration_seconds between 1 and 43200),
  started_at       timestamptz,           -- có giá trị = bài đang phát
  created_at       timestamptz not null default now()
);
create index if not exists forum_music_order_idx on public.forum_music (created_at, id);
-- Tại mọi thời điểm chỉ có tối đa MỘT bài đang phát.
create unique index if not exists forum_music_one_playing on public.forum_music ((true)) where started_at is not null;

alter table public.forum_music enable row level security;
revoke all on public.forum_music from public, anon, authenticated;

drop function if exists public.forum_music_advance();
drop function if exists public.forum_music_state();
drop function if exists public.forum_music_add(text, text);
drop function if exists public.forum_music_next(uuid);
drop function if exists public.forum_music_set_meta(uuid, integer, text);
drop function if exists public.forum_music_remove(uuid);

-- ---------- Nội bộ: bỏ bài đã hết giờ, nếu chưa có bài nào đang phát thì bật bài chờ đầu tiên ----------
create function public.forum_music_advance() returns void
language plpgsql security definer set search_path = '' as $$
begin
  delete from public.forum_music m
  where m.started_at is not null
    and ((m.duration_seconds is not null and now() > m.started_at + make_interval(secs => m.duration_seconds + 4))
         or now() > m.started_at + interval '12 hours');

  if not exists (select 1 from public.forum_music m where m.started_at is not null) then
    update public.forum_music set started_at = now()
    where id = (select m.id from public.forum_music m order by m.created_at, m.id limit 1);
  end if;
end $$;
revoke all on function public.forum_music_advance() from public, anon, authenticated;

-- ---------- Đọc: bài đang phát (đứng đầu) + danh sách chờ ----------
create function public.forum_music_state()
returns table (id uuid, video_id text, title text, duration_seconds integer, display_name text, avatar text,
               is_current boolean, elapsed_ms bigint, can_remove boolean)
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if public.is_banned(v_uid) then raise exception 'account_banned'; end if;
  perform pg_advisory_xact_lock(hashtext('forum_music'));
  perform public.forum_music_advance();
  return query
    select m.id, m.video_id, m.title, m.duration_seconds,
           coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'),
           m.started_at is not null,
           case when m.started_at is null then 0::bigint
                else greatest(0, (extract(epoch from (clock_timestamp() - m.started_at)) * 1000)::bigint) end,
           (m.added_by = v_uid or public.is_admin())
    from public.forum_music m
    left join public.forum_profiles fp on fp.user_id = m.added_by
    order by (m.started_at is null), m.created_at, m.id
    limit 50;
end $$;

-- ---------- Thêm bài ----------
create function public.forum_music_add(p_video_id text, p_title text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_uid   uuid := public.forum_guard_writer();
  v_vid   text := btrim(coalesce(p_video_id, ''));
  v_title text := left(btrim(regexp_replace(coalesce(p_title, ''), '\s+', ' ', 'g')), 200);
  v_id    uuid;
begin
  if v_vid !~ '^[A-Za-z0-9_-]{11}$' then raise exception 'invalid_link'; end if;
  if v_title = '' then v_title := 'Bài hát YouTube'; end if;
  if public.forum_has_banned_word(v_title) then raise exception 'banned_word'; end if;

  perform pg_advisory_xact_lock(hashtext('forum_music'));
  perform public.forum_music_advance();

  if exists (select 1 from public.forum_music m where m.video_id = v_vid) then raise exception 'already_queued'; end if;
  if (select count(*) from public.forum_music m where m.added_by = v_uid) >= 5 then raise exception 'queue_limit'; end if;
  if (select count(*) from public.forum_music m) >= 30 then raise exception 'queue_full'; end if;
  if exists (select 1 from public.forum_music m where m.added_by = v_uid and m.created_at > now() - interval '8 seconds') then
    raise exception 'too_fast';
  end if;

  insert into public.forum_music (added_by, video_id, title) values (v_uid, v_vid, v_title) returning id into v_id;
  perform public.forum_music_advance();   -- đang không có bài nào thì bài này phát ngay
  return v_id;
end $$;

-- ---------- Hết bài: máy nghe nào cũng báo được, nhưng chỉ có tác dụng khi bài đó thật sự đã hết (hoặc chưa biết độ dài) ----------
create function public.forum_music_next(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  perform pg_advisory_xact_lock(hashtext('forum_music'));
  delete from public.forum_music m
  where m.id = p_id and m.started_at is not null
    and (m.duration_seconds is null or now() >= m.started_at + make_interval(secs => greatest(m.duration_seconds - 5, 0)));
  perform public.forum_music_advance();
end $$;

-- ---------- Máy đang phát bổ sung độ dài / tên thật cho bài đang phát (chỉ điền chỗ còn thiếu) ----------
create function public.forum_music_set_meta(p_id uuid, p_duration integer, p_title text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_uid   uuid := (select auth.uid());
  v_title text := left(btrim(regexp_replace(coalesce(p_title, ''), '\s+', ' ', 'g')), 200);
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if v_title <> '' and public.forum_has_banned_word(v_title) then v_title := ''; end if;
  update public.forum_music m
  set duration_seconds = case when m.duration_seconds is null and p_duration between 1 and 43200 then p_duration else m.duration_seconds end,
      title = case when v_title <> '' and m.title = 'Bài hát YouTube' then v_title else m.title end
  where m.id = p_id and m.started_at is not null;
end $$;

-- ---------- Xóa / bỏ qua: người thêm bài hoặc admin ----------
create function public.forum_music_remove(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  perform pg_advisory_xact_lock(hashtext('forum_music'));
  delete from public.forum_music m where m.id = p_id and (m.added_by = v_uid or public.is_admin());
  if not found then raise exception 'not_found'; end if;
  perform public.forum_music_advance();
end $$;

revoke all on function public.forum_music_state()                          from public, anon, authenticated;
revoke all on function public.forum_music_add(text, text)                  from public, anon, authenticated;
revoke all on function public.forum_music_next(uuid)                       from public, anon, authenticated;
revoke all on function public.forum_music_set_meta(uuid, integer, text)    from public, anon, authenticated;
revoke all on function public.forum_music_remove(uuid)                     from public, anon, authenticated;
grant execute on function public.forum_music_state()                       to authenticated;
grant execute on function public.forum_music_add(text, text)               to authenticated;
grant execute on function public.forum_music_next(uuid)                    to authenticated;
grant execute on function public.forum_music_set_meta(uuid, integer, text) to authenticated;
grant execute on function public.forum_music_remove(uuid)                  to authenticated;

commit;
