"use client";

import Link from "next/link";
import { Brain, Mail, Phone, MapPin, Globe, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">CitySense AI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              AI-powered local discovery platform that helps you find the perfect places
              based on your preferences, budget, and needs.
            </p>
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-300">
              Discover
            </h3>
            <ul className="space-y-3">
              {["Restaurants", "Cafes", "Pharmacies", "Hotels", "Shopping", "Hospitals"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/explore?category=${item.toLowerCase()}`}
                    className="text-slate-400 text-sm hover:text-accent-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-300">
              Platform
            </h3>
            <ul className="space-y-3">
              {["AI Search", "Categories", "Emergency Services", "Partner Dashboard", "About Us", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-slate-400 text-sm hover:text-accent-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-300">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-accent-400" />
                hello@citysense.ai
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-accent-400" />
                +880-2-1234567
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-accent-400" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 CitySense AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-500 text-sm hover:text-slate-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-slate-500 text-sm hover:text-slate-400 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
