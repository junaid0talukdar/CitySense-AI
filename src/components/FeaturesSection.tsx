"use client";

import {
  Brain,
  Wallet,
  Clock,
  AlertTriangle,
  CalendarCheck,
  BarChart3,
  Shield,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Recommendation",
    description:
      "Our AI understands natural language and recommends places based on intent, not just keywords.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Wallet,
    title: "Budget Intelligence",
    description:
      "Tell us your budget and we'll find options that fit perfectly — no surprises.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description:
      "Live data on business hours, waiting times, seat availability, and more.",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Mode",
    description:
      "Instantly find the nearest open hospitals, pharmacies, and emergency services.",
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
  },
  {
    icon: CalendarCheck,
    title: "Smart Booking",
    description:
      "Reserve tables, book rooms, schedule appointments — all from one platform.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: BarChart3,
    title: "Explainable AI",
    description:
      "Every recommendation explains why it was chosen. Full transparency, always.",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    icon: Shield,
    title: "Verified Partners",
    description:
      "All listed businesses are verified for quality, ensuring a reliable experience.",
    color: "from-slate-500 to-slate-700",
    bgColor: "bg-slate-50 dark:bg-slate-800/30",
  },
  {
    icon: Sparkles,
    title: "Personalized",
    description:
      "The more you use CitySense, the better it understands your preferences.",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Why CitySense AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            An AI Decision Engine,
            <br />
            <span className="text-gradient">Not Just Another Map</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            We don&apos;t just show nearby places. We help you decide where to go based on
            multiple constraints and explain every recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glass-card dark:bg-slate-900/50 dark:border-slate-800 rounded-2xl p-6 card-hover cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
