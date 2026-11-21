-- Xem ai đã thả cảm xúc: trả về TÊN NHÂN VẬT + avatar (không bao giờ là tài khoản thật) và loại cảm xúc.
begin;

drop function if exists public.forum_reaction_users(text, uuid);
create function public.forum_reaction_users(p_kind text, p_id uuid)
returns table (display_name text, avatar text, kind text, is_me boolean)
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;

  if p_kind = 'post' then
    return query
      select coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), r.kind, r.user_id = v_uid
      from public.forum_reactions r
      join public.forum_posts x on x.id = r.post_id and not x.hidden
      left join public.forum_profiles fp on fp.user_id = r.user_id
      where r.post_id = p_id
      order by r.created_at desc, r.id desc
      limit 200;

  elsif p_kind = 'comment' then
    return query
      select coalesce(fp.display_name, 'Ẩn danh'), coalesce(fp.avatar, 'a01'), r.kind, r.user_id = v_uid
      from public.forum_reactions r
      join public.forum_comments c on c.id = r.comment_id and not c.hidden
      join public.forum_posts x on x.id = c.post_id and not x.hidden
      left join public.forum_profiles fp on fp.user_id = r.user_id
      where r.comment_id = p_id
      order by r.created_at desc, r.id desc
      limit 200;

  else
    raise exception 'invalid_kind';
  end if;
end $$;

revoke all on function public.forum_reaction_users(text, uuid) from public, anon, authenticated;
grant execute on function public.forum_reaction_users(text, uuid) to authenticated;

commit;
