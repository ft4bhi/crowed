"use client";

import { User, MapPin, Mail, Phone, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AccountSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/settings" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Account Information</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center mb-6">
             <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl mb-3 border-4 border-white shadow-lg">
                JD
             </div>
             <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Change Photo</button>
          </div>

          <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    defaultValue="John Doe" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="tel" 
                    defaultValue="+91 98765 43210" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-gray-50"
                    readOnly
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Verified</span>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="email" 
                    defaultValue="johndoe@example.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    defaultValue="Kochi, Kerala" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>
          </div>

          <div className="pt-4">
             <button 
                onClick={handleSave}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
             >
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
