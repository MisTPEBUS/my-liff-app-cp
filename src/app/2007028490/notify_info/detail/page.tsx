"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import { closeWindow } from "@/utils/liff";

type Employee = {
  id: string;
  company: string;
  groupCode: string;
  phone: string;
  job: string;
  dept: string;
  empId: string;
  name: string;
  channelId: string;
  userId: string;
  insertAt: string;
};

const defaultUser: Employee = {
  id: "",
  company: "臺北客運",
  groupCode: "",
  phone: "",
  job: "",
  dept: "",
  empId: "",
  name: "",
  channelId: "",
  userId: "",
  insertAt: "",
};

export default function ViolationForm() {
  const [mockData] = useState<Employee>(defaultUser);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const uid = url.searchParams.get("userId");
      setUserId(uid);
      console.log("🔍 目前網址的 userId:", uid);
    }
  }, []);

  const handleUnbind = async () => {
    if (!userId) return;

    try {
      await axios.delete(
        `https://line-notify-18ab.onrender.com/v1/api/lineHook/user/${mockData.channelId}/${userId}`
      );
      alert("解除成功");
      await closeWindow();
    } catch (error) {
      console.error("解除綁定失敗：", error);
    }
  };

  const handleRedirectAndClose = async () => {
    await closeWindow();
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">
        {mockData.company} 通知綁定
      </h1>

      <Card className="w-full p-6 bg-white shadow-lg rounded-xl border-none">
        <p className="text-gray-700 mt-4 text-center">
          您已經綁定至通知，是否要解除綁定？
        </p>
        <CardContent className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-bold">
            {mockData.name} {mockData.empId}
          </p>
          <p className="text-gray-600">
            您好，您目前已綁定並同意接受以下範圍的相關業務通知：
          </p>
          <ul className="text-gray-600 mt-2 space-y-1">
            <li>公司：{mockData.company}</li>
            <li>部門：{mockData.dept}</li>
            <li>職稱：{mockData.job}</li>
            <li>專案群組：{mockData.groupCode || "無"}</li>
            <li>員工編號：{mockData.empId}</li>
            <li>姓名：{mockData.name}</li>
          </ul>
        </CardContent>

        <div className="mt-6 flex flex-col space-y-2">
          <Button
            onClick={handleUnbind}
            className="w-full bg-green-500 text-white py-2 rounded font-extrabold hover:bg-green-600"
          >
            是，解除綁定
          </Button>
          <Button
            onClick={handleRedirectAndClose}
            className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded font-bold"
          >
            否，保持綁定
          </Button>
        </div>

        <h6 className="text-sm bg-gray-200 p-2 mt-4 text-center">
          ChannelId: 2007028490
          <br />
          使用者 ID: {userId || "未知"}
        </h6>
      </Card>
    </div>
  );
}
