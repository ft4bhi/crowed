"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  MapPin,
  Phone,
  Edit,
  LogOut,
  Grid,
  FileText,
  CheckCircle,
  Eye,
  MessageCircle
} from "lucide-react";
import { getUserListings } from "@/app/actions/listings";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";

// Mock user data for now (since auth is client-side)
const mockUser = {
  uid: "test-user-uid",
  name: "Raju Farms",
  email: "raju@example.com",
  phone: "+91 98765 43210",
  location: "Kochi, Kerala",
  image: "/user-placeholder.jpg",
  role: "Seller",
  stats: {
    totalListings: 12,
    activeListings: 5,
    sold: 7,
    views: 1205
  }
};

export default function ProfilePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const router = useRouter();

  useEffect(() => {
    // Fetch listings
    const fetchListings = async () => {
      const data = await getUserListings("test-user-uid");
      setListings(data);
    };
    fetchListings();
  }, []);

  const activeListings = listings.filter(l => l.status === "active");
  const soldListings = listings.filter(l => l.status === "sold");
  const draftListings = listings.filter(l => l.status === "draft");

  const ListingItem = ({ listing }: { listing: any }) => (
    <div className="glass-card p-4 flex gap-4 mb-3 hover:bg-white/50 transition-colors cursor-pointer group">
      <div className="relative w-24 h-24 bg-gray-200/50 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={listing.images ? JSON.parse(listing.images as string)[0] : "/placeholder-cow.jpg"}
          alt={listing.breed}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{listing.breed}</h3>
            <p className="text-xs text-gray-600 font-bold">₹{listing.price}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 glass rounded-lg hover:bg-white/60 text-gray-600">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {listing.viewCount} Views</span>
          <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {listing.whatsappCount} Chats</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-24 md:pl-64">
      {/* Header / Profile Card */}
      <div className="glass-nav p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button className="text-red-600 flex items-center gap-1 text-sm font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-3xl font-bold text-emerald-700 shadow-md border-2 border-white/50">
            {mockUser.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{mockUser.name}</h2>
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1 font-medium">
              <Phone className="w-3 h-3" /> {mockUser.phone}
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
              <MapPin className="w-3 h-3" /> {mockUser.location}
            </div>
          </div>
          <Link href="/settings" className="ml-auto p-2 glass rounded-full hover:bg-white/60 transition-colors">
            <Edit className="w-5 h-5 text-gray-700" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-emerald-100/40 backdrop-blur-sm p-4 rounded-xl text-center border border-emerald-200/50">
            <p className="text-emerald-700 font-bold text-xl">{mockUser.stats.activeListings}</p>
            <p className="text-emerald-700/80 text-xs font-bold uppercase tracking-wide">Active</p>
          </div>
          <div className="bg-green-100/40 backdrop-blur-sm p-4 rounded-xl text-center border border-green-200/50">
            <p className="text-green-700 font-bold text-xl">{mockUser.stats.sold}</p>
            <p className="text-green-700/80 text-xs font-bold uppercase tracking-wide">Sold</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <p className="text-gray-800 font-bold text-xl">{mockUser.stats.views}</p>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide">Total Views</p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="p-4 md:p-8">
        <Tabs.Root defaultValue="active" onValueChange={setActiveTab}>
          <Tabs.List className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-gray-200/30 no-scrollbar">
            <Tabs.Trigger
              value="active"
              className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'active' ? 'bg-emerald-600 text-white shadow-lg' : 'glass text-gray-600 hover:bg-white/40'}`}
            >
              <Grid className="w-4 h-4" /> Active ({activeListings.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="sold"
              className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'sold' ? 'bg-emerald-600 text-white shadow-lg' : 'glass text-gray-600 hover:bg-white/40'}`}
            >
              <CheckCircle className="w-4 h-4" /> Sold ({soldListings.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="drafts"
              className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'drafts' ? 'bg-emerald-600 text-white shadow-lg' : 'glass text-gray-600 hover:bg-white/40'}`}
            >
              <FileText className="w-4 h-4" /> Drafts ({draftListings.length})
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="active" className="space-y-3">
            {activeListings.length > 0 ? (
              activeListings.map(l => <ListingItem key={l.id} listing={l} />)
            ) : (
              <div className="text-center py-12 text-gray-400 font-medium">No active listings</div>
            )}
          </Tabs.Content>

          <Tabs.Content value="sold" className="space-y-3">
            {soldListings.length > 0 ? (
              soldListings.map(l => <ListingItem key={l.id} listing={l} />)
            ) : (
              <div className="text-center py-12 text-gray-400 font-medium">No sold listings yet</div>
            )}
          </Tabs.Content>

          <Tabs.Content value="drafts" className="space-y-3">
            {draftListings.length > 0 ? (
              draftListings.map(l => <ListingItem key={l.id} listing={l} />)
            ) : (
              <div className="text-center py-12 text-gray-400 font-medium">No drafts</div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
