"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft, Edit, Trash2, Eye, MessageCircle, Package,
    AlertTriangle, Loader2, CheckCircle, ShoppingBag
} from "lucide-react";
import { getUserListings, deleteListing, markAsSold } from "@/app/actions/listings";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

type Tab = "active" | "sold";

export default function MyListingsPage() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [markingSold, setMarkingSold] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("active");
    const router = useRouter();
    const { user } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        if (user) {
            getUserListings().then((data) => {
                setListings(data);
                setLoading(false);
            });
        }
    }, [user]);

    const activeListings = listings.filter((l) => l.status === "active");
    const soldListings = listings.filter((l) => l.status === "sold");
    const filtered = activeTab === "active" ? activeListings : soldListings;

    const handleDelete = async (id: number) => {
        setDeleting(true);
        const result = await deleteListing(id);
        if (result.success) {
            setListings((prev) => prev.filter((l) => l.id !== id));
        }
        setDeleting(false);
        setDeleteId(null);
    };

    const handleMarkSold = async (id: number) => {
        setMarkingSold(id);
        const result = await markAsSold(id);
        if (result.success) {
            setListings((prev) =>
                prev.map((l) => (l.id === id ? { ...l, status: "sold" } : l))
            );
        }
        setMarkingSold(null);
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: "bg-emerald-100 text-emerald-700",
            sold: "bg-amber-100 text-amber-700",
            draft: "bg-gray-100 text-gray-600",
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${styles[status] || styles.draft}`}>
                {status}
            </span>
        );
    };

    const getFirstImage = (listing: any) => {
        if (!listing.images) return "/placeholder-cow.jpg";
        const imgs = Array.isArray(listing.images) ? listing.images : JSON.parse(listing.images as string);
        return imgs[0] || "/placeholder-cow.jpg";
    };

    return (
        <div className="min-h-screen pb-24 md:pl-64">
            {/* Header */}
            <div className="glass-nav p-4 flex items-center gap-4 sticky top-0 z-40">
                <button onClick={() => router.back()} className="p-2 hover:bg-white/40 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex items-center gap-2">
                    <Package size={20} className="text-emerald-600" />
                    <h1 className="text-lg font-bold text-gray-900">My Listings</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 mt-2">
                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "active"
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                : "glass-card text-gray-600 hover:bg-white/80"
                            }`}
                    >
                        <Package size={16} />
                        Active ({activeListings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("sold")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "sold"
                                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                                : "glass-card text-gray-600 hover:bg-white/80"
                            }`}
                    >
                        <ShoppingBag size={16} />
                        Sold ({soldListings.length})
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p className="text-sm font-medium">Loading your listings...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            {activeTab === "active" ? (
                                <Package size={32} className="text-gray-300" />
                            ) : (
                                <ShoppingBag size={32} className="text-gray-300" />
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-700 mb-1">
                            {activeTab === "active" ? "No active listings" : "No sold listings yet"}
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">
                            {activeTab === "active"
                                ? "Start by selling your first animal"
                                : "Mark your active listings as sold once they're purchased"}
                        </p>
                        {activeTab === "active" && (
                            <button
                                onClick={() => router.push("/sell")}
                                className="px-6 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                            >
                                + Create Listing
                            </button>
                        )}
                    </div>
                )}

                {/* Listing Cards */}
                {!loading && filtered.length > 0 && (
                    <div className="space-y-3">
                        {filtered.map((listing) => (
                            <div
                                key={listing.id}
                                className="glass-card p-4 flex gap-4 group hover:shadow-lg transition-all"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-24 bg-gray-200/50 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={getFirstImage(listing)}
                                        alt={listing.breed || listing.type}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-1.5 left-1.5">
                                        {getStatusBadge(listing.status)}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm truncate">
                                                {listing.breed || listing.type}
                                            </h3>
                                            <p className="text-emerald-700 font-bold text-sm mt-0.5">
                                                ₹{Number(listing.price).toLocaleString("en-IN")}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-1.5">
                                            {listing.status === "active" && (
                                                <button
                                                    onClick={() => handleMarkSold(listing.id)}
                                                    disabled={markingSold === listing.id}
                                                    className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Mark as Sold"
                                                >
                                                    {markingSold === listing.id ? (
                                                        <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="w-4 h-4 text-amber-600" />
                                                    )}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => router.push(`/sell?edit=${listing.id}`)}
                                                className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4 text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(listing.id)}
                                                className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex gap-4 mt-2.5 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" /> {listing.viewCount ?? 0} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3" /> {listing.whatsappCount ?? 0} chats
                                        </span>
                                        {listing.district && (
                                            <span className="truncate">{listing.district}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId !== null && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Delete Listing?</h3>
                                <p className="text-xs text-gray-500">This action cannot be undone</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setDeleteId(null)}
                                disabled={deleting}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                disabled={deleting}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {deleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
