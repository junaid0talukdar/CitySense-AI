"use client";

import { MessageSquare, Brain, ListChecks, Navigation } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: MessageSquare,
    title: "Tell Us What You Need",
    description:
      'Type naturally — "I need biryani under ৳500 for a family dinner" or "Open pharmacy near me"',
    color: "from-blue-500 to-indigo-600",
    example: '"Affordable restaurant under ৳1000 for 5 people"',
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Understands Your Intent",
    description:
      "Our AI extracts budget, preferences, group size, urgency, dietary needs, and more from your query.",
    color: "from-emerald-500 to-teal-600",
    example: "Category: Restaurant • Budget: ৳1000 • Group: 5 • Priority: Affordable",
  },
  {
    step: 3,
    icon: ListChecks,
    title: "Smart Recommendations",
    description:
      "Get ranked results with AI scores and explanations for why each place was recommended.",
    color: "from-purple-500 to-violet-600",
    example: "98% Match • Within Budget • 4.8★ • Family Friendly • Open Now",
  },
  {
    step: 4,
    icon: Navigation,
    title: "Book & Navigate",
    description:
      "Reserve a table, book an appointment, or get directions — all in one seamless experience.",
    color: "from-amber-500 to-orange-600",
    example: "Table for 5 reserved at 7:30 PM • 2.3 km away",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            From natural language to perfect recommendations in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-0.5 bg-gradient-to-r from-slate-200 to-slate-200 dark:from-slate-700 dark:to-slate-700" />
              )}

              <div className="text-center relative">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold mx-auto" style={{ left: "calc(50% + 16px)" }}>
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  {step.example}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
