"use client";

import { Bell, ShoppingBag, Truck, Gift, Info, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    offers: true,
    orderStatus: true,
    recommendations: true,
    newsletter: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/settings" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                 <Bell size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Enable or disable all app alerts</p>
              </div>
            </div>
            <button 
                onClick={() => toggle("push")}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.push ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.push ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                 <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Order Updates</h3>
                <p className="text-sm text-gray-500">Get notified about your purchases</p>
              </div>
            </div>
             <button 
                onClick={() => toggle("orderStatus")}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.orderStatus ? 'bg-green-500' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.orderStatus ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                 <Gift size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Promotions & Offers</h3>
                <p className="text-sm text-gray-500">Exclusive deals just for you</p>
              </div>
            </div>
             <button 
                onClick={() => toggle("offers")}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.offers ? 'bg-orange-500' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.offers ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                 <Info size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Recommendations</h3>
                <p className="text-sm text-gray-500">Personalized suggestions</p>
              </div>
            </div>
             <button 
                onClick={() => toggle("recommendations")}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.recommendations ? 'bg-purple-500' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.recommendations ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
