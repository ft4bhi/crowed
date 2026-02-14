"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, MapPin, CheckCircle, Video, Image as ImageIcon, Loader2, Info } from "lucide-react";
import { createListing } from "@/app/actions/listings";

export default function SellPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        type: "Cow",
        breed: "",
        gender: "Female",
        age: "",
        ageUnit: "years",
        milkProduction: "",
        lactationStage: "",
        pregnancyStatus: "No",
        price: "",
        isNegotiable: false,
        description: "",
        latitude: "",
        longitude: "",
        district: "",
        state: "",
    });

    const scrollRefs = {
        media: useRef<HTMLDivElement>(null),
        details: useRef<HTMLDivElement>(null),
        location: useRef<HTMLDivElement>(null),
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const detectLocation = () => {
        setLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData(prev => ({
                        ...prev,
                        latitude: latitude.toString(),
                        longitude: longitude.toString()
                    }));

                    setTimeout(() => {
                        setFormData(prev => ({
                            ...prev,
                            district: "Auto-detected District",
                            state: "Auto-detected State"
                        }));
                        setLocationLoading(false);
                    }, 1000);
                },
                (error) => {
                    console.error("Error detecting location:", error);
                    alert("Could not detect location. Please enter manually.");
                    setLocationLoading(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLocationLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submitData.append(key, value.toString());
        });

        files.forEach((file) => submitData.append("images", file));
        if (videoFile) submitData.append("video", videoFile);

        try {
            const result = await createListing(submitData);
            if (result.success) {
                router.push("/");
            } else {
                alert(result.error || "Failed to create listing");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-24 md:pl-64">
            <div className="max-w-3xl mx-auto p-4 md:p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 drop-shadow-sm">Sell Your Cattle</h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Media Section */}
                    <div ref={scrollRefs.media} className="glass-card p-6 space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <Video className="w-5 h-5 text-emerald-600" /> Media Upload
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Video Upload */}
                            <div className="border border-dashed border-gray-400/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 transition-colors relative glass">
                                <input type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Video className={`w-10 h-10 mb-2 ${videoFile ? 'text-green-600' : 'text-gray-400'}`} />
                                <span className="font-bold text-gray-700 text-sm">{videoFile ? "Video Selected" : "Upload Video (Required)"}</span>
                                <span className="text-xs text-gray-500 mt-1">Show walking & milking</span>
                            </div>

                            {/* Images Upload */}
                            <div className="border border-dashed border-gray-400/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 transition-colors relative glass">
                                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <ImageIcon className={`w-10 h-10 mb-2 ${files.length > 0 ? 'text-green-600' : 'text-gray-400'}`} />
                                <span className="font-bold text-gray-700 text-sm">{files.length > 0 ? `${files.length} Photos Selected` : "Upload Photos"}</span>
                                <span className="text-xs text-gray-500 mt-1">Udder, diverse angles</span>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div ref={scrollRefs.details} className="glass-card p-6 space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <Info className="w-5 h-5 text-emerald-600" /> Animal Details
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 glass-input">
                                    <option value="Cow">Cow</option>
                                    <option value="Buffalo">Buffalo</option>
                                    <option value="Bull">Bull</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Breed</label>
                                <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Jersey" className="w-full p-3 glass-input" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 glass-input" />
                                </div>
                                <div className="w-24">
                                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Unit</label>
                                    <select name="ageUnit" value={formData.ageUnit} onChange={handleChange} className="w-full p-3 glass-input">
                                        <option value="years">Yrs</option>
                                        <option value="months">Mths</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 glass-input">
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Production & Health */}
                    <div className="glass-card p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">Production & Health</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Milk (L/day)</label>
                                <input type="number" name="milkProduction" value={formData.milkProduction} onChange={handleChange} className="w-full p-3 glass-input" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Lactation No.</label>
                                <select name="lactationStage" value={formData.lactationStage} onChange={handleChange} className="w-full p-3 glass-input">
                                    <option value="">Select</option>
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Pregnant?</label>
                                <select name="pregnancyStatus" value={formData.pregnancyStatus} onChange={handleChange} className="w-full p-3 glass-input">
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="glass-card p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">Price</h2>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Expected Price (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="50000" className="w-full p-3 glass-input text-lg font-bold" />
                        </div>
                    </div>

                    {/* Location */}
                    <div ref={scrollRefs.location} className="glass-card p-6 space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <MapPin className="w-5 h-5 text-red-500" /> Location
                        </h2>

                        <button
                            type="button"
                            onClick={detectLocation}
                            disabled={locationLoading}
                            className="w-full py-3 bg-emerald-100/50 backdrop-blur-md text-emerald-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-200/50 transition-colors border border-emerald-200/50"
                        >
                            {locationLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                            {locationLoading ? "Detecting..." : "Auto-detect GPS Location"}
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className="w-full p-3 glass-input" />
                            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full p-3 glass-input" />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 pb-12">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-green-600/90 backdrop-blur-md text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                            {loading ? "Publishing..." : "Publish Listing"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
