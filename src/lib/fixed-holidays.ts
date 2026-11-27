import { lunarOccurrences } from "@/lib/lunar";

/** Ngày lễ cố định: ai cũng xem được, không lưu trong database. */
export type FixedHoliday = {
  name: string;
  /** Ngày/tháng tính theo âm lịch (tự quy đổi ra ngày dương của từng năm). */
  lunar: boolean;
  day: number;
  month: number;
};

const solar = (day: number, month: number, name: string): FixedHoliday => ({ name, lunar: false, day, month });
const lunar = (day: number, month: number, name: string): FixedHoliday => ({ name, lunar: true, day, month });

export const FIXED_HOLIDAYS: FixedHoliday[] = [
  // Dương lịch
  solar(1, 1, "Tết Dương lịch"),
  solar(14, 2, "Valentine"),
  solar(8, 3, "Quốc tế Phụ nữ"),
  solar(22, 4, "Ngày Trái Đất"),
  solar(30, 4, "Ngày Giải phóng miền Nam, thống nhất đất nước"),
  solar(1, 5, "Quốc tế Lao động"),
  solar(7, 5, "Ngày Chiến thắng Điện Biên Phủ"),
  solar(19, 5, "Ngày sinh Chủ tịch Hồ Chí Minh"),
  solar(1, 6, "Quốc tế Thiếu nhi"),
  solar(19, 8, "Ngày Cách mạng tháng Tám thành công"),
  solar(2, 9, "Quốc khánh Việt Nam"),
  solar(10, 10, "Ngày Giải phóng Thủ đô"),
  solar(20, 10, "Ngày Phụ nữ Việt Nam"),
  solar(31, 10, "Halloween"),
  solar(20, 11, "Ngày Nhà giáo Việt Nam"),
  solar(24, 11, "Ngày Văn hóa Việt Nam"),
  solar(22, 12, "Ngày thành lập Quân đội Nhân dân Việt Nam"),
  solar(25, 12, "Lễ Giáng sinh"),
  solar(31, 12, "Đêm giao thừa Dương lịch"),
  // Âm lịch
  lunar(1, 1, "Tết Nguyên Đán (Mùng 1)"),
  lunar(2, 1, "Tết Nguyên Đán (Mùng 2)"),
  lunar(3, 1, "Tết Nguyên Đán (Mùng 3)"),
  lunar(4, 1, "Tết Nguyên Đán (Mùng 4)"),
  lunar(5, 1, "Tết Nguyên Đán (Mùng 5)"),
  lunar(15, 1, "Tết Nguyên Tiêu (Rằm tháng Giêng)"),
  lunar(3, 3, "Tết Hàn Thực"),
  lunar(10, 3, "Giỗ Tổ Hùng Vương"),
  lunar(5, 5, "Tết Đoan Ngọ"),
  lunar(15, 8, "Tết Trung Thu"),
  lunar(23, 12, "Ông Công Ông Táo"),
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Map yyyy-MM-dd → các ngày lễ cố định rơi vào ngày đó của một năm dương. */
export function holidaysForYear(year: number): Map<string, FixedHoliday[]> {
  const map = new Map<string, FixedHoliday[]>();
  const add = (key: string, h: FixedHoliday) => {
    const list = map.get(key);
    if (list) list.push(h);
    else map.set(key, [h]);
  };
  for (const h of FIXED_HOLIDAYS) {
    if (h.lunar) {
      for (const key of lunarOccurrences(year, h.month, h.day)) add(key, h);
    } else {
      add(`${year}-${pad(h.month)}-${pad(h.day)}`, h);
    }
  }
  return map;
}
