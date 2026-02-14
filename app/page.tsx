import { getListings } from "@/app/actions/listings";
import Feed from "@/components/Feed";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: initialListings } = await getListings({ page: 1 });

  return (
    <div className="min-h-screen pb-20 md:pl-64 transition-all duration-300">
      <Feed initialListings={initialListings} />
    </div>
  );
}
