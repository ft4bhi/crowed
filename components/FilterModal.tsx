"use client";

import { X, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [filters, setFilters] = useState({
    type: [] as string[],
    lactation: [] as string[],
    breed: [] as string[],
    milkRange: [0, 50],
    pregnancy: "All",
    withCalf: "All",
    rateRange: [10000, 200000],
    origin: "All",
    locationRadius: 50,
    sortBy: "Latest",
  });

  const toggleSelection = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = prev[category] as string[];
      const includes = current.includes(value);
      if (includes) {
        return { ...prev, [category]: current.filter((i) => i !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-t-3xl z-50 h-[85vh] flex flex-col md:max-w-md md:left-1/2 md:-translate-x-1/2 md:h-[600px] md:rounded-2xl md:bottom-auto md:top-1/2 md:-translate-y-1/2 border border-white/50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-24">

              {/* Sort By */}
              <section>
                <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                  {["Latest", "Price: Low to High", "Price: High to Low", "Milk: High to Low"].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setFilters({ ...filters, sortBy: sort })}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${filters.sortBy === sort
                        ? "bg-black text-white border-black shadow-lg"
                        : "glass text-gray-600 hover:bg-white/40 border-white/40"
                        }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </section>

              {/* Type */}
              <section>
                <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Type</h3>
                <div className="space-y-2">
                  {["Cow", "Buffalo", "Bull", "Male Buffalo", "Other"].map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-xl glass border border-white/40 cursor-pointer active:scale-[0.99] transition-transform hover:bg-white/40">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.type.includes(type) ? "bg-black border-black" : "border-gray-400 bg-white/50"}`}>
                        {filters.type.includes(type) && <Check size={12} className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={filters.type.includes(type)}
                        onChange={() => toggleSelection("type", type)}
                      />
                      <span className="text-gray-800 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Breed */}
              <section>
                <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Breed</h3>
                <div className="flex flex-wrap gap-2">
                  {["Jersey", "Holstein Friesian", "Murrah", "Sahiwal", "Gir", "Red Sindhi", "Vechur"].map((breed) => (
                    <button
                      key={breed}
                      onClick={() => toggleSelection("breed", breed)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${filters.breed.includes(breed)
                        ? "bg-blue-600/90 text-white border-blue-600 shadow-md backdrop-blur-sm"
                        : "glass text-gray-600 hover:bg-white/40 border-white/40"
                        }`}
                    >
                      {breed}
                    </button>
                  ))}
                </div>
              </section>

              {/* Milk Range Slider (Mock) */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Milk Capacity</h3>
                  <span className="text-blue-600 font-bold text-sm bg-blue-50 px-2 py-1 rounded-md">{filters.milkRange[0]} - {filters.milkRange[1]} L</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </section>

              {/* Location Radius */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Distance</h3>
                  <span className="text-blue-600 font-bold text-sm bg-blue-50 px-2 py-1 rounded-md">{filters.locationRadius} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  value={filters.locationRadius}
                  onChange={(e) => setFilters({ ...filters, locationRadius: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                  <span>5km</span>
                  <span>500km</span>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-md absolute bottom-0 left-0 right-0 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => setFilters({
                    type: [], lactation: [], breed: [], milkRange: [0, 50], pregnancy: "All", withCalf: "All", rateRange: [10000, 200000], origin: "All", locationRadius: 50, sortBy: "Latest"
                  })}
                  className="px-6 py-3.5 rounded-xl text-gray-600 font-bold border border-gray-300/50 hover:bg-white/50 transition-colors glass"
                >
                  Reset
                </button>
                <button
                  onClick={() => { onApply(filters); onClose(); }}
                  className="flex-1 px-6 py-3.5 rounded-xl bg-black/90 backdrop-blur-md text-white font-bold hover:bg-black shadow-xl shadow-black/10 transition-all"
                >
                  Show Results
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
