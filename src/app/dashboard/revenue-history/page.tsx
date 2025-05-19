import NavDatePick from "./components/NavDatePick";
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

const RevenueHistoryPage = () => (
  <div>
    <NavDatePick />
    <div className="space-y-4 mt-12">
      {revenueData.map((item, index) => (
        <RevenueCard key={index} record={item} />
      ))}
    </div>
  </div>
);

export default RevenueHistoryPage;
