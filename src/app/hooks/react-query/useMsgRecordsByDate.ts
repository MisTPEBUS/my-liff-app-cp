import { RevenueHistoryApi } from "@/api/services/revenueHistory";
import { MsgRecord } from "@/app/dashboard/revenue-history/data";
import { MsgRecordsSchema } from "@/schema/RevenueHistorySchema";
import { useQuery } from "@tanstack/react-query";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchMsgRecords = async (date: string): Promise<MsgRecord[]> => {
  const res = await RevenueHistoryApi.getRevenueHistory(date);
  const parsed = MsgRecordsSchema.parse(res.data); //  Zod 驗證

  await delay(1000);
  return parsed;
};

const useMsgRecordsByDate = (date: string) => {
  return useQuery({
    queryKey: ["msgRecords", date],
    queryFn: async () => await fetchMsgRecords(date),
    enabled: !!date, // 防止 date 為空時自動觸發
    staleTime: 1000 * 60 * 5,
  });
};

export default useMsgRecordsByDate;

/* 
export const useUserProfileQuery = () => {
  return useQuery<{ user: UserProfileResponseSchemaType }>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await UserProfileApi.getUserProfiles();
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });
}; */
