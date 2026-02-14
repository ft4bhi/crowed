"use client";

import { Camera, ScanLine, X, Zap, Upload, Sparkles, CheckCircle2, AlertTriangle, Milk, TrendingUp, DollarSign } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeCattleImage } from "@/app/actions/image-analysis"; // Import server action
// import Image from "next/image"; // Not used directly for preview yet, will use img tag for simplicity with blob

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setResult(null);
    setIsScanning(true);

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string; 
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Content = base64String.split(",")[1];
      const mimeType = file.type;

      try {
        const analysis = await analyzeCattleImage(base64Content, mimeType);
        setResult(analysis);
      } catch (error) {
        console.error("Scan failed:", error);
        setResult({ error: "Failed to scan. Please try again." });
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-24 md:pl-64">
      {/* Hidden File Input */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Camera Viewport / Preview */}
      <div className="absolute inset-0 bg-gray-900 z-0">
        {preview ? (
            <img src={preview} alt="Scan Preview" className="w-full h-full object-cover opacity-60" />
        ) : (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        )}
        
        {/* Helper Grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/10 relative">
                    {i === 4 && (
                        <div className="absolute inset-0 border-2 border-white/50 rounded-lg m-2">
                             <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white"></div>
                             <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white"></div>
                             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white"></div>
                             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4 pt-safe">
        <button onClick={() => { setPreview(null); setResult(null); }} className="p-2 bg-black/40 rounded-full backdrop-blur-md">
            <X size={24} />
        </button>
        <div className="px-4 py-1 bg-black/40 rounded-full backdrop-blur-md text-sm font-medium flex items-center gap-2">
            <Sparkles size={14} className="text-yellow-400" />
            AI Scanner Active
        </div>
        <button className="p-2 bg-black/40 rounded-full backdrop-blur-md">
            <Zap size={24} className={isScanning ? "text-yellow-400" : "text-white"} />
        </button>
      </div>

      {/* Scanner Beam Animation */}
      <AnimatePresence>
        {isScanning && (
            <motion.div 
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20"
            />
        )}
      </AnimatePresence>

      {/* Controls & Results */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center gap-6 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-24 md:pb-8">
        
        <AnimatePresence>
            {result ? (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    className="w-full max-w-md bg-white text-gray-900 rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[70vh] no-scrollbar"
                >
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                    
                    {result.error ? (
                         <div className="text-center py-8">
                            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Failed</h3>
                            <p className="text-gray-500">{result.error}</p>
                            <button 
                                onClick={triggerCamera}
                                className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold"
                            >
                                Try Again
                            </button>
                         </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">{result.breed}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            <CheckCircle2 size={12} />
                                            {result.confidence}% Match
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <ScanLine size={24} />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Health Status */}
                                <div className={`p-4 rounded-xl border ${result.disease_analysis?.status === 'Healthy' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`p-1.5 rounded-full ${result.disease_analysis?.status === 'Healthy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            <AlertTriangle size={16} />
                                        </div>
                                        <h3 className={`font-bold ${result.disease_analysis?.status === 'Healthy' ? 'text-green-800' : 'text-red-800'}`}>
                                            {result.disease_analysis?.status || "Health Analysis"}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {result.disease_analysis?.description}
                                    </p>
                                    {result.disease_analysis?.symptoms?.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {result.disease_analysis.symptoms.map((sym: string, i: number) => (
                                                <span key={i} className="text-xs font-medium px-2 py-1 bg-white/50 rounded-md border border-gray-200 text-gray-600">
                                                    {sym}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                                            <Milk size={16} />
                                            <span className="text-xs font-bold uppercase">Lactation</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {result.lactation_potential}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2 text-green-600 mb-1">
                                            <DollarSign size={16} />
                                            <span className="text-xs font-bold uppercase">Est. Value</span>
                                        </div>
                                         <p className="font-semibold text-gray-900 text-sm">
                                            {result.listing_recommendation?.estimated_price_range || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Tips */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <TrendingUp size={18} className="text-purple-600" />
                                        Maintenance Guide
                                    </h3>
                                    <ul className="space-y-2">
                                        {result.maintenance_tips?.map((tip: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Actions */}
                                <div className="pt-2 flex gap-3">
                                    <button className="flex-1 py-3 bg-black text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-transform active:scale-95">
                                        List for Sale
                                    </button>
                                     <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            ) : (
                <>
                    <button 
                        onClick={triggerCamera}
                        disabled={isScanning}
                        className={`w-20 h-20 rounded-full border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center transition-all active:scale-95 ${isScanning ? 'bg-red-500 animate-pulse border-red-200' : 'bg-white/20 backdrop-blur-md hover:bg-white/30'}`}
                    >
                        <div className={`w-16 h-16 rounded-full bg-white transition-all duration-300 ${isScanning ? 'scale-50 rounded-lg' : ''}`}></div>
                    </button>
                    
                    {!isScanning && (
                        <div className="flex gap-8 text-white/80 font-medium text-sm">
                            <button 
                                onClick={triggerCamera}
                                className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <Upload size={20} />
                                <span>Upload</span>
                            </button>
                             <button 
                                onClick={triggerCamera}
                                className="flex flex-col items-center gap-2 text-yellow-400"
                            >
                                <Camera size={20} />
                                <span>Scan</span>
                            </button>
                        </div>
                    )}
                    
                    {isScanning && (
                         <div className="text-center space-y-2">
                             <p className="text-white font-bold text-lg animate-pulse">Analyzing...</p>
                             <p className="text-white/60 text-xs">Identifying breed & health status</p>
                         </div>
                    )}
                </>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
