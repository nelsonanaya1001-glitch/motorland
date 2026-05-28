import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Layers, DollarSign, Phone } from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";

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
    <div className="bg-white text-gray-900">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://motorlandmia.com/cdn/shop/files/ChatGPT_Image_Feb_12_2026_at_01_21_10_PM.png?v=1770920517&width=1920"
            alt="Motorland Miami"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Red accent bar left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-10 lg:px-14 py-28 w-full">
          <div className="max-w-[48%] sm:max-w-sm lg:max-w-lg">
            <span className="inline-block border border-red-500 text-red-400 text-[11px] font-bold px-3 py-1 rounded-sm tracking-[0.2em] uppercase mb-5">
              Auto Parts &amp; Accessories
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Quality Parts<br />
              for <span className="text-red-500">Every Make</span><br />
              &amp; Model.
            </h1>
            <p className="text-gray-300 text-base mb-10 leading-relaxed max-w-sm">
              Founded in 2020 — Motorland Miami ships reliable OEM and aftermarket parts straight from Miami, FL.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-sm transition-colors text-sm uppercase tracking-widest"
              >
                Shop All Parts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/50 hover:border-white text-white font-bold px-7 py-3.5 rounded-sm transition-colors text-sm uppercase tracking-widest"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom stat bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm border-t border-white/10 z-10">
          <div className="max-w-7xl mx-auto px-8 py-3 flex gap-8 sm:gap-16 text-sm">
            <div className="text-white"><span className="font-black text-red-500 text-lg">5,000+</span> Parts in Stock</div>
            <div className="text-white"><span className="font-black text-red-500 text-lg">Est.</span> 2020 · Miami, FL</div>
            <div className="hidden sm:block text-white"><span className="font-black text-red-500 text-lg">6</span> Major Brands</div>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gray-200" />
            <h2 className="text-gray-900 text-sm font-bold uppercase tracking-[0.25em]">Shop by Brand</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href={`/catalog?q=${brand.name.toLowerCase()}`}
                className="group bg-white hover:bg-red-600 border border-gray-200 hover:border-red-600 rounded-lg p-4 flex flex-col items-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 relative">
                  <Image src={brand.img} alt={brand.name} fill className="object-contain" unoptimized />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors tracking-wide uppercase">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">Browse</p>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group relative bg-red-600 hover:bg-red-700 rounded-lg px-5 py-8 overflow-hidden transition-all duration-200"
              >
                {/* Number watermark */}
                <span className="absolute right-3 top-2 text-6xl font-black text-white/10 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-bold text-white text-base tracking-wide">{cat.name}</h3>
                <div className="relative mt-2 flex items-center gap-1 text-xs text-red-200">
                  <span>Browse</span> <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">Hand-Picked</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Featured Parts</h2>
            </div>
            <Link href="/catalog" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-red-600 transition-colors uppercase tracking-wider border-b-2 border-gray-900 hover:border-red-600 pb-0.5">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <Link
                key={item.itemId}
                href={`/catalog/${item.itemId}`}
                className="group bg-white border border-gray-100 hover:border-red-500 hover:shadow-xl rounded-xl overflow-hidden transition-all duration-200"
              >
                <div className="aspect-square bg-gray-50 overflow-hidden relative">
                  {item.image?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🔧</div>
                  )}
                  {item.condition && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-sm">
                      {item.condition}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 font-black text-lg">${parseFloat(item.price.value).toFixed(2)}</p>
                    <button className="text-xs font-bold bg-gray-900 group-hover:bg-red-600 text-white px-3 py-1.5 rounded-sm transition-colors uppercase tracking-wide">
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="py-20 px-4 bg-[#111] relative overflow-hidden">
        {/* Red glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-red-600" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Why choose us</p>
            <h2 className="text-4xl font-black text-white tracking-tight">Built Different.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-600/50 transition-colors">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-red-600 py-14 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Ready to find your part?</h2>
            <p className="text-red-100 mt-1">Wholesale pricing available. Call us or browse the full catalog.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:3057169794"
              className="inline-flex items-center gap-2 bg-white text-red-600 font-black px-6 py-3.5 rounded-sm hover:bg-gray-100 transition-colors text-sm uppercase tracking-widest"
            >
              <Phone className="w-4 h-4" /> 305 716 9794
            </a>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-black px-6 py-3.5 rounded-sm hover:bg-white hover:text-red-600 transition-colors text-sm uppercase tracking-widest"
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
