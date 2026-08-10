"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import {
  AlertTriangle,
  Hospital,
  Pill,
  Stethoscope,
  Phone,
  Flame,
  Shield,
  Siren,
  MapPin,
  Clock,
  Navigation,
  type LucideIcon,
} from "lucide-react";
import type { BusinessResult } from "@/lib/types";

interface EmergencyService {
  name: string;
  icon: LucideIcon;
  color: string;
  phone: string;
  description: string;
  searchQuery: string;
}

const emergencyServices: EmergencyService[] = [
  {
    name: "Hospital",
    icon: Hospital,
    color: "#dc2626",
    phone: "999",
    description: "Find nearest hospitals with emergency services",
    searchQuery: "emergency hospital",
  },
  {
    name: "Pharmacy",
    icon: Pill,
    color: "#ef4444",
    phone: "N/A",
    description: "Find pharmacies open right now",
    searchQuery: "open pharmacy now",
  },
  {
    name: "Clinic",
    icon: Stethoscope,
    color: "#e11d48",
    phone: "N/A",
    description: "Find nearby clinics and medical centers",
    searchQuery: "nearby clinic",
  },
  {
    name: "Ambulance",
    icon: Siren,
    color: "#b91c1c",
    phone: "199",
    description: "Call ambulance service immediately",
    searchQuery: "ambulance emergency",
  },
  {
    name: "Fire Service",
    icon: Flame,
    color: "#ea580c",
    phone: "199",
    description: "Report fire emergencies",
    searchQuery: "fire service",
  },
  {
    name: "Police",
    icon: Shield,
    color: "#1d4ed8",
    phone: "999",
    description: "Contact police for emergencies",
    searchQuery: "police station",
  },
];

export default function EmergencyPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleServiceClick = async (service: EmergencyService) => {
    setActiveService(service.name);
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(service.searchQuery)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Emergency Header */}
        <div className="bg-gradient-to-b from-red-900 to-red-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/30 border border-red-400/30 text-white text-sm font-semibold mb-4 pulse-glow">
              <AlertTriangle className="w-4 h-4" />
              Emergency Mode Active
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              🚨 Emergency Services
            </h1>
            <p className="text-red-200 max-w-2xl mx-auto">
              Quickly find the nearest hospitals, pharmacies, clinics, and emergency contacts.
              Our AI prioritizes availability and proximity for emergency situations.
            </p>
          </div>
        </div>

        {/* Emergency Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {emergencyServices.map((service) => (
              <button
                key={service.name}
                onClick={() => handleServiceClick(service)}
                className={`group rounded-2xl p-5 text-center card-hover border-2 transition-all ${
                  activeService === service.name
                    ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                    : "border-transparent glass-card dark:bg-slate-800/50 dark:border-slate-700"
                }`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: service.color + "15" }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                  {service.name}
                </h3>
                {service.phone !== "N/A" && (
                  <p className="text-xs text-red-500 font-bold">{service.phone}</p>
                )}
              </button>
            ))}
          </div>

          {/* Emergency Hotlines */}
          <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-500" />
              Emergency Hotlines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "National Emergency", number: "999", desc: "Police, Fire, Ambulance" },
                { name: "Ambulance", number: "199", desc: "Medical Emergency" },
                { name: "Fire Service", number: "199", desc: "Fire Emergency" },
                { name: "RAB Hotline", number: "01234567890", desc: "Rapid Action Battalion" },
                { name: "Women Helpline", number: "10921", desc: "Violence against women" },
                { name: "Child Helpline", number: "1098", desc: "Child protection" },
              ].map((hotline) => (
                <div
                  key={hotline.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">
                      {hotline.name}
                    </p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                      {hotline.number}
                    </p>
                    <p className="text-xs text-slate-500">{hotline.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="h-48 shimmer" />
                  <div className="p-5 space-y-3 bg-white dark:bg-slate-800">
                    <div className="h-6 shimmer rounded-lg w-3/4" />
                    <div className="h-4 shimmer rounded-lg w-1/2" />
                    <div className="h-10 shimmer rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
                Nearby {activeService} Services ({results.length} found)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
