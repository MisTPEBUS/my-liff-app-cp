"use client";

import { useEffect, useState, createContext, useContext } from "react";
import liff from "@line/liff";

interface LiffContextValue {
  initialized: boolean;
  isError: boolean;
}

const LiffContext = createContext<LiffContextValue>({
  initialized: false,
  isError: false,
});

export const useLiff = () => useContext(LiffContext);

export default function LiffProvider({
  liffId,
  children,
}: {
  liffId: string;
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId });
        setInitialized(true);
        console.log("LIFF 初始化成功");
      } catch (error) {
        setIsError(true);
        console.error("LIFF 初始化失敗", error);
      }
    };

    if (liffId) {
      initLiff();
    }
  }, [liffId]);

  return (
    <LiffContext.Provider value={{ initialized, isError }}>
      {children}
    </LiffContext.Provider>
  );
}
