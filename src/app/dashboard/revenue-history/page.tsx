import { getTodayDate } from "@/utils/tool";
import RevenueCard from "./components/RevenueCard";

import { groupAndSort, MsgRecord } from "./data";
import axios from "axios";

const RevenueHistoryPage = async () => {
  const today = getTodayDate();
  const url = `https://line-notify-18ab.onrender.com/v1/api/lineHook/sendMsg?date=${today}`;

  let records: MsgRecord[] = [];

  try {
    const response = await axios.get<MsgRecord[]>(url);
    records = response.data;
  } catch (error) {
    console.error("❌ 撈取失敗：", error);
  }

  const sortedRevenueData = groupAndSort(records);

  return (
    <div>
      <div className="space-y-2 mt-2">
        {sortedRevenueData.map((item, index) => (
          <RevenueCard key={index} record={item} />
        ))}
      </div>
    </div>
  );
};
export default RevenueHistoryPage;
