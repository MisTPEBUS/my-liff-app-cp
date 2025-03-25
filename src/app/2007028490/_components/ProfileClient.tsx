"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { initLiff, getUserProfile } from "@/utils/liff";

export default function ProfileClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<string | null>(null);

  // ✅ 取得 searchParams 並存進 state
  useEffect(() => {
    const value = searchParams.get("menu");
    setMenu(value);
    console.log("✅ menu 參數為：", value);
  }, [searchParams]);

  // ✅ 當 menu 有值時，再執行主流程
  useEffect(() => {
    if (!menu) return;

    console.log("🟢 useEffect 觸發了！");
    debugger;

    async function fetchUserIdAndData() {
      console.log("🟢 fetchUserIdAndData 開始執行");
      await initLiff();
      const Profile = await getUserProfile();
      console.log("🟢 取得的 Profile:", Profile);

      if (Profile?.userId) {
        Cookies.set("userId", Profile.userId, { expires: 7 });
        Cookies.set("displayName", Profile.displayName, { expires: 7 });

        try {
          console.log("🟢 發送 API 請求... userId + menu");

          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: Profile.userId,
              channelId: "2007028490",
              menu: menu, // ✅ 使用來自 state 的 menu
            }
          );

          console.log("🟢 API response id:", response.data?.id);
          const resMenu = response.data?.menu;
          console.log("🟢 從後端回傳的 menu:", resMenu);

          if (response.data?.id && response.data) {
            if (resMenu === "sign") router.push(`/2007028490/notify_info`);
            if (resMenu === "roadRecord") router.push(`/2007028490/roadRecord`);
          } else {
            router.push(`/2007028490/signIn`);
          }
        } catch (error) {
          router.push(`/2007028490/signIn`);
          console.error("❌ API 請求失敗:", error);
        }
      }

      setLoading(false);
    }

    fetchUserIdAndData();
  }, [router, menu]); // ✅ 把 menu 加入依賴陣列

  if (loading) return <p>載入中...</p>;
  return <div className="p-4">Profile 資料處理完成</div>;
}
