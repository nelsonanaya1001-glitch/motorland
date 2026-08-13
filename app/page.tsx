import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Layers, DollarSign, Phone, Wrench, Zap, ShieldCheck } from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";
import ProductCard from "@/components/ProductCard";

const BRANDS = [
  { name: "BMW", img: "https://motorlandmia.com/cdn/shop/collections/bmw-logo-1997.webp?v=1769059521&width=400" },
  { name: "Chevrolet", img: "https://motorlandmia.com/cdn/shop/collections/unnamed_1.jpg?v=1769060352&width=400" },
  { name: "Mazda", img: "https://motorlandmia.com/cdn/shop/collections/Mazda.webp?v=1769059539&width=400" },
  { name: "Toyota", img: "https://motorlandmia.com/cdn/shop/collections/unnamed_2.jpg?v=1769061874&width=400" },
  { name: "Ford", img: "https://motorlandmia.com/cdn/shop/collections/unnamed_3.jpg?v=1769061961&width=400" },
  { name: "Nissan", img: "https://motorlandmia.com/cdn/shop/collections/2c140d83-5e05-4581-bad6-3ab8c362735f.png?v=1771015890&width=400" },
];

const CATEGORIES = [
  { name: "Wiring", slug: "wiring" },
  { name: "Mirrors", slug: "mirrors" },
  { name: "Headlights", slug: "headlights" },
  { name: "Door Handles", slug: "door-handles" },
  { name: "Bumpers", slug: "bumpers" },
  { name: "Grilles", slug: "grilles" },
  { name: "Radio", slug: "radio" },
  { name: "Engine Parts", slug: "engine" },
];

const VALUES = [
  { icon: Layers, title: "Multi-Brand Selection", desc: "BMW, Chevrolet, Mazda, Toyota, Ford, Nissan and more — all under one roof." },
  { icon: DollarSign, title: "Cost-Effective", desc: "Wholesale pricing for shops and resellers. Save more when you buy in volume." },
  { icon: CheckCircle2, title: "Quality Assured", desc: "Rigorous testing on every part before it leaves our warehouse." },
];

export default async function HomePage() {
  const { items: featured } = await searchEbayItems("auto parts", undefined, 8, 0);

  return (
    <div className="bg-carbon">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Motorland Miami" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-transparent" />
        </div>

        {/* Hazard stripe edge */}
        <div className="hazard absolute left-0 top-0 bottom-0 w-2 z-10 opacity-90" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-10 lg:px-14 py-24 w-full">
          <div className="max-w-2xl">
            <span className="eyebrow mb-5">Auto Parts &amp; Accessories</span>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6 uppercase">
              Quality Parts<br />
              for <span className="text-red-500 text-glow">Every Make</span><br />
              &amp; Model.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-9 leading-relaxed max-w-lg">
              Founded in 2020 — Motorland Miami ships reliable OEM and aftermarket parts straight from Miami, FL.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm transition-all text-sm uppercase tracking-widest glow-red hover:-translate-y-0.5"
              >
                Shop All Parts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/40 hover:border-white bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-sm transition-colors text-sm uppercase tracking-widest"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom stat bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur border-t border-red-600/40 z-10">
          <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-3 gap-4 text-center sm:text-left">
            {[
              { n: "5,000+", l: "Parts in Stock" },
              { n: "EST. 2020", l: "Miami, Florida" },
              { n: "6+", l: "Major Brands" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="font-display text-2xl font-bold text-red-500">{s.n}</span>
                <span className="text-gray-300 text-xs sm:text-sm uppercase tracking-wide">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-14 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-display text-gray-200 text-lg font-semibold uppercase tracking-[0.3em]">Shop by Brand</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href={`/catalog?q=${brand.name.toLowerCase()}`}
                className="group panel hover:bg-red-600 hover:border-red-600 rounded-lg p-5 flex flex-col items-center gap-3 transition-colors duration-200 card-hover"
              >
                <div className="w-14 h-14 relative group-hover:opacity-0 transition-opacity duration-200">
                  <Image src={brand.img} alt={brand.name} fill className="object-contain" unoptimized />
                </div>
                <span className="text-xs font-bold tracking-wide uppercase text-gray-400 group-hover:text-white group-hover:-mt-14 transition-all duration-200">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow mb-3">Browse</p>
            <h2 className="font-display text-5xl font-bold text-white tracking-tight uppercase">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group relative panel hover:border-red-600 rounded-lg px-5 py-8 overflow-hidden card-hover"
              >
                <span className="absolute right-3 top-1 font-display text-7xl font-bold text-white/5 group-hover:text-red-600/20 select-none leading-none transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded bg-red-600/15 text-red-500 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="relative font-display font-semibold text-white text-lg tracking-wide uppercase">{cat.name}</h3>
                <div className="relative mt-1 flex items-center gap-1 text-xs text-red-500 uppercase tracking-widest font-bold">
                  <span>Browse</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 px-4 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Hand-Picked</p>
              <h2 className="font-display text-5xl font-bold text-white tracking-tight uppercase">Featured Parts</h2>
            </div>
            <Link href="/catalog" className="hidden sm:flex items-center gap-2 text-sm font-bold text-white hover:text-red-500 transition-colors uppercase tracking-wider border-b-2 border-red-600 pb-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <ProductCard key={item.itemId} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="hazard absolute top-0 left-0 right-0 h-1.5 opacity-90" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3 justify-center">Why choose us</p>
            <h2 className="font-display text-5xl font-bold text-white tracking-tight uppercase">Built Different.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group panel rounded-xl p-8 hover:border-red-600/60 transition-colors card-hover">
                <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center mb-5 group-hover:glow-red transition-shadow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-white font-semibold text-xl mb-2 uppercase tracking-wide">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Feature strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: Zap, t: "Fast Shipping" },
              { icon: ShieldCheck, t: "Quality Tested" },
              { icon: DollarSign, t: "Wholesale Pricing" },
              { icon: Wrench, t: "Expert Support" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-3 panel-2 rounded-lg px-4 py-3">
                <Icon className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-200 uppercase tracking-wide">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="relative bg-red-600 py-16 px-4 overflow-hidden">
        <div className="hazard absolute inset-0 opacity-10" />
        <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl font-bold text-white tracking-tight uppercase">Ready to find your part?</h2>
            <p className="text-red-100 mt-1">Wholesale pricing available. Call us or browse the full catalog.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="tel:3057169794" className="inline-flex items-center gap-2 bg-white text-red-600 font-black px-6 py-4 rounded-sm hover:bg-gray-100 transition-colors text-sm uppercase tracking-widest">
              <Phone className="w-4 h-4" /> 305 716 9794
            </a>
            <Link href="/catalog" className="inline-flex items-center gap-2 border-2 border-white text-white font-black px-6 py-4 rounded-sm hover:bg-black hover:border-black transition-colors text-sm uppercase tracking-widest">
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
