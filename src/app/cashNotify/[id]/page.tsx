"use client";

import LineLiff from "@/app/_components/LineLiff/LineLiff";
import ProductDetail from "@/app/_components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";
import NotifyInfo from "./notify_info/page";

/* import { useEffect, useState } from "react"; */

const CashNotifyPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0] || "";

  /*   const [data, setData] = useState<any>(null); */

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cash Notify ID: {id}</h1>
      {<ProductDetail id={id} />}
      {
        <LineLiff id={id}>
          <NotifyInfo></NotifyInfo>
        </LineLiff>
      }
    </div>
  );
};

export default CashNotifyPage;
