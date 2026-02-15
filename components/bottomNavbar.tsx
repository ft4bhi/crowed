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
            <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 shadow-lg-up" />

            <div className="relative flex justify-around items-center h-16 px-2 max-w-md mx-auto">
                {bottomTabs.map(({ name, icon: Icon, href, label }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={name}
                            href={href}
                            className="flex-1 flex flex-col items-center justify-center py-2 group relative"
                        >
                            <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 group-hover:text-emerald-600/70'}`}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute inset-0 bg-emerald-100/50 rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span className={`text-[10px] font-medium mt-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
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
