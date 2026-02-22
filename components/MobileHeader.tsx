"use client";

import { Bell, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LocationPicker from "./LocationPicker";
import { useAuth } from "@/context/AuthContext";

export default function MobileHeader() {
  const { user, loading } = useAuth();

  return (
    <header className="glass-nav md:hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left: Location */}
        <LocationPicker />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white text-emerald-500 hover:text-emerald-600 transition-all active:scale-95 shadow-sm border border-emerald-100/50"
          >
            <Bell size={20} className="fill-emerald-50" />
          </Link>

          {/* Auth-aware: user photo or sign in */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse" />
          ) : user ? (
            <Link
              href="/settings"
              className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-all active:scale-95 shadow-sm border-2 border-emerald-200 hover:border-emerald-400"
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

