"use client";

import { MessageSquare, Phone, Mail, HelpCircle, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  { q: "How do I list my cattle?", a: "Go to the 'Sell' tab, follow the 5-step process to upload photos, details, and set a price." },
  { q: "Is there a fee for selling?", a: "Currently, Olex is free for all farmers. We do not charge any commission on sales." },
  { q: "How can I verify a buyer?", a: "Look for the 'Verified' badge on user profiles. We recommend meeting in person for transactions." },
  { q: "Can I edit my listing?", a: "Yes, go to your Profile > My Listings to edit or remove any active post." },
];

export default function HelpSettingsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/settings" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        </div>

        <div className="space-y-6">
          
          {/* Contact Cards */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="p-3 bg-green-50 text-green-600 rounded-full group-hover:scale-110 transition-transform">
                      <MessageSquare size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">Chat Support</h3>
                  <p className="text-xs text-gray-500">24/7 Available</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                      <Phone size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">Call Us</h3>
                  <p className="text-xs text-gray-500">+91 1800-123-456</p>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                  <Mail size={24} />
              </div>
              <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Email Support</h3>
                  <p className="text-xs text-gray-500">support@olex.com</p>
              </div>
          </div>

          {/* FAQs */}
          <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 ml-2">Frequently Asked Questions</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                  {faqs.map((faq, idx) => (
                      <div key={idx} className="group">
                          <button 
                             onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                             className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{faq.q}</span>
                              {openIndex === idx ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                          </button>
                          {openIndex === idx && (
                              <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed bg-gray-50/50">
                                  {faq.a}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
