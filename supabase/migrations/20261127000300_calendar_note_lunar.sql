-- Ghi chú có thể theo DƯƠNG lịch hoặc ÂM lịch.
-- Ghi chú âm lịch lặp lại hằng năm sẽ rơi vào ngày dương khác nhau mỗi năm (do hai lịch lệch nhau),
-- nên lưu riêng ngày/tháng âm; ứng dụng tự quy đổi sang ngày dương của từng năm khi hiển thị.

begin;

alter table public.calendar_notes
  add column if not exists calendar_type text not null default 'solar',
  add column if not exists lunar_day smallint,
  add column if not exists lunar_month smallint,
  add column if not exists lunar_year smallint,
  add column if not exists lunar_leap boolean not null default false;

alter table public.calendar_notes drop constraint if exists calendar_notes_type_chk;
alter table public.calendar_notes add constraint calendar_notes_type_chk
  check (calendar_type in ('solar', 'lunar'));

alter table public.calendar_notes drop constraint if exists calendar_notes_lunar_chk;
alter table public.calendar_notes add constraint calendar_notes_lunar_chk
  check (
    calendar_type = 'solar'
    or (lunar_day between 1 and 30 and lunar_month between 1 and 12)
  );

commit;
