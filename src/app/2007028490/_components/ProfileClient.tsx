"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { initLiff, getUserProfile } from "@/utils/liff"; // ← 你自己 utils 中的函式

export default function ProfileClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<string | null>(null);

  // ✅ 第一步：從網址取得 menu 參數（原生方式）
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const menuParam = url.searchParams.get("menu");
      setMenu(menuParam);
      console.log("✅ 正確取得 menu:", menuParam);
    }
  }, []);

  // ✅ 第二步：當 menu 有值後再初始化 LIFF + 呼叫 API
  useEffect(() => {
    if (!menu) return;

    async function fetchUser() {
      try {
        console.log("🟢 初始化 LIFF...");
        await initLiff();

        const profile = await getUserProfile();
        console.log("🟢 取得的 LIFF 使用者資料:", profile);

        if (profile?.userId) {
          Cookies.set("userId", profile.userId, { expires: 7 });
          Cookies.set("displayName", profile.displayName, { expires: 7 });

          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: profile.userId,
              channelId: "2007028490",
              menu: menu,
            }
          );

          const resMenu = response.data?.menu;
          const hasUser = response.data?.id;

          console.log("🟢 後端回傳 menu:", resMenu);
          console.log("🟢 後端回傳 id:", hasUser);

          if (hasUser) {
            if (resMenu === "sign") router.push("/2007028490/notify_info");
            else if (resMenu === "roadRecord")
              router.push("/2007028490/roadRecord");
            else router.push("/2007028490/notify_info"); // 預設 fallback
          } else {
            router.push("/2007028490/signIn");
          }
        } else {
          console.warn("⚠️ 無法取得 userId");
          router.push("/2007028490/signIn");
        }
      } catch (error) {
        console.error("❌ 發生錯誤:", error);
        router.push("/2007028490/signIn");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [menu, router]);

  if (loading) return <p className="p-4">🔄 登入中，請稍候...</p>;

  return <div className="p-4">✅ 處理完成</div>;
}
