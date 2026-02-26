"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, LogOut, Globe, User, Bell, Shield, HelpCircle,
  Handshake, ChevronRight, Package, CheckCircle, Eye
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { signOutUser } from "@/lib/firebase/auth";
import { getMyListingsStats } from "@/app/actions/listings";

export default function SettingsPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [stats, setStats] = useState({ listed: 0, sold: 0, views: 0 });

  useEffect(() => {
    if (user) {
      getMyListingsStats().then(setStats);
    }
  }, [user]);

  const settingsLinks = [
    { href: "/settings/partner", label: t('becomePartner'), icon: Handshake, highlight: true },
    { href: "/settings/account", label: t('accountInfo'), icon: User },
    { href: "/settings/notifications", label: t('notifications'), icon: Bell },
    { href: "/settings/language", label: t('language'), icon: Globe },
    // { href: "/settings/privacy", label: t('privacySecurity'), icon: Shield },
    { href: "/settings/help", label: t('helpSupport'), icon: HelpCircle },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOutUser();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  // Derive user info
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen pb-24 md:pl-64">
      {/* Header */}
      <div className="glass-nav p-4 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => router.back()} className="p-2 hover:bg-white/40 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('settings')}</h1>
      </div>

      <div className="max-w-xl mx-auto p-4 mt-4 space-y-5">

        {/* Profile Card */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-200 shadow-md"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {authLoading ? "..." : initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 text-lg truncate">
                {authLoading ? "..." : displayName}
              </h2>
              <p className="text-sm text-gray-500 truncate">{email}</p>
            </div>
            <Link
              href="/settings/account"
              className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
            >
              {t('edit')}
            </Link>
          </div>
        </div>

        {/* Livestock Stats */}
        <div className="glass-card p-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('myLivestockStats')}</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => router.push("/settings/my-listings")}
              className="text-center p-3 bg-white/50 rounded-xl hover:bg-blue-50/60 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Package size={16} className="text-blue-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.listed}</p>
              <p className="text-xs text-gray-500 font-medium">{t('listed')}</p>
            </button>
            <div className="text-center p-3 bg-white/50 rounded-xl">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.sold}</p>
              <p className="text-xs text-gray-500 font-medium">{t('sold')}</p>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-xl">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-purple-50 flex items-center justify-center">
                <Eye size={16} className="text-purple-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">{stats.views}</p>
              <p className="text-xs text-gray-500 font-medium">{t('views')}</p>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Globe size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{t('language')} / ഭാഷ</p>
                <p className="text-xs text-gray-500">{t('selectLanguage')}</p>
              </div>
            </div>

            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${language === 'ml' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                മലയാളം
              </button>
            </div>
          </div>
        </div>

        {/* Settings Links */}
        <div className="glass-card overflow-hidden">
          {settingsLinks.map(({ href, label, icon: Icon, highlight }, index) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-4 transition-colors ${highlight
                ? "bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
                : "hover:bg-white/40"
                } ${index < settingsLinks.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${highlight ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                }`}>
                <Icon size={18} />
              </div>
              <span className={`flex-1 font-medium text-sm ${highlight ? "text-emerald-700 font-bold" : "text-gray-700"}`}>
                {label}
              </span>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors disabled:opacity-50"
        >
          {loggingOut ? (
            <div className="w-5 h-5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
          ) : (
            <LogOut size={18} className="text-red-600" />
          )}
          <span className="font-bold text-red-600 text-sm">
            {loggingOut ? t('loggingOut') : t('logOut')}
          </span>
        </button>

      </div>
    </div>
  );
}
