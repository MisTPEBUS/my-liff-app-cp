"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueCardProps } from "./type";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RevenueCard = ({ record }: RevenueCardProps) => {
  const isReported = record.status === "success";

  return (
    <Card
      className={`w-full rounded-xl border border-l-4 ring-1  ${
        isReported
          ? "border-l-green-500 ring-green-700"
          : "border-l-red-500 ring-red-700 "
      }`}
    >
      <CardHeader>
        <CardTitle className="flex   justify-between items-center">
          <div>
            <h3>
              {record.company}-{record.dept}
            </h3>
          </div>

          <Badge className="text-base font-bold bg-black-sub ">
            {record.system}
          </Badge>
        </CardTitle>
        <CardDescription className="flex flex-col">
          <Badge
            className={`text-sm font-bold  mb-2 ${
              isReported ? "bg-green-700" : "bg-red-700"
            }`}
          >
            {isReported ? "已回報" : "未回報"}
          </Badge>
          本日通報次數: {record.count}次
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          onClick={() => {
            toast.success("已發送通知");
          }}
          className="w-full text-white-pure text-base border-1 ring-2 border-black-main font-bold hover:bg-white-pure hover:text-black-main"
          variant="secondary"
        >
          重新發送
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RevenueCard;
