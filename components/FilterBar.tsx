"use client";

import { SlidersHorizontal } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface FilterBarProps {
    onOpenFilters: () => void;
    activeFilter: string;
    onFilterSelect: (filter: string) => void;
}

const filters = ["All", "Cows", "Buffalos", "Bulls", "High Yield", "Jersey", "Pregnant"];

export default function FilterBar({ onOpenFilters, activeFilter, onFilterSelect }: FilterBarProps) {
    const { t, tDynamic, language } = useLanguage();

    return (
        <div className="sticky top-14 md:top-0 z-30 py-3">
            <div className="flex items-center gap-3 px-4 overflow-x-auto no-scrollbar">
                <button
                    onClick={onOpenFilters}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50/80 backdrop-blur-xl border border-emerald-100/50 rounded-full transition-all flex-shrink-0 text-emerald-900 hover:bg-emerald-100 hover:shadow-sm active:scale-95"
                >
                    <SlidersHorizontal size={18} className="text-emerald-700" />
                    <span className="text-sm font-bold text-emerald-800">{t('filters')}</span>
                </button>

                <div className="h-6 w-px bg-emerald-200/50 mx-1 flex-shrink-0" />

                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => onFilterSelect(filter)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 border shadow-sm ${activeFilter === filter
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 active:scale-95"
                            : "bg-white/40 backdrop-blur-md border-white/60 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-200"
                            }`}
                    >
                        {filter === "All" ? (language === 'ml' ? 'എല്ലാം' : 'All') : tDynamic(filter)}
                    </button>
                ))}
            </div>
        </div>
    );
}
