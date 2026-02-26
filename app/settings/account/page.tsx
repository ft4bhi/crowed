"use client";

import { User, MapPin, Mail, Phone, ArrowLeft, Loader2, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, updateUserProfile } from "@/app/actions/users";

export default function AccountSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [address, setAddress] = useState("");
  const [farmingExperience, setFarmingExperience] = useState("");

  // Load profile from DB
  useEffect(() => {
    if (!user) return;
    getUserProfile().then((profile) => {
      if (profile) {
        setDisplayName(profile.displayName || user.displayName || "");
        setBio(profile.bio || "");
        setPhone(profile.phone || "");
        setWhatsappNumber(profile.whatsappNumber || "");
        setAddress(profile.address || "");
        setFarmingExperience(profile.farmingExperience?.toString() || "");
      } else {
        // No DB row yet — prefill from Firebase
        setDisplayName(user.displayName || "");
      }
      setFetching(false);
    });
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    setSaved(false);
    const result = await updateUserProfile({
      displayName,
      bio,
      phone,
      whatsappNumber,
      address,
      farmingExperience: farmingExperience ? parseInt(farmingExperience) : undefined,
    });
    setIsLoading(false);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const email = user?.email || "";

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center md:pl-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

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
          {/* Avatar */}
          <div className="flex flex-col items-center justify-center mb-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-3"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-3 border-4 border-white shadow-lg">
                {(displayName[0] || "U").toUpperCase()}
              </div>
            )}
          </div>

          <div className="grid gap-5">
            {/* Display Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell buyers about yourself, your farm, experience..."
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none resize-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Kochi, Kerala"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Farming Experience */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Farming Experience (years)</label>
              <input
                type="number"
                value={farmingExperience}
                onChange={(e) => setFarmingExperience(e.target.value)}
                placeholder="e.g. 5"
                min={0}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : saved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
