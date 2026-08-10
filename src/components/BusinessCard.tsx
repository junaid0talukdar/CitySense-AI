"use client";

import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  Check,
  Wifi,
  Car,
  Wind,
  Users,
  Truck,
  BadgeCheck,
  Crown,
  Navigation,
} from "lucide-react";
import type { BusinessResult } from "@/lib/types";

function PriceRange({ level }: { level: number | null }) {
  if (!level) return null;
  return (
    <span className="text-sm">
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className={i < level ? "text-accent-600 font-bold" : "text-slate-300 dark:text-slate-600"}
        >
          ৳
        </span>
      ))}
    </span>
  );
}

export default function BusinessCard({ business }: { business: BusinessResult }) {
  const scoreColor =
    business.aiScore >= 90
      ? "text-accent-500 bg-accent-50 dark:bg-accent-950/30"
      : business.aiScore >= 70
      ? "text-blue-500 bg-blue-50 dark:bg-blue-950/30"
      : "text-amber-500 bg-amber-50 dark:bg-amber-950/30";

  return (
    <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
        {business.imageUrl ? (
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🏢</div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {business.isPremium && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/90 text-white text-xs font-semibold backdrop-blur-sm">
              <Crown className="w-3 h-3" />
              Premium
            </span>
          )}
          {business.isVerified && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/90 text-white text-xs font-semibold backdrop-blur-sm">
              <BadgeCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* AI Score */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-2.5 py-1.5 rounded-xl ${scoreColor} text-sm font-bold backdrop-blur-sm border border-white/20`}
          >
            {business.aiScore}% AI Match
          </div>
        </div>

        {/* Open/Closed */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${
              business.isOpen
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {business.isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
            {business.name}
          </h3>
          <PriceRange level={business.priceRange} />
        </div>

        {/* Category & Rating */}
        <div className="flex items-center gap-3 mb-3">
          {business.categoryName && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: (business.categoryColor || "#888") + "15",
                color: business.categoryColor || "#888",
              }}
            >
              {business.categoryName}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {business.rating?.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">({business.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{business.address}</span>
        </div>

        {/* Budget & Distance */}
        <div className="flex items-center gap-4 mb-3 text-xs text-slate-500 dark:text-slate-400">
          {business.avgBudget && (
            <span>Avg. ৳{business.avgBudget.toLocaleString()}</span>
          )}
          {business.distance && <span>{business.distance} km away</span>}
          {business.waitingTime !== null && business.waitingTime !== undefined && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {business.waitingTime} min wait
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {business.hasWifi && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Wifi className="w-3 h-3" /> WiFi
            </span>
          )}
          {business.hasParking && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Car className="w-3 h-3" /> Parking
            </span>
          )}
          {business.isAirConditioned && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Wind className="w-3 h-3" /> AC
            </span>
          )}
          {business.isFamilyFriendly && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Users className="w-3 h-3" /> Family
            </span>
          )}
          {business.hasDelivery && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Truck className="w-3 h-3" /> Delivery
            </span>
          )}
        </div>

        {/* Match reasons */}
        {business.matchReasons.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-accent-50/50 dark:bg-accent-950/20 border border-accent-200/50 dark:border-accent-800/30">
            <p className="text-xs font-semibold text-accent-700 dark:text-accent-400 mb-1.5">
              Why Recommended:
            </p>
            <div className="flex flex-wrap gap-1">
              {business.matchReasons.slice(0, 4).map((reason) => (
                <span
                  key={reason}
                  className="flex items-center gap-1 text-xs text-accent-600 dark:text-accent-300"
                >
                  <Check className="w-3 h-3" />
                  {reason}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/business/${business.id}`}
            className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium text-center hover:bg-primary-600 transition-colors"
          >
            View Details
          </Link>
          <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
