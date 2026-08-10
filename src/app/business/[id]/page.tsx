"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Wifi,
  Car,
  Wind,
  Users,
  Truck,
  BadgeCheck,
  Crown,
  Navigation,
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  Check,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import type { Business, Review } from "@/lib/types";

interface BusinessDetail extends Business {
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
  } | null;
  reviews: Review[];
}

function PriceRange({ level }: { level: number | null }) {
  if (!level) return null;
  return (
    <span className="text-lg">
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

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [business, setBusiness] = useState<BusinessDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    fetch(`/api/businesses/${resolvedParams.id}`)
      .then((r) => r.json())
      .then((data) => {
        setBusiness(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="h-80 shimmer rounded-2xl mb-6" />
            <div className="h-8 shimmer rounded-lg w-1/2 mb-4" />
            <div className="h-4 shimmer rounded-lg w-full mb-2" />
            <div className="h-4 shimmer rounded-lg w-3/4" />
          </div>
        </main>
      </>
    );
  }

  if (!business) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Business Not Found
            </h2>
            <Link href="/explore" className="text-primary-500 hover:underline">
              Go back to explore
            </Link>
          </div>
        </main>
      </>
    );
  }

  const features: { label: string; active: boolean; icon: typeof Wifi }[] = [
    { label: "Free WiFi", active: !!business.hasWifi, icon: Wifi },
    { label: "Parking", active: !!business.hasParking, icon: Car },
    { label: "Air Conditioned", active: !!business.isAirConditioned, icon: Wind },
    { label: "Family Friendly", active: !!business.isFamilyFriendly, icon: Users },
    { label: "Home Delivery", active: !!business.hasDelivery, icon: Truck },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to results
          </Link>

          {/* Hero image */}
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden mb-8 bg-slate-200 dark:bg-slate-800">
            {business.imageUrl ? (
              <img
                src={business.imageUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🏢</div>
            )}

            {/* Overlay badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {business.isPremium && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/90 text-white text-sm font-semibold backdrop-blur-sm">
                  <Crown className="w-4 h-4" />
                  Premium Partner
                </span>
              )}
              {business.isVerified && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-500/90 text-white text-sm font-semibold backdrop-blur-sm">
                  <BadgeCheck className="w-4 h-4" />
                  Verified
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-colors ${
                  liked ? "bg-red-500 text-white" : "bg-white/80 text-slate-700 hover:bg-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/80 text-slate-700 hover:bg-white flex items-center justify-center backdrop-blur-sm">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Status */}
            <div className="absolute bottom-4 left-4">
              <span
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${
                  business.isOpen
                    ? "bg-green-500/90 text-white"
                    : "bg-red-500/90 text-white"
                } backdrop-blur-sm`}
              >
                {business.isOpen ? "✓ Open Now" : "✕ Closed"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {business.name}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      {business.category && (
                        <span
                          className="text-sm font-medium px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: business.category.color + "15",
                            color: business.category.color,
                          }}
                        >
                          {business.category.name}
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          {business.rating?.toFixed(1)}
                        </span>
                        <span className="text-sm text-slate-400">
                          ({business.reviewCount} reviews)
                        </span>
                      </div>
                      <PriceRange level={business.priceRange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
                <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                  About
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {business.description}
                </p>
              </div>

              {/* Tags */}
              {business.tags && (business.tags as string[]).length > 0 && (
                <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
                  <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(business.tags as string[]).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
                <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                  Amenities & Features
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {features.map((f) => (
                    <div
                      key={f.label}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                        f.active
                          ? "bg-accent-50 dark:bg-accent-950/20 text-accent-700 dark:text-accent-400"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-400 line-through"
                      }`}
                    >
                      <f.icon className="w-4 h-4" />
                      {f.label}
                    </div>
                  ))}
                  {business.hasHalalFood && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400">
                      <Check className="w-4 h-4" />
                      Halal Food
                    </div>
                  )}
                  {business.isWheelchairAccessible && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400">
                      <Check className="w-4 h-4" />
                      Wheelchair Accessible
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews */}
              <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
                <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">
                  Reviews ({business.reviews?.length || 0})
                </h2>
                {business.reviews && business.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {business.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600">
                              {review.userName.charAt(0)}
                            </div>
                            <span className="font-medium text-sm text-slate-900 dark:text-white">
                              {review.userName}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(review.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No reviews yet.</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick info */}
              <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6 sticky top-24">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {business.address}
                    </span>
                  </div>
                  {business.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {business.phone}
                      </span>
                    </div>
                  )}
                  {business.avgBudget && (
                    <div className="flex items-center gap-3">
                      <span className="text-lg">💰</span>
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        Avg. Budget: ৳{business.avgBudget.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {business.waitingTime !== null && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        ~{business.waitingTime} min waiting time
                      </span>
                    </div>
                  )}
                  {business.seatsAvailable !== null && business.seatsAvailable > 0 && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {business.seatsAvailable} seats available
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowBooking(!showBooking)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                  <button className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                  <button className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </button>
                </div>

                {/* Booking form */}
                {showBooking && (
                  <div className="mt-4 p-4 rounded-xl bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800/30">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">
                      Quick Booking
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="date"
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                      />
                      <input
                        type="time"
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                      />
                      <select className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
                        <option>1 person</option>
                        <option>2 people</option>
                        <option>3 people</option>
                        <option>4 people</option>
                        <option>5+ people</option>
                      </select>
                      <button className="w-full px-4 py-2.5 bg-accent-500 text-white rounded-xl text-sm font-medium hover:bg-accent-600 transition-colors">
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {business.openingHours && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-500" />
                      Opening Hours
                    </h3>
                    <div className="space-y-1">
                      {Object.entries(business.openingHours as Record<string, string>).map(
                        ([day, hours]) => (
                          <div
                            key={day}
                            className="flex justify-between text-xs text-slate-500 dark:text-slate-400"
                          >
                            <span className="capitalize font-medium">{day}</span>
                            <span>{hours}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
