"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserProfile, initLiff } from "@/utils/liff";

export default function ProfileClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const menu = searchParams.get("menu"); // ✅ 直接在這邊抓
      console.log("✅ 取得 menu 參數：", menu);

      if (!menu) {
        console.warn("⚠️ menu 為 null，導回首頁或顯示錯誤");
        router.push("/");
        return;
      }

      console.log("🟢 初始化 LIFF...");
      await initLiff();
      const Profile = await getUserProfile();
      console.log("🟢 取得的 Profile:", Profile);

      if (Profile?.userId) {
        Cookies.set("userId", Profile.userId, { expires: 7 });
        Cookies.set("displayName", Profile.displayName, { expires: 7 });

        try {
          const response = await axios.post(
            "https://line-notify-18ab.onrender.com/v1/api/lineHook/user/checkUser",
            {
              userId: Profile.userId,
              channelId: "2007028490",
            }
          );

          const userExists = response.data?.id && response.data;
          console.log("🟢 使用者是否存在：", userExists);

          if (userExists) {
            if (menu === "sign") router.push(`/2007028490/notify_info`);
            else if (menu === "roadRecord")
              router.push(`/2007028490/roadRecord`);
            else router.push(`/2007028490/signIn`);
          } else {
            router.push(`/2007028490/signIn`);
          }
        } catch (error) {
          console.error("❌ 發送 API 時發生錯誤:", error);
          router.push(`/2007028490/signIn`);
        }
      } else {
        console.warn("⚠️ 無法取得 Profile.userId，導向登入頁");
        router.push(`/2007028490/signIn`);
      }

      setLoading(false);
    };

    run();
  }, [searchParams, router]);

  if (loading) {
    return <p>載入中...</p>;
  }

  return <div className="p-6"></div>;
}
