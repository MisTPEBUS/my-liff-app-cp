"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserProfile, initLiff } from "@/utils/liff";

export default function ProfileClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [menu, setMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 抓取 menu 參數
  useEffect(() => {
    const value = searchParams.get("menu");
    setMenu(value);
    console.log("✅ menu 參數為：", value);
  }, [searchParams]);

  // 執行 LIFF + 判斷導向邏輯（依賴 menu）
  useEffect(() => {
    if (!menu) {
      console.warn("⚠️ menu 為 null，不執行 fetchUserIdAndData");
      return;
    }

    console.log("🟢 useEffect 觸發了！");

    async function fetchUserIdAndData() {
      console.log("🟢 fetchUserIdAndData 開始執行");

      await initLiff();
      const Profile = await getUserProfile();
      console.log("🟢 取得的 Profile:", Profile);

      if (Profile?.userId) {
        Cookies.set("userId", Profile.userId, { expires: 7 });
        Cookies.set("displayName", Profile.displayName, { expires: 7 });

        try {
          console.log("🟢 發送 API 請求... Profile?.userId");

          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: Profile.userId,
              channelId: "2007028490",
            }
          );

          if (response.data?.id && response.data) {
            console.log("✅ 使用者存在，menu =", menu);
            if (menu === "sign") router.push(`/2007028490/notify_info`);
            else if (menu === "roadRecord")
              router.push(`/2007028490/roadRecord`);
            else router.push(`/2007028490/signIn`); // fallback
          } else {
            console.log("🟡 使用者不存在，導向註冊頁");
            router.push(`/2007028490/signIn`);
          }
        } catch (error) {
          console.log("🔴 API 發生錯誤，導向註冊頁");
          router.push(`/2007028490/signIn`);
          console.error("❌ API 錯誤:", error);
        }
      } else {
        console.warn("⚠️ 無法取得 userId");
        router.push(`/2007028490/signIn`);
      }

      setLoading(false);
    }

    fetchUserIdAndData();
  }, [router, menu]);

  if (loading) {
    return <p>載入中...</p>;
  }

  return <div className="p-6"></div>;
}
