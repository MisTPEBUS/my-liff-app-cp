"use client"; // ✅ 必須加上這行，讓 Next.js 知道這是 Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 用來導向不同頁面
import Cookies from "js-cookie"; // ✅ 讀取 & 設定 Cookie
import axios from "axios";
import { getUserProfile, initLiff } from "@/utils/liff";

export default function ProfileClient() {
  const router = useRouter(); // ✅ 設定 Next.js router

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🟢 useEffect 觸發了！");
    debugger; // ✅ 這行會讓 DevTools 停住，幫助你檢查變數

    async function fetchUserIdAndData() {
      console.log("🟢 fetchUserIdAndData 開始執行");
      await initLiff();
      const Profile = await getUserProfile();
      console.log("🟢 取得的 Profile:", Profile);

      if (Profile?.userId) {
        Cookies.set("userId", Profile?.userId, { expires: 7 });
        Cookies.set("displayName", Profile?.displayName, { expires: 7 });

        try {
          console.log("🟢 發送 API 請求... Profile?.userId");
          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: Profile?.userId,
              channelId: "2007054553",
            }
          );

          if (response.data?.id && response.data) {
            router.push(`/2007054553/notify_info`);
          } else {
            router.push(`/2007054553/signIn`);
          }
        } catch (error) {
          router.push(`/2007054553/signIn`);
          console.error("❌ API 請求失敗:", error);
        }
      }

      setLoading(false);
    }

    fetchUserIdAndData();
  }, [router]); // ✅ `router` 變更時重新執行

  if (loading) {
    return <p> 載入中...</p>;
  }

  return <div className="p-6"></div>;
}
