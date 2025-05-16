"use client";

import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { useAuth } from "@/utils/providers/AuthProvider";
import Loading from "@/components/Loading";
import { useSetLoading } from "@/app/hooks/useSetLoading";

const RedirectPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useSetLoading(isLoading);
  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    let photo = searchParams.get("photo");

    if (token && name) {
      photo = photo ? photo : "";
      Cookies.set("token", JSON.stringify({ name, photo, token }));
      setUser({ name, photo, token });
      router.push("/isAuth");
    } else {
      router.push("/");
    }
    setIsLoading(false);
  }, [searchParams, router, setUser]);

  return <Loading />;
};

const RedirectPage = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <RedirectPageContent></RedirectPageContent>
    </Suspense>
  );
};

export default RedirectPage;
