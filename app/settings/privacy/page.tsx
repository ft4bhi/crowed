"use client";

import { Shield, Key, Eye, EyeOff, Lock, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PrivacySettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/settings" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Privacy & Security</h1>
        </div>

        <div className="space-y-6">
            
             {/* Change Password */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <Lock size={24} />
                   </div>
                   <h3 className="font-bold text-gray-900">Change Password</h3>
                </div>

                <div className="space-y-4">
                   <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Current Password"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      />
                   </div>
                   <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="New Password"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      />
                      <button 
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                   </div>
                   <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                      Update Password
                   </button>
                </div>
             </div>

             {/* Two Factor */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                      <Key size={24} />
                   </div>
                   <div>
                       <h3 className="font-bold text-gray-900">Two-Factor Auth</h3>
                       <p className="text-sm text-gray-500">Secure your account with OTP</p>
                   </div>
                </div>
                 <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-all" />
                 </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-6">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-white text-red-600 rounded-xl shadow-sm">
                      <Trash2 size={24} />
                   </div>
                   <div>
                       <h3 className="font-bold text-red-700">Delete Account</h3>
                       <p className="text-xs text-red-500">Permanently remove your data</p>
                   </div>
                </div>
                <button className="w-full py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors">
                    Delete My Account
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}
