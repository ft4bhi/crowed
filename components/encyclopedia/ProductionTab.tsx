"use client";

import { useState, useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { breedData } from "@/data/encyclopediaData";
import { Calculator, TrendingUp } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ProductionTab() {
    const [milkYield, setMilkYield] = useState(15);
    const [price, setPrice] = useState(40);
    const [feedCost, setFeedCost] = useState(250);

    const profit = useMemo(
        () => milkYield * price - feedCost,
        [milkYield, price, feedCost]
    );

    const chartData = {
        labels: breedData.labels,
        datasets: [
            {
                type: "bar" as const,
                label: "Yield (L/Day)",
                data: breedData.yield,
                backgroundColor: "rgba(16, 185, 129, 0.75)",
                borderColor: "#10b981",
                borderWidth: 1,
                borderRadius: 6,
                order: 2,
            },
            {
                type: "line" as const,
                label: "Fat %",
                data: breedData.fatPercent,
                borderColor: "#d97706",
                backgroundColor: "#d97706",
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: "#d97706",
                yAxisID: "y1",
                order: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: "Liters", color: "#6b7280" },
                grid: { display: false },
                ticks: { color: "#9ca3af" },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                title: { display: true, text: "Fat %", color: "#6b7280" },
                grid: { color: "rgba(0,0,0,0.05)" },
                ticks: { color: "#9ca3af" },
            },
            x: {
                ticks: { color: "#6b7280", font: { weight: "bold" as const } },
                grid: { display: false },
            },
        },
        plugins: {
            tooltip: { mode: "index" as const, intersect: false },
            legend: {
                labels: { color: "#374151", usePointStyle: true, padding: 16 },
            },
        },
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-2">
                    <TrendingUp className="inline mr-2 -mt-1" size={22} />
                    Optimizing Milk Production
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    Maximizing profitability requires balancing <strong>Milk Yield</strong>{" "}
                    with <strong>Fat Percentage</strong>. Indigenous breeds often offer
                    higher fat content and disease resistance, while exotic breeds provide
                    higher volume.
                </p>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Chart */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-neutral-800 text-sm">
                                Breed Performance
                            </h3>
                            <span className="text-[10px] bg-white/70 px-2 py-1 rounded-full border border-neutral-200 text-neutral-400 font-semibold uppercase">
                                Interactive
                            </span>
                        </div>
                        <div className="h-[260px] md:h-[300px]">
                            <Chart type="bar" data={chartData} options={chartOptions} />
                        </div>
                        <p className="text-[11px] text-center text-neutral-400 mt-2">
                            Average daily yield vs. fat percentage by breed
                        </p>
                    </div>

                    {/* Calculator */}
                    <div className="bg-emerald-50/80 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100/60">
                        <h3 className="font-bold text-emerald-900 text-base mb-4 pb-2 border-b border-emerald-200/60">
                            <Calculator className="inline mr-2 -mt-0.5" size={18} />
                            Daily Profit Estimator
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1 tracking-wide">
                                        Milk Yield (L/Day)
                                    </label>
                                    <input
                                        type="number"
                                        value={milkYield}
                                        onChange={(e) => setMilkYield(Number(e.target.value) || 0)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-emerald-300/60 bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1 tracking-wide">
                                        Price (₹/L)
                                    </label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value) || 0)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-emerald-300/60 bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1 tracking-wide">
                                    Feed Cost (₹/Day)
                                </label>
                                <input
                                    type="number"
                                    value={feedCost}
                                    onChange={(e) => setFeedCost(Number(e.target.value) || 0)}
                                    className="w-full px-3 py-2.5 rounded-xl border border-emerald-300/60 bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
                                />
                            </div>

                            <div className="mt-4 pt-4 border-t border-emerald-200/60 bg-white/70 rounded-xl p-4 text-center shadow-sm">
                                <span className="block text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
                                    Estimated Daily Margin
                                </span>
                                <span
                                    className={`block text-3xl font-extrabold mt-1 ${profit >= 0 ? "text-emerald-600" : "text-red-500"
                                        }`}
                                >
                                    ₹{profit}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
