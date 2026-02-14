"use client";

import { Search, MapPin, Store, Stethoscope, Briefcase, ChevronRight, Filter, Star, Phone, MessageCircle, Heart, Share2, Truck, ShieldCheck, Thermometer, Syringe, FileText, Pill } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Enhanced Mock Data
const vendors = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    type: "Veterinary Doctor",
    subtype: "Surgeon",
    service: "General Checkup, AI, Vaccination",
    location: "Kochi, Kerala",
    distance: "2 km",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800",
    verified: true,
    badges: ["Top Rated", "24/7 Available"],
    description: "Senior Veterinarian with 15+ years of experience in dairy cattle management and surgery.",
    available: true,
  },
  {
    id: 2,
    name: "Kerala Feeds Store",
    type: "Feed Supplier",
    subtype: "Wholesale",
    service: "Cattle Feed, Mineral Mixtures, Supplements",
    location: "Thrissur, Kerala",
    distance: "5 km",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1595856942973-10bc8518f841?q=80&w=800",
    verified: true,
    badges: ["Best Price", "Bulk Delivery"],
    description: "Authorized dealer of KSE and Godrej cattle feeds. Bulk orders available with doorstep delivery.",
    available: true,
  },
  {
    id: 3,
    name: "Green Fields Equipment",
    type: "Equipment",
    subtype: "Machinery",
    service: "Milking Machines, Chaff Cutters, Mats",
    location: "Palakkad, Kerala",
    distance: "12 km",
    rating: 4.2,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800",
    verified: false,
    badges: ["Warranty Available"],
    description: "Complete dairy farm automation solutions. Installation and service support provided.",
    available: false,
  },
  {
    id: 4,
    name: "Suresh Livestock Agent",
    type: "Agent",
    subtype: "Transport & Dealership",
    service: "Transport, Buying Assistance",
    location: "Kottayam, Kerala",
    distance: "8 km",
    rating: 4.7,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800",
    verified: true,
    badges: ["Trusted Partner", "Verified Transport"],
    description: "Government approved livestock transporter. Hassle-free documentation and safe delivery.",
    available: true,
  },
  {
    id: 5,
    name: "City Pet & Vet Care",
    type: "Veterinary Doctor",
    subtype: "Clinic",
    service: "Lab Tests, Surgery, Pet Care",
    location: "Ernakulam, Kerala",
    distance: "3.5 km",
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1599443015574-be5dd8c743ac?q=80&w=800",
    verified: true,
    badges: ["Lab Facility"],
    description: "Modern veterinary clinic with advanced diagnostic lab and surgical facilities.",
    available: true,
  },
];

const categories = [
  { name: "All", icon: Store, color: "bg-gray-100 text-gray-700" },
  { name: "Doctors", icon: Stethoscope, color: "bg-blue-100 text-blue-600" },
  { name: "Feed", icon: Store, color: "bg-green-100 text-green-600" },
  { name: "Machines", icon: Briefcase, color: "bg-orange-100 text-orange-600" },
  { name: "Agents", icon: Search, color: "bg-purple-100 text-purple-600" },
  { name: "Medicine", icon: Pill, color: "bg-red-100 text-red-600" },
  { name: "Lab", icon: Thermometer, color: "bg-cyan-100 text-cyan-600" },
  { name: "AI Tech", icon: Syringe, color: "bg-indigo-100 text-indigo-600" },
];

