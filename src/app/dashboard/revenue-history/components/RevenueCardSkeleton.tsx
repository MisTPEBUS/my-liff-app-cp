import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RevenueCardSkeleton = () => {
  return (
    <Card className="w-full rounded-xl border border-l-4 ring-1 gap-4 py-4 border-l-muted ring-muted-foreground">
      <CardHeader className="gap-0">
        <CardTitle className="flex justify-between items-center my-0">
          {/* 左區塊 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-40 animate-pulse bg-gray-400" />{" "}
              {/* 公司名稱與部門 */}
              <Skeleton className="h-5 w-20 animate-pulse bg-gray-400" />{" "}
              {/* groupCode Badge */}
            </div>
            <CardDescription className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 animate-pulse bg-gray-400" />{" "}
              {/* 已/未回報 Badge */}
              <Skeleton className="h-4 w-32 animate-pulse bg-gray-400" />{" "}
              {/* 通報次數 */}
            </CardDescription>
          </div>

          {/* 右側重新發送按鈕 placeholder */}
          <Skeleton className="h-8 w-24 rounded-md animate-pulse bg-gray-400" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
export default RevenueCardSkeleton;
