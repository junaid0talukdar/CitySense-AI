"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Food Enthusiast",
    avatar: "👨‍💼",
    rating: 5,
    text: "CitySense AI completely changed how I find restaurants. I just type what I'm craving with my budget, and it finds the perfect match every time!",
  },
  {
    name: "Fatima Khan",
    role: "Working Mom",
    avatar: "👩‍💻",
    rating: 5,
    text: "The emergency mode saved me when my child needed medicine at midnight. Found an open pharmacy in seconds. This app is a lifesaver!",
  },
  {
    name: "Kamal Uddin",
    role: "Business Owner",
    avatar: "👨‍🍳",
    rating: 5,
    text: "As a restaurant owner, the partner dashboard gives me incredible insights. My bookings increased 40% since joining as a premium partner.",
  },
  {
    name: "Sara Begum",
    role: "Student",
    avatar: "👩‍🎓",
    rating: 4,
    text: "Best app for finding study-friendly cafes! It knows I prefer quiet places with WiFi and adjusts recommendations based on my budget.",
  },
  {
    name: "Dr. Shahid Hassan",
    role: "Physician",
    avatar: "👨‍⚕️",
    rating: 5,
    text: "The AI recommendation quality is impressive. It doesn't just show nearby places — it actually understands what you need.",
  },
  {
    name: "Nusrat Jahan",
    role: "Travel Blogger",
    avatar: "✈️",
    rating: 5,
    text: "I use CitySense AI in every city I visit. The local insights and AI-powered suggestions are better than any travel guide.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Loved by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            See what our users are saying about CitySense AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <div className="relative mb-4">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary-200 dark:text-primary-800" />
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-6">
                  {t.text}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
