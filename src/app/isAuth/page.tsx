"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/providers/AuthProvider";

const IsAuthPage = () => {
  const [userData, setUserData] = useState<{
    name: string;
    photo: string;
    token: string;
  } | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    const cookieData = Cookies.get("token");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        if (parsed.token && parsed.name) {
          setUserData(parsed);
          setUser(parsed); // 同步到全域 context，如果需要的話
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to parse cookie:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router, setUser]);

  if (!userData) return <div>驗證中...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">歡迎回來，{userData.name}</h1>
      {userData.photo && (
        <img
          src={userData.photo}
          alt="使用者頭像"
          className="w-16 h-16 rounded-full mt-2"
        />
      )}
    </div>
  );
};

export default IsAuthPage;
