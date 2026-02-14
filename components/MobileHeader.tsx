"use client";

import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import LocationPicker from "./LocationPicker";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-emerald-100/90 via-green-50/90 to-emerald-100/90 backdrop-blur-md border-b border-green-100 shadow-sm md:hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left: Location */}
        <LocationPicker />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-orange-500 hover:text-orange-600 transition-all active:scale-95 shadow-sm border border-orange-100"
          >
            <Bell size={20} className="fill-orange-50" />
          </Link>
          <Link
            href="/settings"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-blue-600 hover:text-blue-700 transition-all active:scale-95 shadow-sm border border-blue-100"
          >
            <Settings size={20} className="animate-spin-slow" />
          </Link>
        </div>
      </div>
    </header>
  );
}
