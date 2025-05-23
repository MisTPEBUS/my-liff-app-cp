import { getTodayDate } from "@/utils/tool";
import { create } from "zustand";

interface DateStore {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  selectedDate: getTodayDate(), // 預設可留空或初始化為今天
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
