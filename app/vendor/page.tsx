"use client";

import { Search, MapPin, Store, Stethoscope, Briefcase, Filter, Star, Phone, MessageCircle, Share2, Truck, ShieldCheck, Pill, Wheat, Droplet, Package, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Product/Service Data — each entry is a product with vendor info
const products = [
    {
        id: 1,
        productName: "Complete Cattle Health Checkup",
        category: "Veterinary Doctor",
        price: "₹500",
        unit: "per visit",
        duration: "45 min",
        image: "https://image.petmd.com/files/styles/978x550/public/2025-12/pet%20wellness%20exams.jpg?w=2048&q=75",
        vendor: { name: "Dr. Ramesh Kumar", verified: true, rating: 4.9, reviews: 124 },
        location: "Kochi, Kerala",
        distance: "2 km",
        badges: ["Top Rated", "24/7"],
        description: "Full body examination, deworming consultation, and health report for dairy cattle.",
        inStock: true,
    },
    {
        id: 2,
        productName: "Artificial Insemination ",
        category: "Veterinary Doctor",
        price: "₹1,200",
        unit: "per session",
        duration: "30 min",
        image: "https://thumbs.dreamstime.com/b/farmer-prepares-artificial-insemination-cows-professional-330582381.jpg",
        vendor: { name: "City Veterinary Clinic", verified: true, rating: 4.6, reviews: 56 },
        location: "Ernakulam, Kerala",
        distance: "3.5 km",
        badges: ["Lab Facility", "High Success Rate"],
        description: "Professional AI service with quality semen from top breeds. Includes pregnancy confirmation.",
        inStock: true,
    },
    {
        id: 3,
        productName: "Premium Cattle Feed — 50kg",
        category: "Feed Supplier",
        price: "₹850",
        unit: "per bag",
        image: "https://cpimg.tistatic.com/09536813/b/4/10000-Premium-Cattle-Feed.jpg",
        vendor: { name: "Kerala Feeds & Nutrition", verified: true, rating: 4.5, reviews: 89 },
        location: "Thrissur, Kerala",
        distance: "5 km",
        badges: ["Best Seller", "Bulk Delivery"],
        description: "High-protein compound cattle feed with essential vitamins and minerals for dairy cows.",
        inStock: true,
    },
    {
        id: 4,
        productName: "Mineral Mixture Powder — 5kg",
        category: "Feed Supplier",
        price: "₹320",
        unit: "per pack",
        image: "https://m.media-amazon.com/images/I/61tDezkWIbL.jpg",
        vendor: { name: "Kerala Feeds & Nutrition", verified: true, rating: 4.5, reviews: 89 },
        location: "Thrissur, Kerala",
        distance: "5 km",
        badges: ["Essential", "Vet Recommended"],
        description: "Balanced mineral supplement with calcium, phosphorus, and trace elements for better milk yield.",
        inStock: true,
    },
    {
        id: 5,
        productName: "Automatic Milking Machine",
        category: "Equipment",
        price: "₹28,500",
        unit: "single unit",
        image: "https://m.media-amazon.com/images/I/71QUyiZBuGL.jpg",
        vendor: { name: "Green Fields Equipment", verified: false, rating: 4.2, reviews: 45 },
        location: "Palakkad, Kerala",
        distance: "12 km",
        badges: ["Warranty", "Installation Included"],
        description: "Portable single-bucket milking machine. Hygienic, fast, and reduces labor. 1-year warranty.",
        inStock: false,
    },
    {
        id: 6,
        productName: "Chaff Cutter Machine",
        category: "Equipment",
        price: "₹12,000",
        unit: "single unit",
        image: "https://4.imimg.com/data4/US/XA/MY-10967036/power-operated-chaff-cutter-500x500.jpg",
        vendor: { name: "Green Fields Equipment", verified: false, rating: 4.2, reviews: 45 },
        location: "Palakkad, Kerala",
        distance: "12 km",
        badges: ["Heavy Duty", "Low Maintenance"],
        description: "Electric-powered chaff cutter for fodder. Cuts hay, grass, and corn stalk efficiently.",
        inStock: true,
    },
    {
        id: 7,
        productName: "Livestock Transport — Local",
        category: "Transport",
        price: "₹2,500",
        unit: "per trip (up to 50 km)",
        image: "https://thumbs.dreamstime.com/b/cow-runs-meadow-livestock-transport-running-out-trailer-winter-stable-31120125.jpg",
        vendor: { name: "Suresh Livestock Transport", verified: true, rating: 4.7, reviews: 210 },
        location: "Kottayam, Kerala",
        distance: "8 km",
        badges: ["Govt Approved", "Insured"],
        description: "Safe and documented livestock transport. Includes veterinary transit certificate and insurance coverage.",
        inStock: true,
    },
    {
        id: 8,
        productName: "Interstate Cattle Transport",
        category: "Transport",
        price: "₹8,000",
        unit: "per trip",
        image: "https://media.istockphoto.com/id/918674100/photo/animal-transportation-truck-driving-on-highway-on-rainy-day.jpg?s=612x612&w=0&k=20&c=3wxFNucEolLmvWXE8n__tghe2im2ShHXNqAgDHJFyDY=",
        vendor: { name: "Suresh Livestock Transport", verified: true, rating: 4.7, reviews: 210 },
        location: "Kottayam, Kerala",
        distance: "8 km",
        badges: ["Trusted Partner", "Documentation"],
        description: "Long-distance livestock transport with proper documentation, GPS tracking, and livestock insurance.",
        inStock: true,
    },
    {
        id: 9,
        productName: "Cattle Vaccination Package",
        category: "Veterinary Doctor",
        price: "₹750",
        unit: "per animal",
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800",
        vendor: { name: "Dr. Ramesh Kumar", verified: true, rating: 4.9, reviews: 124 },
        location: "Kochi, Kerala",
        distance: "2 km",
        badges: ["Essential", "All Breeds"],
        description: "FMD, HS, BQ vaccinations included. Complete immunization schedule with health card.",
        inStock: true,
    },
    {
        id: 10,
        productName: "Silage Fodder — 100kg",
        category: "Feed Supplier",
        price: "₹600",
        unit: "per bale",
        image: "https://tabelawala.com/wp-content/uploads/2025/03/Silage-2.jpeg",
        vendor: { name: "Kerala Feeds & Nutrition", verified: true, rating: 4.5, reviews: 89 },
        location: "Thrissur, Kerala",
        distance: "5 km",
        badges: ["Fresh", "High Nutrition"],
        description: "Maize silage — fermented, high-energy fodder for dairy cattle. Improves milk production naturally.",
        inStock: true,
    },
    {
        id: 11,
        productName: "Rubber Cow Mat — 6ft × 4ft",
        category: "Equipment",
        price: "₹1,800",
        unit: "per piece",
        image: "https://5.imimg.com/data5/SELLER/Default/2024/2/390352895/YO/SX/UK/210346906/cow-rubber-mat-7ft-x-4ft-x-17mm-43kg-250x250.jpeg",
        vendor: { name: "Green Fields Equipment", verified: false, rating: 4.2, reviews: 45 },
        location: "Palakkad, Kerala",
        distance: "12 km",
        badges: ["Anti-Slip", "Durable"],
        description: "Heavy-duty anti-slip rubber mat for cow sheds. Prevents hoof injuries and improves comfort.",
        inStock: true,
    },
    {
        id: 12,
        productName: "Emergency Vet Surgery",
        category: "Veterinary Doctor",
        price: "₹3,000+",
        unit: "per procedure",
        duration: "varies",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800",
        vendor: { name: "City Veterinary Clinic", verified: true, rating: 4.6, reviews: 56 },
        location: "Ernakulam, Kerala",
        distance: "3.5 km",
        badges: ["Emergency", "Advanced Equipment"],
        description: "C-section, teat surgery, bloat treatment, and other surgical interventions. 24/7 emergency service.",
        inStock: true,
    },
];

const categories = [
    { name: "All", icon: Store },
    { name: "Doctors", icon: Stethoscope },
    { name: "Feed", icon: Wheat },
    { name: "Equipment", icon: Briefcase },
    { name: "Transport", icon: Truck },
    { name: "Medicine", icon: Pill },
    { name: "Dairy", icon: Droplet },
    { name: "Insurance", icon: ShieldCheck },
];

export default function VendorMarketplacePage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "All" ||
            (activeCategory === "Doctors" && product.category === "Veterinary Doctor") ||
            (activeCategory === "Feed" && product.category === "Feed Supplier") ||
            (activeCategory === "Equipment" && product.category === "Equipment") ||
            (activeCategory === "Transport" && product.category === "Transport") ||
            (activeCategory === "Medicine" && product.category === "Medicine") ||
            (activeCategory === "Dairy" && product.category === "Dairy Products") ||
            (activeCategory === "Insurance" && product.category === "Insurance");
        const query = searchQuery.toLowerCase();
        const matchesSearch = !query ||
            product.productName.toLowerCase().includes(query) ||
            product.vendor.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.location.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-24 md:pb-8">
            {/* Header Section — Glassmorphism Nav */}
            <div className="glass-nav sticky top-14 md:top-0 z-20">
                <div className="p-4 md:p-6 max-w-7xl mx-auto pb-3">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                                Products & Services
                            </h1>
                            <p className="text-sm text-neutral-500 font-medium">
                                Everything your farm needs, from trusted vendors
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="glass-button p-2.5 rounded-full">
                                <MapPin size={20} className="text-emerald-700" />
                            </button>
                            <button className="glass-button p-2.5 rounded-full relative">
                                <Filter size={20} className="text-emerald-700" />
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Search — Glass Input */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search products, services, or vendors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass-input w-full pl-12 pr-4 py-3 md:py-3.5 text-sm md:text-base"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    </div>

                    {/* Scrollable Categories — Filter Pills */}
                    <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-semibold shadow-sm ${activeCategory === cat.name
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 active:scale-95"
                                    : "bg-white/40 backdrop-blur-md border-white/60 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-200"
                                    }`}
                            >
                                <cat.icon size={16} />
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

                {/* Featured Products — Emerald Gradient Cards */}
                {activeCategory === "All" && (
                    <section>
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h2 className="text-lg md:text-xl font-bold text-neutral-900">🔥 Featured Products</h2>
                            <span className="glass-chip text-[10px]">SPONSORED</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                            {products.filter(p => p.inStock).slice(0, 3).map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                                    className="min-w-[280px] md:min-w-[320px] bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl overflow-hidden text-white shadow-lg shadow-emerald-900/20 relative"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-36 w-full">
                                        <Image
                                            src={product.image}
                                            alt={product.productName}
                                            fill
                                            className="object-cover opacity-40"
                                            sizes="320px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/90 to-transparent" />
                                        <div className="absolute bottom-3 left-4 right-4 z-10">
                                            <h3 className="font-bold text-white text-lg leading-tight text-glow line-clamp-2">{product.productName}</h3>
                                            <p className="text-emerald-100 text-sm font-bold mt-1">{product.price} <span className="text-emerald-200/70 font-normal text-xs">/ {product.unit}</span></p>
                                        </div>
                                    </div>

                                    {/* Vendor Info + CTA */}
                                    <div className="p-4 pt-3">
                                        <div className="flex items-center gap-1.5 text-emerald-100/80 text-xs mb-3">
                                            {product.vendor.verified && <ShieldCheck size={12} className="text-emerald-200" />}
                                            <span>Provided by <span className="font-bold text-white">{product.vendor.name}</span></span>
                                        </div>
                                        <button className="w-full py-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl text-sm font-bold hover:bg-white/25 transition-all active:scale-95">
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Product Grid */}
                <section>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-lg md:text-xl font-bold text-neutral-900">
                            {activeCategory === "All" ? "All Products & Services" : `${activeCategory} Near You`}
                        </h2>
                        <span className="text-sm text-neutral-500 font-medium">{filteredProducts.length} results</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="glass-panel text-center py-16 px-6">
                            <Package className="mx-auto text-neutral-300 mb-4" size={64} />
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">No products found</h3>
                            <p className="text-neutral-500 font-medium">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="glass-card overflow-hidden flex flex-col cursor-pointer group"
                                >
                                    {/* Product Image */}
                                    <div className="relative aspect-[4/3] bg-neutral-100/50">
                                        <Image
                                            src={product.image}
                                            alt={product.productName}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="glass px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-emerald-900 shadow-sm border border-emerald-100/30">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Availability */}
                                        <div className="absolute top-3 right-3">
                                            {product.inStock ? (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-sm">
                                                    Available
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800/70 text-white backdrop-blur-sm">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>

                                        {/* Price Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent text-white pt-10 z-10">
                                            <h3 className="font-bold text-xl drop-shadow-md text-glow">{product.price}</h3>
                                            <p className="text-emerald-100/70 text-xs font-medium">{product.unit}</p>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 md:p-5 flex flex-col gap-2 flex-1 bg-white/40 backdrop-blur-sm">
                                        {/* Product Name — Primary */}
                                        <h4 className="font-bold text-neutral-900 text-base md:text-lg leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                                            {product.productName}
                                        </h4>

                                        {/* Vendor Info — Secondary "Sold by" */}
                                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                            {product.vendor.verified && (
                                                <span className="inline-flex items-center gap-0.5 text-emerald-600">
                                                    <ShieldCheck size={12} />
                                                </span>
                                            )}
                                            <span>
                                                {product.category === "Veterinary Doctor" ? "Provided by" : "Sold by"}{" "}
                                                <span className="font-bold text-neutral-700">{product.vendor.name}</span>
                                            </span>
                                        </div>

                                        {/* Rating + Location */}
                                        <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                                            <Star size={12} className="text-amber-400 fill-amber-400" />
                                            <span className="font-bold text-neutral-900">{product.vendor.rating}</span>
                                            <span>({product.vendor.reviews})</span>
                                            <span className="text-neutral-300 mx-1">•</span>
                                            <MapPin size={12} className="text-neutral-400" />
                                            <span>{product.distance}</span>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {product.badges.map((badge) => (
                                                <span key={badge} className="glass-chip">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-medium mt-1">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-3 md:p-4 pt-0 flex gap-2 mt-auto bg-white/40 backdrop-blur-sm rounded-b-3xl">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 backdrop-blur-md text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shadow-emerald-900/20 active:scale-95">
                                            <Phone size={14} />
                                            <span>Call</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 glass-button py-2.5 rounded-xl font-bold text-sm text-emerald-800 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                                            <MessageCircle size={14} className="text-emerald-600" />
                                            <span>Chat</span>
                                        </button>
                                        <button className="glass-button p-2.5 rounded-xl text-neutral-400 hover:text-emerald-600 transition-colors">
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
