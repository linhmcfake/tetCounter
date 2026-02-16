import { storage } from "@vendetta/plugin";
import { showToast } from "@vendetta/ui/toasts";
import Settings from "./Settings";

// Bảng ngày mùng 1 Tết Việt Nam (Âm lịch → Dương lịch)
const tetDates = [
  2024, 2, 10,
  2025, 1, 29,
  2026, 2, 17,
  2027, 2, 6,
  2028, 1, 26,
  2029, 2, 13,
  2030, 2, 3,
  2031, 1, 23,
  2032, 2, 11,
  2033, 1, 31,
  2034, 1, 19,
  2035, 2, 8
];

function getTetDate(year: number) {
  for (let i = 0; i < tetDates.length; i += 3) {
    if (tetDates[i] === year) {
      return new Date(year, tetDates[i + 1] - 1, tetDates[i + 2]);
    }
  }
  return new Date(year, 0, 1); // Mặc định nếu không tìm thấy
}

export const getDaysToTet = () => {
  const now = new Date();
  // Đặt mốc thời gian về 0h sáng để tính số ngày chính xác hơn
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let tet = getTetDate(startOfToday.getFullYear());

  // Nếu hôm nay đã qua ngày Tết năm nay, tính cho năm sau
  if (startOfToday > tet) {
    tet = getTetDate(startOfToday.getFullYear() + 1);
  }

  const diff = tet.getTime() - startOfToday.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export default {
  onLoad() {
    const today = new Date().toISOString().slice(0, 10);

    if (storage.lastShown !== today) {
      const days = getDaysToTet();
      
      if (days === 0) {
        showToast("Chúc Mừng Năm Mới Bính Ngọ 2026! 🎉🎊🌸");
      } else {
        showToast(`Còn ${days} ngày nữa là Tết Âm Lịch! 🧧✨`);
      }
      
      storage.lastShown = today;
    }
  },

  settings: Settings,
};