export default function VendorMarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = activeCategory === "All" || 
                           (activeCategory === "Doctors" && vendor.type === "Veterinary Doctor") ||
                           (activeCategory === "Feed" && vendor.type === "Feed Supplier") ||
                           (activeCategory === "Machines" && vendor.type === "Equipment") ||
                           (activeCategory === "Agents" && vendor.type === "Agent");
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      {/* Header Section */}
      <div className="bg-white sticky top-0 z-20 border-b border-gray-100">
          <div className="p-4 md:p-8 max-w-7xl mx-auto pb-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services & Products</h1>
                    <p className="text-sm text-gray-500">Find trusted experts and suppliers.</p>
                </div>
                <div className="flex gap-2">
                     <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                        <MapPin size={20} />
                     </button>
                     <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 relative">
                        <Filter size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                     </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                 <input 
                    type="text" 
                    placeholder="Search for doctors, feed, machines..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Scrollable Categories */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {categories.map((cat) => (
                    <button 
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                            activeCategory === cat.name 
                            ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        <cat.icon size={16} />
                        <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                ))}
            </div>
          </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Featured / Sponsored (Horizontal Scroll) */}
        {activeCategory === "All" && (
            <section>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h2 className="text-lg font-bold text-gray-900">Sponsored Partners</h2>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Ad</span>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                    {vendors.slice(0, 3).map((vendor) => (
                        <div key={vendor.id} className="min-w-[280px] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-3 opacity-10">
                                <Store size={100} />
                             </div>
                             <div className="flex items-start gap-3 mb-3 relative z-10">
                                <Image
                                    src={vendor.image}
                                    alt={vendor.name}
                                    width={50}
                                    height={50}
                                    className="rounded-xl border-2 border-white/20"
                                />
                                <div>
                                    <h3 className="font-bold text-white line-clamp-1">{vendor.name}</h3>
                                    <p className="text-xs text-blue-100">{vendor.type}</p>
                                </div>
                             </div>
                             <p className="text-xs text-blue-50 mb-4 line-clamp-2 relative z-10 opacity-90">{vendor.description}</p>
                             <button className="w-full py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors">
                                View Profile
                             </button>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Categories Grid (Mobile Only Visual) */}
        {activeCategory === "All" && (
             <section className="md:hidden grid grid-cols-2 gap-3">
                 <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center text-center gap-2 col-span-2">
                     <div className="p-2 bg-white rounded-full shadow-sm text-emerald-600"><Truck size={24} /></div>
                     <span className="font-bold text-emerald-800 text-sm">Transport</span>
                 </div>
             </section>
        )}


        {/* Vendor List */}
        <section>
            <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-lg font-bold text-gray-900">
                    {activeCategory === "All" ? "Near You" : `${activeCategory} Near You`}
                </h2>
                <button className="text-sm text-blue-600 font-medium">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVendors.map((vendor) => (
                    <motion.div 
                        key={vendor.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
                    >
                        {/* Card Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative">
                                <div className="w-16 h-16 relative">
                                    <Image 
                                        src={vendor.image} 
                                        alt={vendor.name} 
                                        fill 
                                        className="object-cover rounded-xl bg-gray-100"
                                    />
                                </div>
                                {vendor.verified && (
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 border-2 border-white">
                                        <CheckIcon size={10} className="text-white" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900 truncate pr-2">{vendor.name}</h3>
                                    {vendor.available ? (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                                            Open
                                        </span>
                                    ): (
                                         <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800">
                                            Closed
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-blue-600 font-medium mb-1">{vendor.type} • {vendor.subtype}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                     <Star size={12} className="text-amber-400 fill-amber-400" />
                                     <span className="font-bold text-gray-900">{vendor.rating}</span>
                                     <span>({vendor.reviews})</span>
                                     <span className="text-gray-300 mx-1">•</span>
                                     <span>{vendor.distance}</span>
                                </div>
                            </div>
                        </div>

                         {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {vendor.badges.map((badge) => (
                                <span key={badge} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-medium text-gray-600">
                                    {badge}
                                </span>
                            ))}
                        </div>
                        
                        {/* Description */}
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {vendor.description}
                        </p>
                        
                        <div className="h-px bg-gray-50 mb-4" />

                        {/* Actions */}
                        <div className="flex gap-2">
                             <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                                 <Phone size={14} />
                                 Call
                             </button>
                             <button className="flex-1 py-2.5 bg-green-50 text-green-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-100 transition-colors">
                                 <MessageCircle size={14} />
                                 Chat
                             </button>
                             <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-600 hover:bg-gray-100 transition-colors">
                                 <Share2 size={16} />
                             </button>
                        </div>

                    </motion.div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}

function CheckIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    );
}

