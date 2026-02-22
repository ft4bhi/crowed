"use client";

import { useState, useMemo } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Weight, Leaf } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NutritionTab() {
    const [weight, setWeight] = useState(400);

    const ration = useMemo(() => {
        const dmi = weight * 0.025;
        return {
            green: Math.round(dmi * 0.3 * 5), // Fresh weight (high moisture)
            dry: (dmi * 0.4).toFixed(1),
            concentrate: (dmi * 0.3).toFixed(1),
        };
    }, [weight]);

    const doughnutData = {
        labels: ["Green Fodder (Silage/Grass)", "Dry Fodder (Straw)", "Concentrate (Mix)"],
        datasets: [
            {
                data: [60, 25, 15],
                backgroundColor: ["#22c55e", "#fbbf24", "#3b82f6"],
                hoverOffset: 10,
                borderWidth: 2,
                borderColor: "#ffffff",
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    boxWidth: 12,
                    padding: 16,
                    color: "#374151",
                    usePointStyle: true,
                },
            },
        },
        layout: { padding: 10 },
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-2">
                    <Leaf className="inline mr-2 -mt-1 text-amber-600" size={22} />
                    Scientific Ration Balancing
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    Feed accounts for nearly <strong>70%</strong> of dairy farming costs.
                    A balanced diet ensures high milk yield and reproductive health.
                </p>

                <div className="grid lg:grid-cols-2 gap-6 items-start">
                    {/* Ration Calculator */}
                    <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-5 border border-amber-100/60 order-2 lg:order-1">
                        <h3 className="font-bold text-amber-900 text-base mb-4 pb-2 border-b border-amber-200/60">
                            <Weight className="inline mr-2 -mt-0.5" size={18} />
                            Ration Balancer
                        </h3>
                        <p className="text-xs text-amber-800/80 mb-5">
                            Dry Matter Intake (DMI) ≈{" "}
                            <strong>2.5% of Body Weight</strong>
                        </p>

                        {/* Slider */}
                        <div className="mb-6">
                            <label className="flex justify-between text-sm font-bold text-neutral-700 mb-2">
                                <span>Animal Weight</span>
                                <span className="bg-amber-200/80 px-2.5 py-0.5 rounded-lg text-amber-900 text-xs font-extrabold">
                                    {weight} kg
                                </span>
                            </label>
                            <input
                                type="range"
                                min={200}
                                max={800}
                                step={50}
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                            />
                            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                                <span>200kg</span>
                                <span>800kg</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-white/70 p-3 rounded-xl shadow-sm border-l-4 border-green-500">
                                <div className="text-[10px] text-neutral-500 uppercase font-bold">
                                    Green Fodder
                                </div>
                                <div className="text-lg font-bold text-neutral-800">
                                    {ration.green} kg
                                </div>
                                <div className="text-[9px] text-neutral-400">Silage/Grass</div>
                            </div>
                            <div className="bg-white/70 p-3 rounded-xl shadow-sm border-l-4 border-yellow-500">
                                <div className="text-[10px] text-neutral-500 uppercase font-bold">
                                    Dry Fodder
                                </div>
                                <div className="text-lg font-bold text-neutral-800">
                                    {ration.dry} kg
                                </div>
                                <div className="text-[9px] text-neutral-400">Straw/Hay</div>
                            </div>
                            <div className="bg-white/70 p-3 rounded-xl shadow-sm border-l-4 border-blue-500">
                                <div className="text-[10px] text-neutral-500 uppercase font-bold">
                                    Concentrate
                                </div>
                                <div className="text-lg font-bold text-neutral-800">
                                    {ration.concentrate} kg
                                </div>
                                <div className="text-[9px] text-neutral-400">Grains/Cakes</div>
                            </div>
                        </div>

                        <div className="mt-4 text-xs text-amber-800/70 bg-amber-100/50 p-3 rounded-xl">
                            <strong>Note:</strong> Add Mineral Mixture (50g/day) and Salt
                            (30g/day) — essential micronutrients.
                        </div>
                    </div>

                    {/* Doughnut Chart */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 order-1 lg:order-2">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-neutral-800 text-sm">
                                Ideal Plate Composition
                            </h3>
                        </div>
                        <div className="h-[250px] md:h-[280px]">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
