"use client";
import { useDateStore } from "@/store/DateStore";
import RevenueCard from "./components/RevenueCard";
import RevenueCardSkeleton from "./components/RevenueCardSkeleton";
import { groupAndSort } from "./data";
import useMsgRecordsByDate from "@/app/hooks/react-query/useMsgRecordsByDate";

const RevenueHistoryPage = () => {
  const { selectedDate } = useDateStore(); // Zustand 管理日期
  const { data, isLoading, isError } = useMsgRecordsByDate(selectedDate); // React Query 撈資料
  const sortedRevenueData = data ? groupAndSort(data) : [];
  return (
    <div>
      {isError && <div>資料讀取失敗</div>}

      <div className="space-y-2 mt-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <RevenueCardSkeleton key={i} />
            ))
          : sortedRevenueData.map((item, index) => (
              <RevenueCard key={index} record={item} />
            ))}
      </div>
    </div>
  );
};
export default RevenueHistoryPage;
