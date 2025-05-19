import RevenueCard from "./components/RevenueCard";
import { RevenueCardType } from "./components/RevenueCard/type";

const revenueData: RevenueCardType[] = [
  {
    date: "2025-05-19",
    status: "pending",
    system: "營收比對",
    company: "台北客運",
    dept: "四海站",
    count: 1,
  },
  {
    date: "2025-05-19",
    status: "success",
    system: "營收比對",
    company: "首都客運",
    dept: "內湖站",
    count: 3,
  },
  {
    date: "2025-05-19",
    status: "pending",
    system: "營收比對",
    company: "首都客運",
    dept: "士林站",
    count: 3,
  },
  {
    date: "2025-05-19",
    status: "pending",
    system: "營收比對",
    company: "台北客運",
    dept: "四海站",
    count: 1,
  },
  {
    date: "2025-05-16",
    status: "success",
    system: "營收比對",
    company: "首都客運",
    dept: "內湖站",
    count: 3,
  },
  {
    date: "2025-05-16",
    status: "pending",
    system: "營收比對",
    company: "首都客運",
    dept: "士林站",
    count: 3,
  },
];

const RevenueHistoryPage = () => {
  const sortedRevenueData = [...revenueData].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return 0;
  });
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
