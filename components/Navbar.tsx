"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Wrench } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#111111] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-orange-500 rounded-md p-1.5">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              MOTOR<span className="text-orange-500">LAND</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/products" className="hover:text-orange-400 transition-colors">All Parts</Link>
            <Link href="/products?category=engine" className="hover:text-orange-400 transition-colors">Engine</Link>
            <Link href="/products?category=brakes" className="hover:text-orange-400 transition-colors">Brakes</Link>
            <Link href="/products?category=suspension" className="hover:text-orange-400 transition-colors">Suspension</Link>
            <Link href="/products?category=electrical" className="hover:text-orange-400 transition-colors">Electrical</Link>
            <Link href="/products?category=exterior" className="hover:text-orange-400 transition-colors">Exterior</Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3">
            <input
              type="search"
              autoFocus
              placeholder="Search for parts, brands, part numbers..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 text-sm font-medium text-gray-300">
            <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-orange-400 transition-colors">All Parts</Link>
            <Link href="/products?category=engine" onClick={() => setMenuOpen(false)} className="hover:text-orange-400 transition-colors">Engine</Link>
            <Link href="/products?category=brakes" onClick={() => setMenuOpen(false)} className="hover:text-orange-400 transition-colors">Brakes</Link>
            <Link href="/products?category=suspension" onClick={() => setMenuOpen(false)} className="hover:text-orange-400 transition-colors">Suspension</Link>
            <Link href="/products?category=electrical" onClick={() => setMenuOpen(false)} className="hover:text-orange-400 transition-colors">Electrical</Link>
            <Link href="/products?category=exterior" onClick={() => setMenuOpen(false)} className="hover:text-orange-400 transition-colors">Exterior</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
