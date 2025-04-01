import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">載入中...</div>}>
      notify_info
    </Suspense>
  );
}
