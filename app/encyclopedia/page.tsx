"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Wheat, Stethoscope, Landmark, RotateCcw } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy-load chart components to avoid SSR issues with Chart.js
const ProductionTab = dynamic(
  () => import("@/components/encyclopedia/ProductionTab"),
  { ssr: false, loading: () => <TabSkeleton /> }
);
const NutritionTab = dynamic(
  () => import("@/components/encyclopedia/NutritionTab"),
  { ssr: false, loading: () => <TabSkeleton /> }
);
const HealthTab = dynamic(
  () => import("@/components/encyclopedia/HealthTab"),
  { ssr: false, loading: () => <TabSkeleton /> }
);
const SchemesTab = dynamic(
  () => import("@/components/encyclopedia/SchemesTab"),
  { ssr: false, loading: () => <TabSkeleton /> }
);

function TabSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-6 bg-neutral-200/60 rounded-lg w-2/3 mb-4" />
      <div className="h-4 bg-neutral-200/40 rounded w-full mb-2" />
      <div className="h-4 bg-neutral-200/40 rounded w-5/6 mb-6" />
      <div className="h-[200px] bg-neutral-100/50 rounded-2xl" />
    </div>
  );
}

const tabs = [
  {
    id: "production",
    label: "Production",
    fullLabel: "Production & Profit",
    icon: TrendingUp,
  },
  {
    id: "nutrition",
    label: "Nutrition",
    fullLabel: "Feed & Nutrition",
    icon: Wheat,
  },
  {
    id: "health",
    label: "Health",
    fullLabel: "Health & Disease",
    icon: Stethoscope,
  },
  {
    id: "schemes",
    label: "Schemes",
    fullLabel: "Schemes & Aid",
    icon: Landmark,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function EncyclopediaPage() {
  const [activeTab, setActiveTab] = useState<TabId>("production");

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto p-4 md:p-8 pb-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                Moofinder{" "}
                <span className="text-emerald-600 font-light">Dashboard</span>
              </h1>
              <p className="text-xs md:text-sm text-neutral-400 font-medium mt-0.5">
                The Modern Dairy Farmer&apos;s Assistant
              </p>
            </div>
            <button
              onClick={() => setActiveTab("production")}
              className="flex items-center gap-1.5 text-xs text-neutral-500 bg-white/60 hover:bg-white/80 border border-neutral-200/60 px-3 py-2 rounded-xl transition-all active:scale-95"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation — sticky, scrollable on mobile */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm md:top-0">
        <div className="max-w-5xl mx-auto px-3 md:px-8 py-2.5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar md:justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200/50"
                    : "bg-white/60 text-neutral-500 border border-neutral-200/60 hover:bg-white/80 hover:text-neutral-700"
                    }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="hidden sm:inline">{tab.fullLabel}</span>
                  <span className="sm:hidden">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto p-4 md:p-8 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "production" && <ProductionTab />}
            {activeTab === "nutrition" && <NutritionTab />}
            {activeTab === "health" && <HealthTab />}
            {activeTab === "schemes" && <SchemesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
