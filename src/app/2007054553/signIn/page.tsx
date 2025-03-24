"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

export default function TaipeiBusBinding() {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [StoredDisplayName, setStoredDisplayName] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "首都客運",
      dept: "",
      job: "",
      projectGroup: "",
      empId: "",
      name: StoredDisplayName ?? "",
    },
  });

  useEffect(() => {
    const userId = Cookies.get("userId");
    const displayName = Cookies.get("displayName");
    setStoredUserId(userId ?? "");
    setStoredDisplayName(displayName ?? "");
  }, []);

  const onSubmit = async (data: FormData) => {
    // 組裝 payload
    const payload: LineNotifyPayload = {
      company: "首都客運",
      groupCode: data.projectGroup || "",
      phone: "",
      job: data.job || "",
      dept: data.dept,
      empId: data.empId,
      name: data.name || "",
      channelId: "2007054553",
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

      if (!response.ok) {
        throw new Error("請求失敗");
      }
      const result = await response.json();
      console.log("API 回應：", result);
    } catch (error) {
      console.error("送出失敗：", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">
        首都客運通知綁定
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 公司名稱 */}
        <div className="relative">
          <label className="block font-semibold mb-2">
            公司名稱 <span className="text-red-500">*</span>
          </label>
          <select
            // 使用 defaultValue 保持預設值，並將元件設為 disabled
            defaultValue="臺北客運"
            disabled
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
          >
            <option value="業務部"> 業務部</option>
            <option value="資訊中心">資訊中心</option>
            <option value="三重一站"> 三重一站</option>
            <option value="二重站"> 二重站</option>
            <option value="新莊一站"> 新莊一站</option>
            <option value="新莊二站"> 新莊二站</option>
            <option value="三峽一站"> 三峽一站</option>
            <option value="內湖站"> 內湖站</option>
            <option value="東園站">東園站</option>
            <option value="士林站">士林站</option>
            <option value="南港站"> 南港站</option>
            <option value="經貿站">經貿站</option>
            <option value="汐止一站">汐止一站</option>
            <option value="社子站"> 社子站</option>
            <option value="八斗子站"> 八斗子站</option>
            <option value="汐止二站"> 汐止二站</option>
            <option value="五結站"> 五結站</option>
            <option value="安康站">安康站</option>
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
            <option value="場站主管">場站主管</option>
            <option value="場站職員">場站職員</option>
            <option value="內勤職員">內勤職員</option>
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

        <h6 id="channel-id" className="text-sm bg-gray-200 p-2 mt-4">
          channelId : 2007054553
        </h6>
      </form>
    </div>
  );
}
