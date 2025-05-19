"use client";
import Link from "next/link";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [user, setUser] = useState("superUser");
  const [pwd, setPwd] = useState("11111111");
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-xl font-bold text-[#222222] mb-6">
          您目前尚未登入
        </h2>

        <form>
          {/* 帳號 */}
          <div className="mb-4">
            <label
              htmlFor="account"
              className="block text-sm font-medium text-[#4A4A4A] mb-1"
            >
              帳號
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              id="account"
              placeholder="請輸入帳號"
              className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg text-[#222222] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#F8451A] focus:border-[#F8451A]"
            />
          </div>

          {/* 密碼 */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#4A4A4A] mb-1"
            >
              密碼
            </label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              id="password"
              placeholder="請輸入密碼"
              className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg text-[#222222] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#F8451A] focus:border-[#F8451A]"
            />
          </div>

          {/* 記住密碼 & 忘記密碼 */}
          <div className="mb-4 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#4A4A4A]">
              <input
                type="checkbox"
                className="accent-[#F8451A] rounded"
                defaultChecked
              />
              記住密碼
            </label>
            <a href="#" className="text-[#F8451A] hover:underline">
              忘記密碼？
            </a>
          </div>

          {/* 同意條款 */}
          <div className="mb-6 text-sm">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="accent-[#F8451A] rounded mt-1"
                defaultChecked
              />
              <span className="text-[#4A4A4A] leading-snug">
                我已閱讀並同意
                <a href="#" className="text-[#F8451A] hover:underline mx-1">
                  服務條款與隱私權政策
                </a>
              </span>
            </label>
          </div>

          {/* 登入按鈕 */}
          <Link href="/dashboard/revenue-history">
            <button className="w-full bg-[#F8451A] hover:bg-[#D33C3C] text-white font-bold py-2.5 rounded-lg transition-shadow hover:shadow-md">
              立即登入
            </button>
          </Link>

          {/* 註冊連結 */}
          <p className="mt-4 text-center text-sm text-[#4A4A4A]">
            還沒有成為會員？
            <a href="#" className="text-[#F8451A] hover:underline ml-1">
              立即註冊
            </a>
          </p>

          {/* 分隔線 */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-[#D9D9D9]" />
            <span className="mx-4 text-sm text-[#999999]">
              或使用其他方式登入
            </span>
            <div className="flex-grow border-t border-[#D9D9D9]" />
          </div>

          {/* Google 登入 */}
          <div className="flex justify-center">
            <a
              href="https://accounts.google.com/o/oauth2/v2/auth?client_id= &redirect_uri &response_type=code&scope=email%20profile&access_type=offline"
              className="flex items-center justify-center w-full gap-2 border border-[#D9D9D9] bg-[#F8F9FA] hover:bg-[#E0E0E0] text-[#4A4A4A] py-2.5 rounded-lg transition"
            >
              <FcGoogle size={20} />
              使用 Google 登入
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
