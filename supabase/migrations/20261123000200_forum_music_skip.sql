-- Giangho Forum: cho BẤT KỲ ai đang đăng nhập đều bấm "Bài tiếp theo" được (chuyển bài đang phát cho cả phòng).
--   * Chỉ tác động lên bài đang phát; bài đang chờ vẫn chỉ người thêm / admin mới xóa được.
--   * Hai người bấm cùng lúc cũng không lỗi: người bấm sau không còn bài nào để bỏ nên bỏ qua êm.
--   * Chạy lại nhiều lần vẫn an toàn.
begin;

drop function if exists public.forum_music_skip(uuid);

create function public.forum_music_skip(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := (select auth.uid());
begin
  if v_uid is null then raise exception 'login_required'; end if;
  if public.is_banned(v_uid) then raise exception 'account_banned'; end if;
  perform pg_advisory_xact_lock(hashtext('forum_music'));
  delete from public.forum_music m where m.id = p_id and m.started_at is not null;
  perform public.forum_music_advance();
end $$;

revoke all on function public.forum_music_skip(uuid) from public, anon, authenticated;
grant execute on function public.forum_music_skip(uuid) to authenticated;

commit;
