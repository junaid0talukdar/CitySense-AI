"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  MapPin,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const exampleQueries = [
  "I need a restaurant under ৳800",
  "Find a nearby pharmacy open now",
  "Best coffee shop for studying",
  "Family restaurant with halal food",
  "Affordable hotel near the airport",
  "Emergency hospital nearby",
];

const stats = [
  { label: "Restaurants", value: "2,400+", icon: "🍽️" },
  { label: "Pharmacies", value: "850+", icon: "💊" },
  { label: "Shopping Centers", value: "320+", icon: "🛍️" },
  { label: "Hotels", value: "180+", icon: "🏨" },
  { label: "Hospitals", value: "95+", icon: "🏥" },
  { label: "Verified Partners", value: "5,200+", icon: "✅" },
];

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

  useEffect(() => {
    const target = exampleQueries[placeholderIdx];
    let charIdx = 0;
    setAnimatedPlaceholder("");

    const interval = setInterval(() => {
      if (charIdx <= target.length) {
        setAnimatedPlaceholder(target.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPlaceholderIdx((prev) => (prev + 1) % exampleQueries.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [placeholderIdx]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleExampleClick = (q: string) => {
    router.push(`/explore?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className="relative min-h-[90vh] bg-hero bg-hero-pattern flex items-center overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? "#10b981" : "#3b82f6",
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-accent-400" />
            AI-Powered Local Discovery Engine
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find the{" "}
            <span className="bg-gradient-to-r from-accent-400 to-blue-400 bg-clip-text text-transparent">
              Perfect Place
            </span>
            <br />
            Not Just the Nearest
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tell us what you need in natural language. Our AI understands your budget,
            preferences, and requirements to recommend the best places — not just the
            closest ones.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <div className="relative ai-glow rounded-2xl">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={animatedPlaceholder || "What are you looking for today?"}
                className="w-full pl-16 pr-32 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl text-slate-900 dark:text-white text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 shadow-2xl"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-accent-500/25 transition-all text-sm"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Example queries */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {["Restaurant under ৳800", "Open pharmacy", "Cafe with WiFi", "Family hotel"].map(
              (example) => (
                <button
                  key={example}
                  onClick={() => handleExampleClick(example)}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
                >
                  {example}
                </button>
              )
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-dark rounded-2xl p-4 text-center hover:bg-white/10 transition-all cursor-default"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
