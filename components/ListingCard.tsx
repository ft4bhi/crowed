"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Phone, MapPin, PlayCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ListingCardProps {
    listing: {
        id: number;
        type: string;
        breed: string | null;
        price: string;
        location: string;
        image: string; // url
        video?: string | null;
        milk: string | null;
        isPregnant: boolean;
        gender?: string | null;
    };
}

export default function ListingCard({ listing }: ListingCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Auto-play when in viewport logic could go here
    }, []);

    const handleMouseEnter = () => {
        if (listing.video && videoRef.current) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (listing.video && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative h-full flex flex-col rounded-3xl border border-white/60">
            <Link href={`/listing/${listing.id}`} className="flex-1 flex flex-col">
                {/* Media Container - Reduced height on mobile (aspect-video) */}
                <div
                    className="relative aspect-video md:aspect-[4/3] bg-gray-100/50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {listing.video ? (
                        <video
                            ref={videoRef}
                            src={listing.video}
                            muted
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ) : null}

                    <Image
                        src={listing.image || "/placeholder-cow.jpg"}
                        alt={`${listing.breed} ${listing.type}`}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isPlaying && listing.video ? 'opacity-0' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {listing.video && !isPlaying && (
                        <div className="absolute top-3 right-3 glass text-gray-900 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md z-10 transition-transform group-hover:scale-105 shadow-sm">
                            <PlayCircle size={14} fill="currentColor" className="text-gray-800 opacity-80" />
                            <span className="font-bold">Video</span>
                        </div>
                    )}

                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className="glass px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-sm border border-white/40">
                            {listing.type}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pt-10 z-10">
                        <h3 className="font-bold text-xl drop-shadow-md">₹{parseFloat(listing.price).toLocaleString()}</h3>
                    </div>
                </div>

                {/* Details - Compact padding */}
                <div className="p-3 md:p-5 flex flex-col gap-2 flex-1 bg-white/30 backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                        <div className="min-w-0 pr-2">
                            <h4 className="font-bold text-gray-900 text-base md:text-lg truncate leading-tight group-hover:text-blue-700 transition-colors">{listing.breed || listing.type}</h4>
                            <div className="flex items-center text-xs text-gray-600 gap-1 font-medium mt-1">
                                <MapPin size={12} className="text-gray-500" />
                                <span className="truncate">{listing.location}</span>
                            </div>
                        </div>
                        {/* Wishlist Button */}
                        <button className="p-1.5 glass rounded-full text-gray-500 hover:text-red-500 hover:bg-white/80 transition-colors shadow-sm">
                            <Heart size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto">
                        {listing.milk && (
                            <div className="bg-white/50 rounded-xl p-1.5 md:p-2 text-center border border-white/40 shadow-sm">
                                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-bold tracking-wide">Milk</p>
                                <p className="text-xs md:text-sm font-bold text-gray-900">{listing.milk} L</p>
                            </div>
                        )}
                        {listing.isPregnant && (
                            <div className="bg-green-100/60 rounded-xl p-1.5 md:p-2 text-center border border-green-200/50 shadow-sm">
                                <p className="text-[9px] md:text-[10px] text-green-700 uppercase font-bold tracking-wide">Pregnant</p>
                                <p className="text-xs md:text-sm font-bold text-green-800">Yes</p>
                            </div>
                        )}
                        {!listing.isPregnant && listing.gender && (
                            <div className="bg-white/50 rounded-xl p-1.5 md:p-2 text-center border border-white/40 shadow-sm">
                                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-bold tracking-wide">Gender</p>
                                <p className="text-xs md:text-sm font-bold text-gray-900">{listing.gender}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {/* Actions */}
            <div className="p-3 md:p-4 pt-0 flex gap-2 mt-auto bg-white/30 backdrop-blur-sm rounded-b-3xl">
                <button className="flex-1 flex items-center justify-center gap-2 glass-button py-2.5 rounded-xl font-bold text-sm hover:text-green-700 hover:border-green-200 hover:bg-green-50/50 transition-all shadow-sm">
                    <MessageCircle size={16} className="text-green-600" />
                    <span>Chat</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-black/90 backdrop-blur-md text-white py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <Phone size={16} />
                    <span>Call</span>
                </button>
            </div>
        </div>
    );
}
