"use client";
import { useDateStore } from "@/store/DateStore";
import RevenueCard from "./components/RevenueCard";
import RevenueCardSkeleton from "./components/RevenueCardSkeleton";
import { groupAndSort } from "./data";
import useMsgRecordsByDate from "@/app/hooks/react-query/useMsgRecordsByDate";
import { Inbox } from "lucide-react";

const RevenueHistoryPage = () => {
  const { selectedDate } = useDateStore(); // Zustand 管理日期
  const { data, isLoading, isError } = useMsgRecordsByDate(selectedDate); // React Query 撈資料
  const sortedRevenueData = data ? groupAndSort(data) : [];

  const showEmpty = !isLoading && !isError && sortedRevenueData.length === 0;
  return (
    <div>
      {isError && <div>資料讀取失敗</div>}

      <div className="space-y-2 mt-2">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <RevenueCardSkeleton key={i} />
          ))}

        {showEmpty && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Inbox className="w-16 h-16 mb-4" />
            <p className="text-lg"> 沒有任何資料</p>
          </div>
        )}

        {!isLoading &&
          sortedRevenueData.map((item, index) => (
            <RevenueCard key={index} record={item} />
          ))}
      </div>
    </div>
  );
};
export default RevenueHistoryPage;
