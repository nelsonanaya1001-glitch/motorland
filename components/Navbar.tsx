"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X, User, Truck } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

const EBAY_STORE = "https://www.ebay.com/str/motorlandmiami";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Ticker */}
      <div className="bg-red-600 text-white text-xs font-semibold overflow-hidden">
        <div className="marquee-track py-2">
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center gap-8 pr-8 uppercase tracking-wider">
              <span className="flex items-center gap-2"><Truck className="w-3.5 h-3.5" /> Free shipping on orders over $75</span>
              <span>·</span>
              <span>Wholesale pricing for shops &amp; resellers</span>
              <span>·</span>
              <span>Call us: 305 716 9794</span>
              <span>·</span>
              <span>5,000+ parts in stock · Miami, FL</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-[#0d0d10]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <span className="relative">
                <Image src="/logo.jpg" alt="Motorland Miami" width={52} height={52} className="rounded-full object-cover ring-2 ring-red-600/70 w-[52px] h-[52px]" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-2xl font-bold tracking-wide text-white">MOTORLAND</span>
                <span className="block text-[11px] font-bold text-red-500 tracking-[0.35em] uppercase mt-0.5">Miami</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-9 text-sm font-bold uppercase tracking-widest text-gray-300">
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link hover:text-white transition-colors ${pathname === l.href ? "active text-white" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-300 hover:text-red-500 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <a
                href={EBAY_STORE}
                target="_blank"
                rel="noopener noreferrer"
                title="Your account / orders on eBay"
                className="p-2.5 text-gray-300 hover:text-red-500 transition-colors hidden sm:block"
              >
                <User className="w-5 h-5" />
              </a>
              <Link href="/cart" className="relative p-2.5 text-gray-300 hover:text-red-500 transition-colors" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-[#0d0d10]">
                    {count}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden p-2.5 text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <form action="/catalog" className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="search"
                  name="q"
                  autoFocus
                  placeholder="Search by part name, make, model, year..."
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </form>
            </div>
          )}

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-1 text-sm font-bold uppercase tracking-widest text-gray-300 border-t border-white/10 pt-3">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-2 hover:text-red-500 transition-colors">
                  {l.label}
                </Link>
              ))}
              <a href={EBAY_STORE} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-red-500 transition-colors">
                My eBay Account
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
