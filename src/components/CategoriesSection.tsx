"use client";

import Link from "next/link";
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
  Sparkles,
} from "lucide-react";

const categoryList = [
  { name: "Restaurants", slug: "restaurants", icon: UtensilsCrossed, color: "#22c55e", count: "2,400+" },
  { name: "Cafes", slug: "cafes", icon: Coffee, color: "#a855f7", count: "1,200+" },
  { name: "Pharmacies", slug: "pharmacies", icon: Pill, color: "#ef4444", count: "850+" },
  { name: "Grocery", slug: "grocery", icon: ShoppingCart, color: "#f97316", count: "960+" },
  { name: "Hospitals", slug: "hospitals", icon: Hospital, color: "#dc2626", count: "95+" },
  { name: "Hotels", slug: "hotels", icon: Hotel, color: "#8b5cf6", count: "180+" },
  { name: "Shopping", slug: "shopping", icon: ShoppingBag, color: "#3b82f6", count: "320+" },
  { name: "Banks & ATMs", slug: "banks-atms", icon: Landmark, color: "#0ea5e9", count: "1,500+" },
  { name: "Fuel Stations", slug: "fuel-stations", icon: Fuel, color: "#eab308", count: "240+" },
  { name: "Beauty Salons", slug: "beauty-salons", icon: Scissors, color: "#ec4899", count: "380+" },
  { name: "Gyms", slug: "gyms", icon: Dumbbell, color: "#14b8a6", count: "160+" },
  { name: "Fast Food", slug: "fast-food", icon: Pizza, color: "#f59e0b", count: "1,800+" },
  { name: "Clinics", slug: "hospitals", icon: Stethoscope, color: "#e11d48", count: "420+" },
  { name: "Parking", slug: "fuel-stations", icon: Car, color: "#6366f1", count: "550+" },
  { name: "Libraries", slug: "cafes", icon: BookOpen, color: "#0d9488", count: "85+" },
  { name: "Tourist Places", slug: "hotels", icon: Camera, color: "#d946ef", count: "120+" },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Categories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Browse through 16+ categories or let our AI find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categoryList.map((cat) => (
            <Link
              key={cat.name}
              href={`/explore?category=${cat.slug}`}
              className="group glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-5 card-hover text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: cat.color + "15" }}
              >
                <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400">{cat.count} places</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
