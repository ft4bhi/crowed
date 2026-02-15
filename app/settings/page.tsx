"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingsPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Raju Farms",
    phone: "+91 98765 43210",
    address: "Kochi, Kerala",
    email: "raju@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/profile");
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-24 md:pl-64">
      <div className="glass-nav p-4 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => router.back()} className="p-2 hover:bg-white/40 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('settings')}</h1>
      </div>

      <div className="max-w-xl mx-auto p-4 mt-4 space-y-6">

        {/* Language Settings */}
        <div className="glass-card p-6">
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

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
          <h2 className="font-bold text-lg text-gray-800">{t('editProfile')}</h2>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{t('fullName')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{t('phoneNumber')}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 glass-input opacity-70 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{t('address')}</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 glass-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black/80 backdrop-blur-md text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {t('saveChanges')}
          </button>
        </form>
      </div>
    </div>
  );
}
