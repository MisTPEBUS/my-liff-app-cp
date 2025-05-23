import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { useDateStore } from "@/store/DateStore";

export const useAutoRefreshAtTime = () => {
  const { setSelectedDate } = useDateStore();
  const lastTriggeredRef = useRef<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const isInTimeRange =
        (hours === 8 && minutes >= 30) || (hours === 9 && minutes < 60);

      const isOnQuarter = minutes % 15 === 0;

      const key = format(now, "HH:mm");

      if (isInTimeRange && isOnQuarter && lastTriggeredRef.current !== key) {
        setSelectedDate(format(new Date(), "yyyy-MM-dd"));
        lastTriggeredRef.current = key;
        console.log("✅ 自動刷新：", key);
      }
    }, 1000 * 60); // 每 30 秒檢查一次

    return () => clearInterval(interval);
  }, [setSelectedDate]);
};
