import { useState, useEffect } from "react";
import liff from "@line/liff";

interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  language?: string;
}

const useLiff = (liffId?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!liffId) return;

    const initLiff = async () => {
      try {
        console.log("Initializing LIFF with ID:", liffId);
        await liff.init({ liffId });

        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("LIFF 初始化失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    initLiff();
  }, [liffId]);

  const login = () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  const logout = () => {
    if (liff.isLoggedIn()) {
      liff.logout();
      window.location.reload();
    }
  };

  return { profile, isLoggedIn, login, logout, loading };
};

export default useLiff;
