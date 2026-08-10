"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
  Brain,
  ChevronDown,
  Star,
  Wifi,
  Car,
  Wind,
  Users,
  Truck,
  UtensilsCrossed,
  Coffee,
  Pill,
  ShoppingCart,
  Hospital,
  Hotel,
  ShoppingBag,
  Landmark,
  Fuel,
  Scissors,
  Dumbbell,
  Pizza,
} from "lucide-react";
import type { BusinessResult } from "@/lib/types";
import type { ParsedIntent } from "@/lib/ai-engine";

const categoryFilters = [
  { slug: "", label: "All", icon: Sparkles },
  { slug: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { slug: "cafes", label: "Cafes", icon: Coffee },
  { slug: "pharmacies", label: "Pharmacies", icon: Pill },
  { slug: "grocery", label: "Grocery", icon: ShoppingCart },
  { slug: "hospitals", label: "Hospitals", icon: Hospital },
  { slug: "hotels", label: "Hotels", icon: Hotel },
  { slug: "shopping", label: "Shopping", icon: ShoppingBag },
  { slug: "banks-atms", label: "Banks", icon: Landmark },
  { slug: "fuel-stations", label: "Fuel", icon: Fuel },
  { slug: "beauty-salons", label: "Salons", icon: Scissors },
  { slug: "gyms", label: "Gyms", icon: Dumbbell },
  { slug: "fast-food", label: "Fast Food", icon: Pizza },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [intent, setIntent] = useState<ParsedIntent | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const doSearch = useCallback(async (q: string, cat: string) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setResults(data.results || []);
      setAiResponse(data.aiResponse || "");
      setIntent(data.intent || null);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    doSearch(initialQuery, initialCategory);
  }, [initialQuery, initialCategory, doSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (activeCategory) params.set("category", activeCategory);
    router.push(`/explore?${params.toString()}`);
    doSearch(query, activeCategory);
  };

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (slug) params.set("category", slug);
    router.push(`/explore?${params.toString()}`);
    doSearch(query, slug);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Search Header */}
        <div className="bg-gradient-to-b from-primary-900 to-primary-800 dark:from-slate-900 dark:to-slate-950 pb-8 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              <Sparkles className="w-6 h-6 inline-block mr-2 text-accent-400" />
              AI-Powered Discovery
            </h1>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Brain className="w-5 h-5 text-accent-500" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: 'Family restaurant under ৳1000 with halal food' or 'Open pharmacy near me'"
                  className="w-full pl-12 pr-28 py-4 bg-white dark:bg-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 shadow-xl text-sm sm:text-base"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.slug
                      ? "bg-white text-primary-600 shadow-lg"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Response */}
        {aiResponse && hasSearched && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
            <div className="glass dark:glass-dark rounded-2xl p-4 flex items-start gap-3 mb-6 shadow-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-200">{aiResponse}</p>
                {intent && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {intent.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        Category: {intent.category}
                      </span>
                    )}
                    {intent.budget && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        Budget: ৳{intent.budget}
                      </span>
                    )}
                    {intent.groupSize && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        Group: {intent.groupSize}
                      </span>
                    )}
                    {intent.rating && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                        Min Rating: {intent.rating}★
                      </span>
                    )}
                    {intent.dietaryReqs.map((r) => (
                      <span key={r} className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        {r}
                      </span>
                    ))}
                    {intent.isUrgent && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        ⚡ Urgent
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {loading ? "Searching..." : `${results.length} results found`}
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="h-48 shimmer" />
                  <div className="p-5 space-y-3 bg-white dark:bg-slate-800">
                    <div className="h-6 shimmer rounded-lg w-3/4" />
                    <div className="h-4 shimmer rounded-lg w-1/2" />
                    <div className="h-4 shimmer rounded-lg w-full" />
                    <div className="h-10 shimmer rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results grid */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && results.length === 0 && hasSearched && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Try a different search query or browse by category
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
      <ExploreContent />
    </Suspense>
  );
}

