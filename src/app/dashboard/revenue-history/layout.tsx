"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

import { ConfirmSendDialog } from "./components/ConfirmSendDialog.tsx";

const RevenueHistoryLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col  md:max-w-[640px] mx-auto md:border-2 md:border-black-main ">
      <header className="sticky top-0 z-10 ring-1 flex items-center justify-between px-4 h-14 border-b bg-green-500 md:border-black-main ">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-1 font-semibold"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">返回</span>
        </button>
        <h1 className="text-base font-semibold text-center flex-1">
          Line Manager
        </h1>
        <ConfirmSendDialog
          onConfirm={() => {
            console.log("已發送");
            // 可加上 API 呼叫 / loading 狀態等
          }}
        />
      </header>

      <main className="flex-1 overflow-y-auto p-4 ">{children}</main>
    </div>
  );
};

export default RevenueHistoryLayout;
