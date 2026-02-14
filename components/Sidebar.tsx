"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomTabs } from "@/data/nav";
import { Settings, LogOut, Bell } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          O
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          OlexCows
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 px-4 mb-2 uppercase tracking-wider">
          Menu
        </div>
        {bottomTabs.map(({ name, icon: Icon, href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>
                {label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}

        <div className="mt-8 text-xs font-semibold text-gray-400 px-4 mb-2 uppercase tracking-wider">
          Account
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all font-medium"
        >
          <Settings size={22} />
          <span>Settings</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all font-medium"
        >
          <Bell size={22} />
          <span>Notifications</span>
        </Link>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium">
          <LogOut size={22} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
