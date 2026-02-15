"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MapPin, X, Check, Crosshair } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const locations = [
    "Kerala, IN",
    "Tamil Nadu, IN",
    "Karnataka, IN",
    "Andhra Pradesh, IN",
    "Telangana, IN",
    "Maharashtra, IN",
    "Gujarat, IN",
    "Rajasthan, IN",
    "Punjab, IN",
    "Haryana, IN",
];

export default function LocationPicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Kerala, IN");
    const [isDetecting, setIsDetecting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t, tDynamic } = useLanguage();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
        setIsOpen(false);
    };

    const detectLocation = () => {
        setIsDetecting(true);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Use reverse geocoding to get location name
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();

                        // Extract state from the address
                        const state = data.address?.state || "Unknown";
                        const country = data.address?.country_code?.toUpperCase() || "IN";
                        const detectedLocation = `${state}, ${country}`;

                        setSelectedLocation(detectedLocation);
                        setIsDetecting(false);
                        setIsOpen(false);
                    } catch (error) {
                        console.error("Error getting location name:", error);
                        setIsDetecting(false);
                        alert("Could not detect location. Please select manually.");
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setIsDetecting(false);
                    alert("Location access denied. Please select manually.");
                }
            );
        } else {
            setIsDetecting(false);
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-sm font-bold text-gray-800 bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/60 hover:bg-white hover:shadow-md transition-all group"
            >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin size={14} className="text-green-600 fill-green-600/20" />
                </div>
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{tDynamic(selectedLocation)}</span>
            </button>

            {/* Portal to Body for Full Screen Overlay */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div
                        className="absolute inset-0"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-xs bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl ring-1 ring-white/50 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
                        {/* Header Section */}
                        <div className="p-6 pb-2 shrink-0">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors z-20"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin size={22} className="text-primary-600" />
                                    {t('selectLocation')}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{t('chooseRegion')}</p>
                            </div>

                            <button
                                onClick={detectLocation}
                                disabled={isDetecting}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-600/20"
                            >
                                <Crosshair size={20} className={isDetecting ? "animate-spin" : ""} />
                                <span>{isDetecting ? t('detecting') : t('useCurrentLocation')}</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative py-2 shrink-0">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                                <span className="bg-white/95 px-3 text-gray-400">{t('orSelect')}</span>
                            </div>
                        </div>

                        {/* Scrollable List */}
                        <div className="p-4 pt-2 overflow-y-auto flex-1 min-h-0 space-y-2">
                            {locations.map((location) => (
                                <button
                                    key={location}
                                    onClick={() => handleLocationSelect(location)}
                                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all border ${selectedLocation === location
                                        ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                                        : "bg-gray-50/50 border-gray-100 text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <span className="font-medium">{tDynamic(location)}</span>
                                    {selectedLocation === location && (
                                        <Check size={20} className="text-primary-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
