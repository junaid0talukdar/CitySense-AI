import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AIChatAssistant from "@/components/AIChatAssistant";

export const metadata: Metadata = {
  title: "CitySense AI - AI-Powered Smart Local Discovery",
  description:
    "Discover the best nearby restaurants, pharmacies, shops, and services with AI-powered recommendations based on your preferences, budget, and needs.",
  keywords: "AI, local discovery, restaurants, pharmacies, smart recommendations",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
          <AIChatAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
