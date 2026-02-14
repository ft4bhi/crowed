import { getListingById } from "@/app/actions/listings";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Share2, Heart, ShieldCheck, Phone, MessageCircle, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const listing = await getListingById(parseInt(id));

    if (!listing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center glass p-8 rounded-2xl">
                    <h1 className="text-2xl font-bold text-gray-900">Listing Not Found</h1>
                    <Link href="/" className="text-blue-600 mt-4 block underline font-medium">Back to Home</Link>
                </div>
            </div>
        );
    }

    const images = listing.images || [];
    if (listing.video) images.unshift(listing.video);

    return (
        <div className="min-h-screen pb-24 md:pl-64">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 glass-nav p-4 flex justify-between items-center">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/40 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </Link>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Share2 className="w-6 h-6 text-gray-800" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Heart className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </div>

            <main className="max-w-4xl mx-auto md:p-6 md:pt-8 glass-card md:mt-4 overflow-hidden">
                {/* Media Section */}
                <div className="relative aspect-video bg-black/5 md:rounded-xl overflow-hidden mt-14 md:mt-0">
                    {listing.video ? (
                        <video
                            src={listing.video}
                            controls
                            className="w-full h-full object-contain bg-black/20 backdrop-blur-sm"
                            poster={images[0] !== listing.video ? images[0] : undefined}
                        />
                    ) : (
                        <Image
                            src={images[0] || "/placeholder-cow.jpg"}
                            alt="Listing"
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Info Content */}
                <div className="p-5 space-y-6">

                    {/* Title & Price */}
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm">{listing.breed || listing.type}</h1>
                            <span className="text-2xl font-bold text-green-700 drop-shadow-sm">₹{parseFloat(listing.price).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-700 mt-1 font-medium">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span>{listing.district}, {listing.state}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide">
                            <span className="glass px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap text-gray-800">{listing.gender}</span>
                            <span className="bg-blue-100/50 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-blue-200/50">{listing.age} {listing.ageUnit}</span>
                            {listing.pregnancyStatus === "Yes" && <span className="bg-green-100/50 backdrop-blur-sm text-green-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-green-200/50">Pregnant</span>}
                        </div>
                    </div>

                    <hr className="border-gray-200/50" />

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Milk Capacity", value: `${listing.milkProduction || "N/A"} L/day` },
                            { label: "Lactation Cycle", value: listing.lactationStage || "N/A" },
                            { label: "Age", value: `${listing.age} ${listing.ageUnit}` },
                            { label: "Pregnancy", value: listing.pregnancyStatus || "No" },
                        ].map((stat, i) => (
                            <div key={i} className="glass p-4 rounded-xl text-center">
                                <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide font-semibold">{stat.label}</p>
                                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <hr className="border-gray-200/50" />

                    {/* Additional Details */}
                    {listing.calfDetails && (
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Calf Details</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">{listing.calfDetails}</p>
                        </div>
                    )}
                    {listing.vaccinationInfo && (
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Vaccination & Health</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">{listing.vaccinationInfo}</p>
                        </div>
                    )}

                    <hr className="border-gray-200/50" />

                    {/* Seller Info */}
                    <div className="flex items-center gap-4 glass p-4 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-lg font-bold text-blue-700 shadow-sm border border-white">
                            {(listing.seller?.userRole || "U")[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">Seller {listing.seller?.farmingExperience ? `(${listing.seller.farmingExperience} yrs exp)` : ""}</h3>
                            <div className="flex items-center gap-1 text-xs text-green-700 font-bold">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Verified User</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1 pb-4">
                        <Calendar className="w-3 h-3" />
                        Posted on {new Date(listing.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </main>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 md:pl-64 p-4 glass-nav flex gap-3 z-50">
                <a
                    href={`tel:${listing.seller?.phone}`}
                    className="flex-1 flex flex-col items-center justify-center glass-button py-3 rounded-xl font-bold hover:bg-white/60 transition-colors text-gray-900"
                >
                    <Phone className="w-5 h-5 mb-0.5" />
                    <span className="text-xs">Call</span>
                </a>
                <a
                    href={`https://wa.me/${listing.seller?.whatsappNumber}?text=Hi, I'm interested in your ${listing.breed} listing.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-[2] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white py-3 rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-black/20"
                >
                    <MessageCircle className="w-5 h-5 mb-0.5" />
                    <span className="text-xs">Chat on WhatsApp</span>
                </a>
            </div>
        </div>
    );
}
