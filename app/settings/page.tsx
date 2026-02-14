"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
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
        <h1 className="text-lg font-bold text-gray-900">Settings</h1>
      </div>

      <div className="max-w-xl mx-auto p-4 mt-4">
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
          <h2 className="font-bold text-lg text-gray-800">Edit Profile</h2>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Email</label>
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
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Address</label>
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
