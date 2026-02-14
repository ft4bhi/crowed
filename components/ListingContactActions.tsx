"use client";

import { Phone, MessageCircle } from "lucide-react";

interface ListingContactActionsProps {
    phone?: string | null;
    whatsappNumber?: string | null;
    listingTitle: string;
}

export default function ListingContactActions({ phone, whatsappNumber, listingTitle }: ListingContactActionsProps) {

    const handleWhatsApp = () => {
        if (!whatsappNumber) return;
        const text = `Hi, I'm interested in the ${listingTitle} listing on OlexCows.`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleCall = () => {
        if (!phone) return;
        window.open(`tel:${phone}`, '_self');
    };

    return (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md flex gap-3 z-[60]">
            <button
                onClick={handleCall}
                className="flex-1 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md border border-white/60 py-3.5 rounded-full font-bold text-gray-900 shadow-xl shadow-black/10 hover:bg-white active:scale-95 transition-all"
            >
                <Phone className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">Call</span>
            </button>

            <button
                onClick={handleWhatsApp}
                className="flex-[1.5] flex items-center justify-center gap-2 bg-black/90 backdrop-blur-md text-white py-3.5 rounded-full font-bold shadow-xl shadow-green-900/20 active:scale-95 transition-all border border-white/10 hover:bg-black"
            >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span className="text-sm">WhatsApp</span>
            </button>
        </div>
    );
}
