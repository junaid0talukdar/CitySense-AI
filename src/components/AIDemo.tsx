"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Check, Brain } from "lucide-react";

interface DemoResult {
  query: string;
  parsed: {
    category: string;
    budget: string;
    group: string;
    preference: string;
    priority: string;
  };
  recommendation: {
    name: string;
    score: number;
    reasons: string[];
  };
}

const demos: DemoResult[] = [
  {
    query: "Affordable restaurant under ৳1000 for 5 people",
    parsed: {
      category: "Restaurant",
      budget: "৳1,000",
      group: "5 people",
      preference: "Affordable",
      priority: "High Rating",
    },
    recommendation: {
      name: "Spice Garden",
      score: 96,
      reasons: [
        "Within Budget (৳800 avg)",
        "4.5★ Rating",
        "Family Friendly",
        "Open Now",
        "Halal Food",
        "Air Conditioned",
        "1.8 km Away",
      ],
    },
  },
  {
    query: "Emergency pharmacy open right now",
    parsed: {
      category: "Pharmacy",
      budget: "Any",
      group: "1 person",
      preference: "Open Now",
      priority: "Urgency",
    },
    recommendation: {
      name: "LifeCare Pharmacy",
      score: 98,
      reasons: [
        "Open 24/7",
        "4.6★ Rating",
        "0.5 km Away",
        "Home Delivery",
        "Pharmacist On Duty",
        "Verified",
      ],
    },
  },
  {
    query: "Best coffee shop for studying with WiFi",
    parsed: {
      category: "Cafe",
      budget: "Any",
      group: "1 person",
      preference: "Quiet, WiFi",
      priority: "Study-friendly",
    },
    recommendation: {
      name: "Artisan Coffee House",
      score: 94,
      reasons: [
        "Free WiFi",
        "4.7★ Rating",
        "Quiet Zone",
        "Power Outlets",
        "Air Conditioned",
        "Open Now",
        "2.1 km Away",
      ],
    },
  },
];

export default function AIDemo() {
  const [activeDemo, setActiveDemo] = useState(0);
  const demo = demos[activeDemo];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Live Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            See the <span className="text-gradient">AI in Action</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Watch how CitySense AI parses natural language and generates smart recommendations
          </p>
        </div>

        {/* Demo tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {demos.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeDemo === i
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {d.parsed.category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Input */}
          <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4">
              <Sparkles className="w-4 h-4 text-primary-500" />
              User Input
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-200 text-sm italic">
                &ldquo;{demo.query}&rdquo;
              </p>
            </div>
          </div>

          {/* Parsed */}
          <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4">
              <Brain className="w-4 h-4 text-accent-500" />
              AI Extraction
            </div>
            <div className="space-y-2">
              {Object.entries(demo.parsed).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 capitalize">{key}:</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-lg">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <ArrowRight className="w-4 h-4 text-emerald-500" />
                Top Match
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-bold">
                {demo.recommendation.score}%
              </div>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">
              {demo.recommendation.name}
            </h4>
            <div className="space-y-1.5">
              {demo.recommendation.reasons.map((reason) => (
                <div key={reason} className="flex items-center gap-2 text-xs">
                  <Check className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
