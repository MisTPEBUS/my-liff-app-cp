"use client";

import {
  Card,
  CardDescription,
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
      className={`w-full rounded-xl border border-l-4 ring-1 gap-4  py-4  ${
        isReported
          ? "border-l-green-500 ring-green-700"
          : "border-l-red-500 ring-red-700 "
      }`}
    >
      <CardHeader className="gap-0">
        <CardTitle className="flex   justify-between items-center my-0">
          <div className="flex ">
            <Badge className="text-base font-bold bg-black-sub mr-2">
              {record.system}
            </Badge>
            <div className="">
              <h5 className="font-bold">
                {record.company}-{record.dept}
              </h5>
              <CardDescription className="flex m-0 p-0 items-center">
                <Badge
                  className={`text-sm font-bold mr-1   ${
                    isReported ? "bg-green-700" : "bg-red-700"
                  }`}
                >
                  {isReported ? "已回報" : "未回報"}
                </Badge>
                本日通報次數: {record.count}次
              </CardDescription>
            </div>
          </div>

          <Button
            onClick={() => {
              toast.success("已發送通知");
            }}
            className=" text-white-pure text-base border-1 ring-2 border-black-main font-bold hover:bg-white-pure hover:text-black-main"
            variant="secondary"
          >
            重新發送
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default RevenueCard;
