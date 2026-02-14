"use client";

import { Check, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", sub: "English (US)" },
  { code: "hi", name: "Hindi", sub: "हिंदी" },
  { code: "ml", name: "Malayalam", sub: "മലയാളം" },
  { code: "ta", name: "Tamil", sub: "தமிழ்" },
  { code: "kn", name: "Kannada", sub: "ಕನ್ನಡ" },
  { code: "te", name: "Telugu", sub: "తెలుగు" },
];

export default function LanguageSettingsPage() {
  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/settings" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Choose Language</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    selectedLang === lang.code ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                 }`}>
                    {lang.code.toUpperCase()}
                 </div>
                 <div className="text-left">
                    <h3 className={`font-bold ${selectedLang === lang.code ? "text-blue-700" : "text-gray-900"}`}>{lang.name}</h3>
                    <p className="text-xs text-gray-500">{lang.sub}</p>
                 </div>
              </div>
              
              {selectedLang === lang.code && (
                <div className="bg-blue-600 rounded-full p-1 text-white shadow-lg shadow-blue-200">
                    <Check size={16} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
