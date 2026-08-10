"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
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
  Stethoscope,
  Car,
  BookOpen,
  Camera,
  Building2,
  PawPrint,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface CategoryItem {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  count: string;
  description: string;
}

const allCategories: CategoryItem[] = [
  { name: "Restaurants", slug: "restaurants", icon: UtensilsCrossed, color: "#22c55e", count: "2,400+", description: "Fine dining, casual restaurants, food courts, and local eateries" },
  { name: "Cafes & Coffee", slug: "cafes", icon: Coffee, color: "#a855f7", count: "1,200+", description: "Coffee shops, tea houses, and cozy cafes for work or leisure" },
  { name: "Fast Food", slug: "fast-food", icon: Pizza, color: "#f59e0b", count: "1,800+", description: "Quick bites, burger joints, and fast food chains" },
  { name: "Pharmacies", slug: "pharmacies", icon: Pill, color: "#ef4444", count: "850+", description: "Medicine shops, pharmacies, and health product stores" },
  { name: "Grocery & Super Shops", slug: "grocery", icon: ShoppingCart, color: "#f97316", count: "960+", description: "Supermarkets, grocery stores, and fresh produce markets" },
  { name: "Hospitals", slug: "hospitals", icon: Hospital, color: "#dc2626", count: "95+", description: "Multi-specialty hospitals with emergency services" },
  { name: "Clinics", slug: "hospitals", icon: Stethoscope, color: "#e11d48", count: "420+", description: "Medical clinics, dental offices, and specialist practices" },
  { name: "Hotels & Resorts", slug: "hotels", icon: Hotel, color: "#8b5cf6", count: "180+", description: "Hotels, resorts, guesthouses, and accommodations" },
  { name: "Shopping Malls", slug: "shopping", icon: ShoppingBag, color: "#3b82f6", count: "320+", description: "Shopping centers, malls, and retail destinations" },
  { name: "Banks & ATMs", slug: "banks-atms", icon: Landmark, color: "#0ea5e9", count: "1,500+", description: "Banks, ATMs, and financial service centers" },
  { name: "Fuel Stations", slug: "fuel-stations", icon: Fuel, color: "#eab308", count: "240+", description: "Gas stations, CNG stations, and EV charging" },
  { name: "Beauty Salons", slug: "beauty-salons", icon: Scissors, color: "#ec4899", count: "380+", description: "Hair salons, spas, beauty parlors, and wellness centers" },
  { name: "Gyms & Fitness", slug: "gyms", icon: Dumbbell, color: "#14b8a6", count: "160+", description: "Fitness centers, gyms, yoga studios, and martial arts" },
  { name: "Parking", slug: "fuel-stations", icon: Car, color: "#6366f1", count: "550+", description: "Parking lots, garages, and valet services" },
  { name: "Libraries", slug: "cafes", icon: BookOpen, color: "#0d9488", count: "85+", description: "Public libraries, reading rooms, and study spaces" },
  { name: "Tourist Places", slug: "hotels", icon: Camera, color: "#d946ef", count: "120+", description: "Tourist attractions, landmarks, and points of interest" },
  { name: "Real Estate", slug: "shopping", icon: Building2, color: "#64748b", count: "200+", description: "Real estate offices, property dealers, and rental services" },
  { name: "Pet Shops", slug: "grocery", icon: PawPrint, color: "#f43f5e", count: "75+", description: "Pet stores, veterinary clinics, and pet grooming" },
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary-900 to-primary-800 dark:from-slate-900 dark:to-slate-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 text-accent-400" />
              Browse Categories
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore All Categories
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Discover 18+ categories of local businesses and services, all powered by our AI recommendation engine
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore?category=${cat.slug}`}
                className="group glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6 card-hover flex items-start gap-4"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.color + "15" }}
                >
                  <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{cat.count} places</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
