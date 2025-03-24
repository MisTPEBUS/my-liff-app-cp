"use client";

import { useEffect, useState, ReactNode } from "react";
import liff from "@line/liff";

interface LineLiffProps {
  id: string;
  children?: ReactNode; // 支援 children
}

const LineLiff = ({ id, children }: LineLiffProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "YOUR_LIFF_ID" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        setIsLoggedIn(true);
        const userProfile = await liff.getProfile();
        setProfile(userProfile);
      } catch (err) {
        console.error("LIFF 初始化失敗:", err);
        setError("LIFF 初始化失敗，請重新整理");
      }
    };

    initLiff();
  }, []);

  const sendMessageToLine = async () => {
    try {
      await liff.sendMessages([
        { type: "text", text: `Cash Notify ID: ${id}` },
      ]);
      alert("已發送訊息到 LINE");
    } catch (err) {
      console.error("發送訊息失敗:", err);
      setError("發送訊息失敗，請稍後再試");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-4">
      <h2 className="text-lg font-bold">LINE LIFF</h2>
      <p>ID: {id}</p>

      {error && <p className="text-red-500">{error}</p>}

      {isLoggedIn ? (
        <div>
          <p>👤 {profile?.displayName}</p>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={sendMessageToLine}
          >
            發送 ID 到 LINE
          </button>

          {/* 顯示 children，這樣 NotifyInfo 會正確渲染 */}
          <div className="mt-4">{children}</div>
        </div>
      ) : (
        <p>正在登入 LINE...</p>
      )}
    </div>
  );
};

export default LineLiff;
