"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-hero bg-hero-pattern relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "#10b981" : "#3b82f6"
              } 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4 text-accent-400" />
          Start Discovering Today
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Find Your
          <br />
          <span className="bg-gradient-to-r from-accent-400 to-blue-400 bg-clip-text text-transparent">
            Perfect Place?
          </span>
        </h2>

        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of users who trust CitySense AI for intelligent, personalized
          local discovery. Your perfect place is just a search away.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/explore"
            className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 group"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/emergency"
            className="px-8 py-4 bg-red-500/20 border border-red-400/30 text-white rounded-2xl font-semibold text-lg hover:bg-red-500/30 transition-all backdrop-blur-sm"
          >
            🚨 Emergency Mode
          </Link>
        </div>
      </div>
    </section>
  );
}
