"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import {
  Brain,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  MapPin,
  Bookmark,
  User,
  AlertTriangle,
} from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-accent-500/30 transition-shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-gradient">CitySense</span>{" "}
              <span className="text-accent-500 text-sm font-medium">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all"
            >
              Explore
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all"
            >
              Categories
            </Link>
            <Link
              href="/emergency"
              className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex items-center gap-1"
            >
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-500" />
              )}
            </button>

            <Link
              href="/explore"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            >
              <Search className="w-4 h-4" />
              AI Search
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-700 mt-2 pt-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary-500" />
                Home
              </Link>
              <Link
                href="/explore"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Search className="w-4 h-4 text-primary-500" />
                Explore
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bookmark className="w-4 h-4 text-primary-500" />
                Categories
              </Link>
              <Link
                href="/emergency"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
