"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { bottomTabs } from "@/data/nav";
import { Settings, LogOut, LogIn, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { signOutUser } from "@/lib/firebase/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const getLabel = (label: string) => {
    const lower = label.toLowerCase();
    if (lower === 'home') return t('home');
    if (lower === 'sell') return t('sell');
    if (lower === 'scan') return t('scan');
    if (lower === 'product') return t('product');
    if (lower === 'learn') return t('learn');
    return label;
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed inset-y-0 left-0 glass-panel border-r border-white/40 z-50 rounded-none shadow-none">
      <div className="p-6 border-b border-white/20 flex items-center gap-3">
        {/* <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
          
        </div> */}
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 text-glow">
          Moofinder
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-neutral-400 px-4 mb-2 uppercase tracking-wider">
          Menu
        </div>
        {bottomTabs.map(({ name, icon: Icon, href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                ? "bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100"
                : "text-neutral-500 hover:bg-white/40 hover:text-emerald-800"
                }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
              />
              <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>
                {getLabel(label)}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-emerald-200 shadow-md" />
              )}
            </Link>
          );
        })}

        <div className="mt-8 text-xs font-semibold text-neutral-400 px-4 mb-2 uppercase tracking-wider">
          Account
        </div>
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${pathname === "/settings"
            ? "bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100"
            : "text-neutral-500 hover:bg-white/40 hover:text-emerald-800"
            }`}
        >
          <Settings size={22} />
          <span>{t('settings')}</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:bg-white/40 hover:text-emerald-800 transition-all font-medium"
        >
          <Bell size={22} />
          <span>{t('notifications')}</span>
        </Link>
      </div>

      {/* User info + Logout */}
      <div className="p-4 border-t border-white/20">
        {user ? (
          <div>
            {/* User profile mini */}
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-200"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-800 truncate">{displayName}</p>
                <p className="text-xs text-neutral-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50/50 rounded-xl transition-colors font-medium hover:shadow-sm"
            >
              <LogOut size={20} />
              <span>{t('logOut')}</span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 w-full px-4 py-3 text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-colors font-medium hover:shadow-sm"
          >
            <LogIn size={22} />
            <span>{t('signIn')}</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
