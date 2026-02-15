"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, Zap, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanResult } from "@/lib/mockAI"; // Keeping ScanResult interface for now
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ScanPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null); // Use ref for immediate access in cleanup
    const [image, setImage] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [cameraError, setCameraError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        startCamera();
        return () => stopCamera(); // Cleanup on unmount
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
            streamRef.current = mediaStream;
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setCameraError(false);
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraError(true);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvas.toDataURL("image/jpeg");
                setImage(dataUrl);
                startAnalysis(dataUrl);
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                setImage(dataUrl);
                startAnalysis(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const startAnalysis = async (img: string) => {
        setIsScanning(true);
        setResult(null);
        stopCamera(); // Stop camera immediately after capture

        try {
            // Convert base64 to blob
            const response = await fetch(img);
            const blob = await response.blob();
            const file = new File([blob], "cattle_scan.jpg", { type: "image/jpeg" });

            const formData = new FormData();
            formData.append("image", file);

            const apiRes = await fetch("/api/analyze-cattle", {
                method: "POST",
                body: formData,
            });

            const data = await apiRes.json();

            if (!apiRes.ok) {
                setResult(null);
                alert(data.error || "Analysis failed"); // Simple alert for now, could be better UI
            } else {
                // Map API response to ScanResult type
                setResult({
                    breed: data.breed_guess !== "unknown" ? data.breed_guess : data.animal_type,
                    confidence: parseInt(data.confidence_score) || 85,
                    health: data.health_observation !== "unknown" ? data.health_observation : "No issues visible",
                    estimatedPrice: "₹45,000 - ₹60,000", // AI doesn't give price, keep mock logic or "Contact for price"
                    weight: data.estimated_age_range, // Using age range effectively as extra info
                    features: [data.color_pattern, data.distinct_markings].filter(f => f && f !== "none")
                });
            }

        } catch (error) {
            console.error("Analysis failed:", error);
            alert("Failed to connect to analysis service.");
        } finally {
            setIsScanning(false);
        }
    };

    const resetScan = () => {
        setImage(null);
        setResult(null);
        startCamera();
    };

    const listForSale = () => {
        if (!result) return;
        const query = new URLSearchParams({
            breed: result.breed,
            age: result.weight, // mapping 'weight' field to age since API returns age in that slot
            price: result.estimatedPrice.replace(/[^0-9]/g, '').slice(0, 5), // rough parsing
            health: result.health
        }).toString();
        router.push(`/sell?${query}`);
    };

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black md:pl-64">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent md:pl-8">
                <Link href="/" className="text-white bg-black/20 backdrop-blur-md p-2 rounded-full hover:bg-black/40 transition">
                    <X size={24} />
                </Link>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <Zap size={16} className={isScanning ? "text-yellow-400 fill-yellow-400 animate-pulse" : "text-gray-400"} />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">AI Scanner</span>
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden bg-gray-900">
                {!image ? (
                    // Camera View using HTML5 Video
                    <div className="relative h-full w-full">
                        {!cameraError ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white p-6 text-center">
                                <Camera size={48} className="mb-4 text-gray-500" />
                                <p>Camera access needed. Please upload a photo instead.</p>
                            </div>
                        )}

                        {/* Guide Frame */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 border-2 border-white/50 rounded-2xl relative">
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-500 -mt-1 -ml-1 rounded-tl-lg" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-500 -mt-1 -mr-1 rounded-tr-lg" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-500 -mb-1 -ml-1 rounded-bl-lg" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-500 -mb-1 -mr-1 rounded-br-lg" />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Image Preview
                    <div className="relative h-full w-full">
                        <Image src={image} alt="Captured" fill className="object-cover" />
                        {isScanning && (
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10">
                                <ScanAnimation />
                                <p className="text-white font-bold mt-4 animate-pulse">Analyzing Cattle ID...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="bg-black/80 backdrop-blur-xl p-8 pb-Safe md:pb-8">
                {!image ? (
                    <div className="flex items-center justify-around">
                        <label className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer">
                            <Upload size={24} />
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </label>

                        <button
                            onClick={captureImage}
                            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition"
                            disabled={cameraError}
                        >
                            <div className="w-16 h-16 bg-white rounded-full" />
                        </button>

                        <button onClick={() => { }} className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition opacity-0 pointer-events-none">
                            <RefreshCw size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {isScanning ? (
                            <div className="text-center space-y-2">
                                <p className="text-emerald-400 font-bold animate-pulse">Analyzing Cattle...</p>
                                <p className="text-gray-400 text-xs text-center">Detecting breed and health markers</p>
                            </div>
                        ) : result ? (
                            <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-50 animate-in slide-in-from-bottom-full duration-500 md:left-64">
                                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-2xl font-bold text-gray-900 capitalize">{result.breed}</h2>
                                            <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                                <CheckCircle size={10} /> {result.confidence}% Match
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm">Est. Price: <span className="text-gray-900 font-bold">{result.estimatedPrice}</span></p>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emoji-xl">
                                        🐮
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500 font-bold uppercase">Age / Features</p>
                                        <p className="font-semibold text-gray-900 text-sm">{result.weight}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl">
                                        <p className="text-xs text-gray-500 font-bold uppercase">Health</p>
                                        <p className="font-semibold text-emerald-600 text-sm">{result.health}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={resetScan} className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition">
                                        Scan Again
                                    </button>
                                    <button onClick={listForSale} className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                                        List for Sale <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}

function ScanAnimation() {
    return (
        <div className="relative w-20 h-20">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-emerald-500 rounded-full"
            />
            <Zap className="absolute inset-0 m-auto text-emerald-400" />
        </div>
    )
}
