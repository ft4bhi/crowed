"use client";

import { useState, useMemo } from "react";
import { diseases, vaccinations, type Disease } from "@/data/encyclopediaData";
import { Stethoscope, CalendarCheck, AlertTriangle, ShieldCheck, UserRoundCog } from "lucide-react";

export default function HealthTab() {
    const [activeTag, setActiveTag] = useState("all");

    // Extract unique tags from diseases
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        diseases.forEach((d) => d.tags.forEach((t) => tags.add(t)));
        return Array.from(tags);
    }, []);

    const filteredDiseases = useMemo(
        () =>
            activeTag === "all"
                ? diseases
                : diseases.filter((d) => d.tags.includes(activeTag)),
        [activeTag]
    );

    const severityColor = (s: Disease["severity"]) => {
        if (s === "Critical") return "bg-red-600";
        if (s === "High") return "bg-orange-500";
        return "bg-yellow-500";
    };

    const severityBadge = (s: Disease["severity"]) => {
        if (s === "Critical")
            return "bg-red-100 text-red-700 border-red-200";
        if (s === "High")
            return "bg-orange-100 text-orange-700 border-orange-200";
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-red-900 mb-2">
                    <Stethoscope className="inline mr-2 -mt-1 text-red-600" size={22} />
                    Disease Identification & Prevention
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    Early detection saves lives and protects your herd. Use the{" "}
                    <strong>Symptom Checker</strong> to filter common diseases, or review
                    the annual vaccination schedule.
                </p>

                {/* Symptom Filters */}
                <div className="mb-5">
                    <h3 className="font-bold text-neutral-800 text-sm mb-3">
                        <AlertTriangle className="inline mr-1.5 -mt-0.5 text-red-500" size={16} />
                        Symptom Checker
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveTag("all")}
                            className={`px-3 py-1.5 text-xs rounded-full font-semibold transition-all ${activeTag === "all"
                                    ? "bg-neutral-800 text-white shadow-sm"
                                    : "bg-white/70 text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                                }`}
                        >
                            All Issues
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-3 py-1.5 text-xs rounded-full font-semibold capitalize transition-all ${activeTag === tag
                                        ? "bg-neutral-800 text-white shadow-sm"
                                        : "bg-white/70 text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Disease Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {filteredDiseases.length === 0 ? (
                        <div className="col-span-full text-center text-neutral-400 py-8">
                            No matching diseases found.
                        </div>
                    ) : (
                        filteredDiseases.map((d) => (
                            <div
                                key={d.id}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-red-100/60 shadow-sm hover:shadow-md transition-shadow p-4 relative overflow-hidden"
                            >
                                {/* Severity bar */}
                                <div
                                    className={`absolute top-0 left-0 w-1 h-full ${severityColor(
                                        d.severity
                                    )}`}
                                />

                                <div className="flex justify-between items-start mb-2 pl-2">
                                    <h4 className="font-bold text-base text-neutral-800">
                                        {d.name}
                                    </h4>
                                    <span
                                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityBadge(
                                            d.severity
                                        )}`}
                                    >
                                        {d.severity}
                                    </span>
                                </div>

                                <p className="text-[11px] text-neutral-400 mb-3 pl-2 italic">
                                    {d.desc}
                                </p>

                                <div className="pl-2 space-y-2">
                                    <div>
                                        <span className="text-[10px] font-bold text-neutral-600 block uppercase">
                                            Signs:
                                        </span>
                                        <span className="text-xs text-neutral-500">{d.symptoms}</span>
                                    </div>
                                    <div className="bg-red-50/80 p-2.5 rounded-xl mt-2">
                                        <span className="text-[10px] font-bold text-red-800 block uppercase">
                                            <UserRoundCog className="inline mr-1 -mt-0.5" size={12} />
                                            Action:
                                        </span>
                                        <span className="text-xs text-red-700">{d.action}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Vaccination Calendar */}
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-100/60">
                    <h3 className="font-bold text-blue-900 text-base mb-4">
                        <CalendarCheck className="inline mr-2 -mt-0.5" size={18} />
                        Annual Vaccination Calendar
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {vaccinations.map((v) => (
                            <div
                                key={v.quarter}
                                className="bg-white/80 p-3.5 rounded-xl shadow-sm border-t-4 border-blue-400 relative overflow-hidden"
                            >
                                <div className="absolute -right-2 -top-2 bg-blue-100/50 rounded-full w-10 h-10 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-blue-700">
                                        {v.quarter}
                                    </span>
                                </div>
                                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">
                                    {v.months}
                                </div>
                                <div className="font-bold text-neutral-800 text-base">
                                    {v.name}
                                </div>
                                <div className="text-xs text-neutral-500">{v.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
