"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomTabs } from "@/data/nav";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const BottomNavBar = () => {
    const pathname = usePathname();
    const { t } = useLanguage();

    // Map labels to translation keys
    const getLabel = (label: string) => {
        const lower = label.toLowerCase();
        if (lower === 'home') return t('home');
        if (lower === 'sell') return t('sell');
        if (lower === 'chat') return t('chats');
        if (lower === 'profile') return t('profile');
        if (lower === 'scan') return t('scan');
        if (lower === 'product') return t('product');
        if (lower === 'learn') return t('learn');
        return label;
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-t border-white/40 shadow-lg-up" />

            <div className="relative flex justify-around items-center h-16 px-2 max-w-md mx-auto">
                {bottomTabs.map(({ name, icon: Icon, href, label }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={name}
                            href={href}
                            className="flex-1 flex flex-col items-center justify-center py-2 group relative"
                        >
                            <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-600' : 'text-neutral-400 group-hover:text-emerald-700'}`}>
                                <Icon size={24} strokeWidth={isActive ? 3 : 2} className="relative z-10" />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-xl shadow-sm -z-0 border border-emerald-100/50"
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold mt-1 transition-colors ${isActive ? 'text-emerald-700' : 'text-neutral-400 group-hover:text-emerald-600'}`}>
                                {getLabel(label)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavBar;
