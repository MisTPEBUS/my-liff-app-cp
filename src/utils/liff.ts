import liff from "@line/liff";

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || ""; // 🎯 從環境變數讀取 LIFF_ID

/** ✅ 初始化 LIFF */
export async function initLiff() {
  try {
    if (!LIFF_ID) {
      console.error("❌ 錯誤：LIFF_ID 未設定！");
      return;
    }

    await liff.init({ liffId: LIFF_ID });
    console.log("✅ LIFF 初始化成功，登入狀態：", liff.isLoggedIn());

    await liff.ready; // ✅ 確保 LIFF 完全初始化

    if (!liff.isLoggedIn()) {
      console.warn("⚠️ 使用者未登入，導向 LINE 登入...");
      liff.login();
      return;
    }
  } catch (error) {
    console.error("❌ LIFF 初始化失敗", error);
  }
}

/** ✅ 取得 `userId` */
export async function getUserProfile(): Promise<{
  userId: string;
  displayName: string;
} | null> {
  try {
    await liff.ready; // ✅ 確保 LIFF 已初始化

    if (!liff.isLoggedIn()) {
      console.warn("⚠️ 使用者未登入，無法取得 userId 和 displayName");
      return null;
    }

    const profile = await liff.getProfile();
    console.log("✅ 取得使用者資訊：", profile);

    return {
      userId: profile.userId,
      displayName: profile.displayName,
    };
  } catch (error) {
    console.error("❌ 取得使用者資訊失敗", error);
    return null;
  }
}
export async function closeWindow() {
  if (liff.isInClient()) {
    window.close();
  } else {
    alert("此功能僅適用於 LINE 應用程式內");
  }
}
