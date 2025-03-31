"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/app/components/ui/button";
import { closeWindow } from "@/utils/liff";

// 定義表單 schema
const formSchema = z.object({
  company: z.enum(["臺北客運", "首都客運"], { message: "請選擇公司" }),
  dept: z.string({ message: "請選擇部門" }),
  job: z.string().optional(),
  projectGroup: z.string().optional(),
  empId: z.string().min(1, { message: "員工編號為必填" }),
  name: z.string().optional(),
});

// 定義表單類型
type FormData = z.infer<typeof formSchema>;

// 定義 API 的 payload 型別
export type LineNotifyPayload = {
  company: string;
  groupCode: string; // 如果沒有輸入專案群組則傳空字串
  phone: string; // 如果未提供 phone，可直接留空
  job: string;
  dept: string;
  empId: string;
  name: string;
  channelId: string; // 可根據需求動態調整
  userId: string; // 從 cookies 讀取的 userId
};

const departmentOptions: Record<string, string[]> = {
  臺北客運: [
    "業務部",
    "資訊中心",
    "四海站",
    "南雅站",
    "中和站",
    "新店站",
    "木柵站",
    "樹林站",
    "三峽一站",
    "歡仔園站",
    "民生站",
    "三峽二站",
    "板橋後站",
    "中華站",
    "五福站",
    "林口站",
    "蘆洲站",
    "江子翠站",
    "瑞芳站",
  ],
  首都客運: [
    "業務部",
    "資訊中心",
    "三重一站",
    "二重站",
    "新莊一站",
    "新莊二站",
    "三峽一站",
    "內湖站",
    "東園站",
    "士林站",
    "南港站",
    "經貿站",
    "汐止一站",
    "社子站",
    "汐止二站",
    "安康站",
    "五結停車場",
    "八斗子站",
    "三重二站",
    "板橋站",
  ],
};

export default function TaipeiBusBinding() {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [StoredDisplayName, setStoredDisplayName] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "臺北客運",
      dept: "",
      job: "",
      projectGroup: "營收通知系統",
      empId: "",
      name: StoredDisplayName ?? "",
    },
  });
  const selectedCompany = watch("company"); // 加在 useForm 之後
  const departments = departmentOptions[selectedCompany] || [];
  const handleRedirectAndClose = async () => {
    // 執行其他邏輯，例如發送 API 請求後
    await closeWindow();
    // 不建議在這裡直接呼叫 liff.closeWindow()，
    // 讓 /close 頁面來處理視窗關閉邏輯會更穩定
  };
  useEffect(() => {
    const userId = Cookies.get("userId");
    const displayName = Cookies.get("displayName");
    setStoredUserId(userId ?? "");
    setStoredDisplayName(displayName ?? "");
    reset((prev) => ({
      ...prev,
      name: displayName ?? "",
    }));
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    // 組裝 payload
    const payload: LineNotifyPayload = {
      company: data.company,
      groupCode: data.projectGroup ?? "營收通知系統",
      phone: "",
      job: data.job || "",
      dept: data.dept,
      empId: data.empId,
      name: StoredDisplayName || "",
      channelId: "2007028490",
      userId: storedUserId || "",
    };

    try {
      const response = await fetch(
        "https://line-notify-18ab.onrender.com/v1/api/lineHook/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      alert("綁定成功");
      if (!response.ok) {
        throw new Error("請求失敗");
      }
      const result = await response.json();
      console.log("API 回應：", result);

      await closeWindow();
    } catch (error) {
      console.error("送出失敗：", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">
        首都客運集團通知綁定
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 公司名稱 */}
        <div className="relative">
          <label className="block font-semibold mb-2">
            公司名稱 <span className="text-red-500">*</span>
          </label>
          <select
            defaultValue=""
            {...register("company", { required: "請選擇公司" })}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇公司</option>
            <option value="臺北客運">臺北客運</option>
            <option value="首都客運">首都客運</option>
          </select>
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* 部門 */}
        <div className="relative">
          <label className="block font-semibold mb-2">
            部門 <span className="text-red-500">*</span>
          </label>
          <select
            defaultValue=""
            {...register("dept", { required: "請選擇部門" })}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
            disabled={!selectedCompany}
          >
            <option value="">請選擇部門</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.dept && (
            <p className="text-red-500 text-sm mt-1">{errors.dept.message}</p>
          )}
        </div>

        {/* 職稱 */}
        <div className="relative">
          <label className="block font-semibold mb-2">職稱</label>
          <select
            defaultValue=""
            {...register("job")}
            className="w-full p-2 border rounded bg-white appearance-none pr-8"
          >
            <option value="">請選擇職稱</option>
            <option value="協理">協理</option>
            <option value="經理">經理</option>
            <option value="副理">副理</option>
            <option value="襄理">襄理</option>
            <option value="課長">課長</option>
            <option value="主任">主任</option>
            <option value="股長">股長</option>
            <option value="站主管">站主管</option>
            <option value="站管人員">站管人員</option>
            <option value="管理員工">管理員工</option>
          </select>
          <div className="absolute right-2 top-10 pointer-events-none">▼</div>
          {errors.job && (
            <p className="text-red-500 text-sm mt-1">{errors.job.message}</p>
          )}
        </div>

        {/* 專案群組 */}
        <div>
          <label className="block font-semibold mb-2">專案群組</label>
          <input
            disabled
            type="text"
            {...register("projectGroup")}
            className="w-full p-2 border rounded"
            placeholder="輸入專案群組"
          />
        </div>

        {/* 員工編號 */}
        <div>
          <label className="block font-semibold mb-2">
            員工編號 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("empId", { required: "請輸入員工編號" })}
            className="w-full p-2 border rounded"
            placeholder="輸入員工編號"
          />
          {errors.empId && (
            <p className="text-red-500 text-sm mt-1">{errors.empId.message}</p>
          )}
        </div>

        {/* 姓名 */}
        <div>
          <label className="block font-semibold mb-2">姓名</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded"
            placeholder="輸入姓名"
          />
        </div>

        {/* 送出按鈕 */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded font-extrabold hover:bg-green-600"
        >
          送出表單
        </button>
        <Button
          className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded font-bold"
          onClick={handleRedirectAndClose}
        >
          否，保持綁定
        </Button>
        <h6 id="channel-id" className="text-sm bg-gray-200 p-2 mt-4">
          channelId : 2007028490-user:{storedUserId}-name:{StoredDisplayName}
        </h6>
      </form>
    </div>
  );
}
