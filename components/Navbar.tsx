"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-[#111111] text-white text-xs py-2 px-4 text-center">
        Free shipping on orders over $75 &nbsp;|&nbsp; Call us: <a href="tel:3057169794" className="font-semibold hover:text-red-400 transition-colors">305 716 9794</a>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.jpg"
                alt="Motorland Miami"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div className="leading-tight">
                <span className="block text-xl font-extrabold tracking-tight text-[#111]">MOTORLAND</span>
                <span className="block text-sm font-semibold text-red-600 tracking-widest uppercase">Miami</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <Link href="/catalog" className="hover:text-red-600 transition-colors">Catalog</Link>
              <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="#" className="p-2 text-gray-500 hover:text-red-600 transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="relative p-2 text-gray-500 hover:text-red-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </Link>
              <button
                className="md:hidden p-2 text-gray-500 hover:text-red-600 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search by part name, make, model, year..."
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-4 text-sm font-semibold text-gray-700 border-t border-gray-100 pt-4">
              <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-red-600 transition-colors">Home</Link>
              <Link href="/catalog" onClick={() => setMenuOpen(false)} className="hover:text-red-600 transition-colors">Catalog</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-red-600 transition-colors">Contact</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
