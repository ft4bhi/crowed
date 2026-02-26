import { getListings } from "@/app/actions/listings";
import Feed from "@/components/Feed";
import PullToRefresh from "@/components/PullToRefresh";
import { Suspense } from "react";
import ListingSkeleton from "@/components/ListingSkeleton";

export const revalidate = 30; // ISR: serve cached, revalidate every 30s

export default async function Home() {
  const { data: initialListings } = await getListings({ page: 1 });

  return (
    <div className="min-h-screen md:pl-64 transition-all duration-300">
      <PullToRefresh>
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <ListingSkeleton key={i} />)}
            </div>
          </div>
        }>
          <Feed initialListings={initialListings} />
        </Suspense>
      </PullToRefresh>
    </div>
  );
}
