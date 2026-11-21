-- Lịch diễn đàn (kiểu Locket): mỗi ngày có bài thì hiện một ô, kèm số bài và avatar của bài mới nhất trong ngày.
-- Chỉ trả về số liệu tổng hợp, không có thông tin tài khoản thật. Chạy lại nhiều lần vẫn an toàn.
begin;

drop function if exists public.forum_calendar(timestamptz, timestamptz, integer, boolean);
create function public.forum_calendar(
  p_from timestamptz, p_to timestamptz, p_offset integer default 420, p_mine boolean default false)
returns table (day date, post_count bigint, avatar text)
language plpgsql stable security definer set search_path = '' as $$
declare
  v_uid uuid := (select auth.uid());
  v_off integer := greatest(-840, least(coalesce(p_offset, 420), 840));  -- lệch múi giờ (phút) của người xem; Việt Nam = 420
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if p_from is null or p_to is null or p_to <= p_from or p_to - p_from > interval '62 days' then
    raise exception 'invalid_body';
  end if;

  return query
    with x as (
      select p.id, p.author_id, p.created_at,
             ((p.created_at at time zone 'UTC') + make_interval(mins => v_off))::date as d
      from public.forum_posts p
      where not p.hidden
        and p.created_at >= p_from and p.created_at < p_to
        and (not coalesce(p_mine, false) or p.author_id = v_uid)
    ),
    g as (select x.d, count(*) as n from x group by x.d),
    l as (select distinct on (x.d) x.d, x.author_id from x order by x.d, x.created_at desc, x.id desc)
    select g.d, g.n, coalesce(fp.avatar, 'a01')
    from g
    join l on l.d = g.d
    left join public.forum_profiles fp on fp.user_id = l.author_id
    order by g.d;
end $$;

revoke all on function public.forum_calendar(timestamptz, timestamptz, integer, boolean) from public, anon, authenticated;
grant execute on function public.forum_calendar(timestamptz, timestamptz, integer, boolean) to authenticated;

commit;
