"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How does CitySense AI understand my search?",
    a: "Our AI uses Natural Language Processing to extract your intent, budget, preferences, group size, urgency, dietary requirements, and more from your query. It then uses a weighted recommendation algorithm to find the best matches.",
  },
  {
    q: "Is CitySense AI free to use?",
    a: "Yes! CitySense AI is completely free for all users. We offer premium features for business partners who want enhanced visibility and analytics.",
  },
  {
    q: "How accurate are the AI recommendations?",
    a: "Our recommendation engine considers 7+ factors including intent match (40%), budget (20%), rating (15%), distance (10%), availability (5%), popularity (5%), and partner status (5%). Each recommendation includes an explanation of why it was chosen.",
  },
  {
    q: "Can I book a table or appointment through CitySense?",
    a: "Yes! You can reserve tables at restaurants, book hotel rooms, schedule clinic appointments, and book salon slots directly through our platform.",
  },
  {
    q: "What is Emergency Mode?",
    a: "Emergency Mode is a quick-access feature that immediately finds the nearest open hospitals, pharmacies, clinics, and emergency services. It prioritizes availability and proximity.",
  },
  {
    q: "How can my business join CitySense AI?",
    a: "Business owners can register through our Partner Dashboard. You can manage your business profile, menu, products, offers, opening hours, and more. Premium partnerships offer additional benefits like priority recommendations.",
  },
  {
    q: "Does the premium partner status guarantee top placement?",
    a: "No. Premium partners receive a small ranking boost, but AI always prioritizes user satisfaction. A premium business will never appear first if it doesn't match the user's requirements. Relevance always comes first.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-slate-900 dark:text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
