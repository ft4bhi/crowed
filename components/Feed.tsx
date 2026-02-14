"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import FilterModal from "@/components/FilterModal";
import { getListings } from "@/app/actions/listings";
import { Loader2 } from "lucide-react";

interface FeedProps {
    initialListings: any[];
}

export default function Feed({ initialListings }: FeedProps) {
    const [listings, setListings] = useState(initialListings);
    const [page, setPage] = useState(2); // Start from page 2 since page 1 is initial
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        // Combine active quick filter with advanced filters
        const currentFilters = { ...filters };
        if (activeFilter !== "All") {
            if (activeFilter === "High Yield") currentFilters.milk = 20;
            else if (activeFilter === "Pregnant") currentFilters.pregnancy = "Yes";
            else if (activeFilter === "Male Buffalo") {
                currentFilters.type = ["Buffalo"];
                // Gender logic needed if schema supports it, for now simplified
            }
            else if (filters.breed?.length) {
                // Keep existing breed filter
            } else {
                // Map activeFilter to type or breed if applicable
                if (["Cows", "Buffalos", "Bulls"].includes(activeFilter)) {
                    currentFilters.type = [activeFilter.slice(0, -1)]; // Cow, Buffalo, Bull
                } else if (activeFilter === "Jersey") {
                    currentFilters.breed = ["Jersey"];
                }
            }
        }

        const { data, nextId } = await getListings({ page, filters: currentFilters });

        if (data.length === 0) {
            setHasMore(false);
        } else {
            setListings((prev) => [...prev, ...data]);
            setPage((prev) => prev + 1);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (inView) {
            loadMore();
        }
    }, [inView]);

    const handleFilterSelect = async (filter: string) => {
        setActiveFilter(filter);
        setPage(1);
        setListings([]);
        setHasMore(true);
        setFilters({}); // Reset advanced filters on quick filter change? Or merge? 
        // For now reset to avoid confusion, or just apply quick filter logic

        const currentFilters: any = {};
        if (filter !== "All") {
            if (filter === "High Yield") currentFilters.milk = 20;
            else if (filter === "Pregnant") currentFilters.pregnancy = "Yes";
            else if (["Cows", "Buffalos", "Bulls"].includes(filter)) {
                currentFilters.type = [filter.slice(0, -1)];
            } else if (filter === "Jersey") {
                currentFilters.breed = ["Jersey"];
            }
        }

        setLoading(true);
        const { data } = await getListings({ page: 1, filters: currentFilters });
        setListings(data);
        setPage(2);
        setLoading(false);
    };

    const applyAdvancedFilters = async (newFilters: any) => {
        setFilters(newFilters);
        setActiveFilter("All"); // Reset quick filter visual
        setPage(1);
        setLoading(true);
        const { data } = await getListings({ page: 1, filters: newFilters });
        setListings(data);
        setPage(2);
        setHasMore(data.length > 0);
        setLoading(false);
    };

    return (
        <>
            <FilterBar
                onOpenFilters={() => setIsFilterOpen(true)}
                activeFilter={activeFilter}
                onFilterSelect={handleFilterSelect}
            />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing, index) => (
                        <ListingCard key={`${listing.id}-${index}`} listing={listing} />
                    ))}
                </div>

                {/* Loading State / Trigger */}
                {(hasMore || loading) && (
                    <div ref={ref} className="py-8 flex justify-center">
                        {loading && <Loader2 className="animate-spin text-blue-600" />}
                    </div>
                )}

                {!hasMore && listings.length > 0 && (
                    <div className="text-center py-8 text-gray-500">
                        You've reached the end!
                    </div>
                )}

                {!hasMore && listings.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No listings found. Try adjusting headers.
                    </div>
                )}
            </div>

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={applyAdvancedFilters}
            />
        </>
    );
}
