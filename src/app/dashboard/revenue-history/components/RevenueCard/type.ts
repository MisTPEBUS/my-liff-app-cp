export type RevenueCardType = {
  date: string;
  status: "pending" | "success" | "failed";
  system: string;
  company: string;
  dept: string;
  count: number;
};
export type RevenueCardProps = {
  record: RevenueCardType;
};
