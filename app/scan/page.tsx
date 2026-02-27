"use client";

import { useState, useRef } from "react";
import { Camera, Scan, Info, Upload, RefreshCw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BreedResult {
    breed: string;
    confidence: number;
    traits: string[];
    primary_use: string;
    is_cow: boolean;
}

export default function ScanPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<BreedResult | null>(null);
    const [notCow, setNotCow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target?.result as string;
            setImage(dataUrl);
            setResult(null);
            setNotCow(false);
            setError(null);
            analyzeImage(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const analyzeImage = async (dataUrl: string) => {
        setIsAnalyzing(true);
        try {
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], "breed_scan.jpg", { type: "image/jpeg" });

            const formData = new FormData();
            formData.append("image", file);

            const apiRes = await fetch("/api/breed-detect", {
                method: "POST",
                body: formData,
            });

            const data = await apiRes.json();

            if (!apiRes.ok) {
                setError(data.error || "Analysis failed. Please try again.");
                return;
            }

            if (data.is_cow === false) {
                setNotCow(true);
            } else {
                setResult(data as BreedResult);
            }
        } catch {
            setError("Failed to connect to the analysis service. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetScan = () => {
        setImage(null);
        setResult(null);
        setNotCow(false);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 md:pl-64">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-green-100">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-gray-400 hover:text-gray-600 transition">
                        ← Back
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200/50">
                            <Scan size={16} className="text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-gray-900">Breed Detection</h1>
                    </div>
                    <div className="w-12" />
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
                {/* Upload Section */}
                <AnimatePresence mode="wait">
                    {!image ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Hero */}
                            <div className="text-center space-y-2 pt-8">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-100 to-green-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-4xl">🐄</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Bovine Breed Detection</h2>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                                    Upload or take a photo of a cow to instantly identify its breed, traits and primary use.
                                </p>
                            </div>

                            {/* Upload Button */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer group"
                            >
                                <div className="border-2 border-dashed border-green-300 rounded-2xl p-10 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-300">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-300/40 group-hover:scale-110 transition-transform duration-300">
                                        <Camera size={28} className="text-white" />
                                    </div>
                                    <p className="mt-4 font-semibold text-gray-800">Upload or Take Photo</p>
                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</p>
                                </div>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={handleFileSelect}
                            />

                            {/* How it works */}
                            <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Info size={16} className="text-emerald-600" />
                                    <h3 className="font-semibold text-gray-800 text-sm">How it works</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { step: "1", text: "Upload a clear photo of the cow" },
                                        { step: "2", text: "Our AI analyzes breed characteristics" },
                                        { step: "3", text: "Get breed, traits, and confidence score" },
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
                                                {item.step}
                                            </div>
                                            <p className="text-sm text-gray-600">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-5"
                        >
                            {/* Image Preview */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-green-200/30 border border-green-100">
                                <div className="relative aspect-[4/3] w-full">
                                    <Image
                                        src={image}
                                        alt="Uploaded cow"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Loading Overlay */}
                                {isAnalyzing && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                                    >
                                        <div className="relative w-16 h-16">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-4 border-transparent border-t-emerald-400 border-r-emerald-400 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-1 border-4 border-transparent border-b-green-300 border-l-green-300 rounded-full"
                                            />
                                            <Scan size={20} className="absolute inset-0 m-auto text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white font-semibold text-sm">Analyzing Breed...</p>
                                            <p className="text-white/60 text-xs mt-1">This may take a few seconds</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Skeleton Loader */}
                            {isAnalyzing && (
                                <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm space-y-4 animate-pulse">
                                    <div className="h-6 bg-gray-200 rounded-lg w-2/3" />
                                    <div className="h-4 bg-gray-100 rounded-full w-full" />
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-100 rounded w-4/5" />
                                        <div className="h-3 bg-gray-100 rounded w-3/5" />
                                        <div className="h-3 bg-gray-100 rounded w-2/5" />
                                    </div>
                                    <div className="h-8 bg-gray-100 rounded-full w-1/3" />
                                </div>
                            )}

                            {/* Not a Cow Message */}
                            <AnimatePresence>
                                {notCow && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center"
                                    >
                                        <div className="w-14 h-14 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                            <AlertTriangle size={24} className="text-amber-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900">No Cow Detected</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Oops! That doesn&apos;t look like a cow. Please try a different photo.
                                        </p>
                                        <button
                                            onClick={resetScan}
                                            className="mt-4 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition inline-flex items-center gap-2"
                                        >
                                            <RefreshCw size={14} /> Try Again
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
                                    >
                                        <h3 className="font-bold text-red-800">Something went wrong</h3>
                                        <p className="text-sm text-red-600 mt-1">{error}</p>
                                        <button
                                            onClick={resetScan}
                                            className="mt-4 px-5 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition inline-flex items-center gap-2"
                                        >
                                            <RefreshCw size={14} /> Try Again
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Result Card */}
                            <AnimatePresence>
                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 30 }}
                                        transition={{ type: "spring", damping: 20 }}
                                        className="bg-white rounded-2xl border border-green-100 shadow-xl shadow-green-100/40 overflow-hidden"
                                    >
                                        {/* Card Header */}
                                        <div className="p-5 pb-4 border-b border-green-50">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Detected Breed</p>
                                                    <h2 className="text-2xl font-bold text-gray-900 capitalize">{result.breed}</h2>
                                                </div>
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-50 rounded-xl flex items-center justify-center shrink-0">
                                                    <span className="text-2xl">🐮</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5 space-y-5">
                                            {/* Confidence Bar */}
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confidence Score</p>
                                                    <span className="text-sm font-bold text-emerald-600">{result.confidence}%</span>
                                                </div>
                                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${result.confidence}%` }}
                                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                                        className={`h-full rounded-full ${result.confidence >= 80
                                                                ? "bg-gradient-to-r from-emerald-400 to-green-500"
                                                                : result.confidence >= 50
                                                                    ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                                                                    : "bg-gradient-to-r from-red-400 to-red-500"
                                                            }`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Key Traits */}
                                            {result.traits && result.traits.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Traits</p>
                                                    <ul className="space-y-1.5">
                                                        {result.traits.map((trait, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                                className="flex items-center gap-2 text-sm text-gray-700"
                                                            >
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                                {trait}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Primary Use */}
                                            {result.primary_use && (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Primary Use</p>
                                                    <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                                                        {result.primary_use}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Footer */}
                                        <div className="p-5 pt-0">
                                            <button
                                                onClick={resetScan}
                                                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold text-sm hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2"
                                            >
                                                <Camera size={16} /> Scan Another
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
