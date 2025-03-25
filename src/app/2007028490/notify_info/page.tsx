import { Suspense } from "react";
import ProfileClient from "./_components/ProfileClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">載入中...</div>}>
      <ProfileClient />
    </Suspense>
  );
}
