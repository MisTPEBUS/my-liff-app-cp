"use client";

import { useState } from "react";
import {
  Home,
  Settings,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const navItems = [
  { href: "/", label: "首頁", icon: <Home className="w-5 h-5" /> },
  { href: "/chat", label: "聊天", icon: <MessageCircle className="w-5 h-5" /> },
  { href: "/settings", label: "設定", icon: <Settings className="w-5 h-5" /> },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen fixed top-0 left-0 bg-white border-r shadow-sm p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && <h2 className="text-xl font-bold">選單</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 hover:text-blue-500"
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
