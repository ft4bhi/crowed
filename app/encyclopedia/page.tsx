"use client";

import { Search, Milk, Activity, Wheat, Landmark, ChevronRight, BookOpen } from "lucide-react";
import { useState } from "react";

const categories = [
  { 
    id: "milk", 
    name: "Milk Production", 
    icon: Milk, 
    color: "bg-blue-100 text-blue-600",
    articles: ["Feed planning for high yield", "Lactation cycle optimization", "Breed-specific nutrition"]
  },
  { 
    id: "diseases", 
    name: "Common Diseases", 
    icon: Activity, 
    color: "bg-red-100 text-red-600",
    articles: ["Mastitis Prevention", "Foot and Mouth Disease (FMD)", "Lumpy Skin Disease Guide"]
  },
  { 
    id: "feeds", 
    name: "Feeds & Nutrition", 
    icon: Wheat, 
    color: "bg-green-100 text-green-600",
    articles: ["Types of cattle feed", "Homemade feed formulas", "Seasonal feeding"]
  },
  { 
    id: "schemes", 
    name: "Govt Schemes", 
    icon: Landmark, 
    color: "bg-orange-100 text-orange-600",
    articles: ["Subsidies for small farmers", "Livestock Insurance", "Loan Programs 2024"]
  },
];

export default function EncyclopediaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.articles.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
          <p className="text-gray-500">Expert guides on cattle farming, health, and government support.</p>
        </div>

        {/* Search */}
        <div className="relative mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
            placeholder="Search for diseases, breeds, or tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Featured Card (Hidden on search) */}
        {!searchQuery && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-10 text-white relative overflow-hidden shadow-lg shadow-blue-200">
                <div className="relative z-10 max-w-lg">
                    <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">Featured Guide</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Summer Management Tips</h2>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                        Learn how to protect your livestock from heat stress and maintain milk production during peak summer months.
                    </p>
                    <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-md">
                        Read Article
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 right-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
            </div>
        )}

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.color} group-hover:scale-105 transition-transform`}>
                  <category.icon size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{category.articles.length} Guides</span>
                </div>
              </div>
              
              <ul className="space-y-3">
                {category.articles.map((article, idx) => (
                  <li key={idx} className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-gray-50 rounded-lg -mx-2">
                    <div className="flex items-center gap-3">
                        <BookOpen size={16} className="text-gray-300" />
                        <span className="text-sm font-medium">{article}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
