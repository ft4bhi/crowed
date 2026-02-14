"use client";

import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
    onOpenFilters: () => void;
    activeFilter: string;
    onFilterSelect: (filter: string) => void;
}

const filters = ["All", "Cows", "Buffalos", "Bulls", "Male Buffalo", "High Yield", "Jersey", "Pregnant"];

export default function FilterBar({ onOpenFilters, activeFilter, onFilterSelect }: FilterBarProps) {
    return (
        <div className="sticky top-14 md:top-0 z-30 glass-nav shadow-sm">
            <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto no-scrollbar">
                <button
                    onClick={onOpenFilters}
                    className="flex items-center gap-2 px-4 py-2 glass-button rounded-lg transition-colors flex-shrink-0"
                >
                    <SlidersHorizontal size={16} className="text-gray-700" />
                    <span className="text-sm font-semibold text-gray-700">Filters</span>
                </button>

                <div className="h-6 w-px bg-gray-400/30 mx-1 flex-shrink-0" />

                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => onFilterSelect(filter)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 border ${activeFilter === filter
                            ? "bg-black/80 backdrop-blur-md text-white shadow-lg border-black/0 ring-1 ring-white/20"
                            : "glass text-gray-700 hover:bg-white/50 border-white/40"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}
