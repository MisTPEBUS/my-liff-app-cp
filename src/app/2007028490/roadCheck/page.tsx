import { Suspense } from "react";
import ViolationForm from "./detail/page";
/* import ProfileClient from "./_components/ProfileClient"; */

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">載入中...</div>}>
      {/*    <ProfileClient /> */}
      <ViolationForm></ViolationForm>
    </Suspense>
  );
}
