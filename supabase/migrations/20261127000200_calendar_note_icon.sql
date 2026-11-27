-- Thêm biểu tượng (icon) cho ghi chú trong tiện ích Lịch.
begin;

alter table public.calendar_notes
  add column if not exists icon text check (icon is null or char_length(icon) <= 20);

commit;
