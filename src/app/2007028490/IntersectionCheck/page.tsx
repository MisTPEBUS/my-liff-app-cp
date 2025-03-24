"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const violations = [
  "闖紅燈",
  "超速行駛",
  "違規停車",
  "未依規定讓行",
  "未打方向燈",
  "使用手機",
  "未繫安全帶",
  "違規變換車道",
  "酒駕",
  "併排停車",
];

const formSchema = z.object({
  address: z.string().min(1, "地址為必填"),
  plateNumber: z.string().min(1, "車號為必填"),
  company: z.string().min(1, "公司為必填"),
  route: z.string().min(1, "路線為必填"),
  selectedViolations: z.array(z.string()).min(1, "至少選擇一項違規事項"),
});

type FormData = z.infer<typeof formSchema>;

export default function ViolationForm() {
  const [submitStatus, setSubmitStatus] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { selectedViolations: [] },
  });

  const selectedViolations = watch("selectedViolations");

  const handleCardClick = (violation: string) => {
    if (selectedViolations.includes(violation)) {
      setValue(
        "selectedViolations",
        selectedViolations.filter((v) => v !== violation)
      );
    } else {
      setValue("selectedViolations", [...selectedViolations, violation]);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { ...data };
      console.log(payload);
      setSubmitStatus("提交成功！");
      // 此處呼叫 API 送出 payload
    } catch (error) {
      setSubmitStatus(`提交失敗，請重試。${error}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">車輛違規評分表</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {["address", "plateNumber", "company", "route"].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1">
              {field === "address"
                ? "地址"
                : field === "plateNumber"
                ? "車號"
                : field === "company"
                ? "公司"
                : "路線"}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register(field as keyof FormData)}
              className="w-full border rounded p-2"
            />
            {errors[field as keyof FormData] && (
              <p className="text-sm text-red-500">
                {errors[field as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <div>
          <label className="block font-semibold mb-2">
            違規事項<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {violations.map((v) => (
              <div
                key={v}
                onClick={() => handleCardClick(v)}
                className={`cursor-pointer border rounded-lg p-3 text-center ${
                  selectedViolations.includes(v)
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100"
                }`}
              >
                {v}
              </div>
            ))}
          </div>
          {errors.selectedViolations && (
            <p className="text-sm text-red-500">
              {errors.selectedViolations.message}
            </p>
          )}
        </div>

        <div className="relative">
          <button
            className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600 
    sticky bottom-0 left-0 mt-4 shadow-lg"
          >
            提交
          </button>
        </div>

        {submitStatus && (
          <p className="text-center mt-2 font-semibold">{submitStatus}</p>
        )}
      </form>
    </div>
  );
}
