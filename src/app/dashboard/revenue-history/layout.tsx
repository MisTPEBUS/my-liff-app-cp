"use client";

import { useEffect, type ReactNode } from "react";
import NavDatePick from "./components/NavDatePick";
import { ConfirmSendDialog } from "./components/ConfirmSendDialog.tsx";
import { useDateStore } from "@/store/DateStore";
import { format } from "date-fns";
const RevenueHistoryLayout = ({ children }: { children: ReactNode }) => {
  const { setSelectedDate } = useDateStore();
  useEffect(() => {
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
  }, [setSelectedDate]);
  return (
    <div className="w-full min-h-screen flex flex-col md:max-w-[640px] mx-auto md:border-2 md:border-black-main">
      <header className="sticky top-0 z-10 ring-1 flex items-center px-2 justify-center  h-14 border-b bg-green-500 md:border-black-main">
        <NavDatePick
          initialDate={new Date()}
          disableFuture
          onDateChange={() => {}}
        />
        <ConfirmSendDialog
          onConfirm={() => {
            console.log("已發送");
          }}
        />
      </header>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
};

export default RevenueHistoryLayout;
