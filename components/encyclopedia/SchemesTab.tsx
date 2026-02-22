"use client";

import { useState, useMemo } from "react";
import { schemes } from "@/data/encyclopediaData";
import { Search, Landmark } from "lucide-react";

export default function SchemesTab() {
    const [query, setQuery] = useState("");

    const filtered = useMemo(
        () =>
            schemes.filter(
                (s) =>
                    s.title.toLowerCase().includes(query.toLowerCase()) ||
                    s.content.toLowerCase().includes(query.toLowerCase()) ||
                    s.tags.some((t) => t.includes(query.toLowerCase()))
            ),
        [query]
    );

    const categoryColor = (cat: string) => {
        switch (cat) {
            case "Credit":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Subsidy":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "Breed":
                return "bg-violet-100 text-violet-700 border-violet-200";
            case "Insurance":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "Infrastructure":
                return "bg-rose-100 text-rose-700 border-rose-200";
            default:
                return "bg-neutral-100 text-neutral-700 border-neutral-200";
        }
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
                    <Landmark className="inline mr-2 -mt-1 text-blue-600" size={22} />
                    Government Support & Subsidies
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    Access financial aid, credit facilities, and insurance to secure your
                    business. Browse and search the database below.
                </p>

                {/* Search */}
                <div className="relative max-w-lg mb-6 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-neutral-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="glass-input block w-full pl-11 pr-4 py-3 text-sm"
                        placeholder="Search schemes (e.g. 'loan', 'insurance', 'breed')..."
                    />
                </div>

                {/* Scheme List */}
                <div className="space-y-3">
                    {filtered.length === 0 ? (
                        <div className="text-center text-neutral-400 py-8">
                            No schemes found matching your search.
                        </div>
                    ) : (
                        filtered.map((s) => (
                            <div
                                key={s.title}
                                className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-neutral-100/60 shadow-sm hover:border-blue-200 transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                    <h4 className="font-bold text-base text-blue-900">
                                        {s.title}
                                    </h4>
                                    <span
                                        className={`inline-block self-start px-2 py-0.5 text-[10px] font-bold rounded-full uppercase border ${categoryColor(
                                            s.category
                                        )}`}
                                    >
                                        {s.category}
                                    </span>
                                </div>
                                <p className="text-neutral-600 text-sm mb-3">{s.content}</p>
                                <div className="flex gap-2">
                                    {s.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] text-neutral-400 bg-neutral-100/60 px-2 py-0.5 rounded-full border border-neutral-100"
                                        >
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
