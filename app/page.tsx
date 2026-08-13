import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2, Layers, DollarSign, Phone,
  Cable, Aperture, Lightbulb, DoorOpen, Shield, LayoutGrid, Radio, Cog,
} from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";
import AddToCart from "@/components/AddToCart";

const BRANDS = [
  { name: "BMW", img: "https://motorlandmia.com/cdn/shop/collections/bmw-logo-1997.webp?v=1769059521&width=400" },
  { name: "Chevrolet", img: "https://motorlandmia.com/cdn/shop/collections/unnamed_1.jpg?v=1769060352&width=400" },
  { name: "Mazda", img: "https://motorlandmia.com/cdn/shop/collections/Mazda.webp?v=1769059539&width=400" },
  { name: "Toyota", img: "https://motorlandmia.com/cdn/shop/collections/unnamed_2.jpg?v=1769061874&width=400" },
  { name: "Ford", img: "https://motorlandmia.com/cdn/shop/collections/unnamed_3.jpg?v=1769061961&width=400" },
  { name: "Nissan", img: "https://motorlandmia.com/cdn/shop/collections/2c140d83-5e05-4581-bad6-3ab8c362735f.png?v=1771015890&width=400" },
];

const CATEGORIES = [
  { name: "Wiring", slug: "wiring", icon: Cable },
  { name: "Mirrors", slug: "mirrors", icon: Aperture },
  { name: "Headlights", slug: "headlights", icon: Lightbulb },
  { name: "Door Handles", slug: "door-handles", icon: DoorOpen },
  { name: "Bumpers", slug: "bumpers", icon: Shield },
  { name: "Grilles", slug: "grilles", icon: LayoutGrid },
  { name: "Radio", slug: "radio", icon: Radio },
  { name: "Engine Parts", slug: "engine", icon: Cog },
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
      <section className="relative overflow-hidden min-h-[600px] flex items-center bg-[#1a0a0a]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Motorland Miami" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

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
              <Link href="/catalog" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-sm transition-colors text-sm uppercase tracking-widest">
                Shop All Parts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/50 hover:border-white text-white font-bold px-7 py-3.5 rounded-sm transition-colors text-sm uppercase tracking-widest">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm border-t border-white/10 z-10">
          <div className="max-w-7xl mx-auto px-8 py-3 flex gap-8 sm:gap-16 text-sm">
            <div className="text-white"><span className="font-black text-red-500 text-lg">5,000+</span> Parts in Stock</div>
            <div className="text-white"><span className="font-black text-red-500 text-lg">Est.</span> 2020 · Miami, FL</div>
            <div className="hidden sm:block text-white"><span className="font-black text-red-500 text-lg">6</span> Major Brands</div>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="bg-soft py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gray-200" />
            <h2 className="text-gray-900 text-sm font-bold uppercase tracking-[0.25em]">Shop by Brand</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href={`/catalog?q=${brand.name.toLowerCase()}`}
                className="group relative h-[120px] bg-white hover:bg-red-600 border border-gray-200 hover:border-red-600 rounded-lg flex flex-col items-center justify-center gap-3 card-lift shadow-sm hover:shadow-md overflow-hidden"
              >
                <div className="w-14 h-14 relative group-hover:opacity-0 transition-opacity duration-200">
                  <Image src={brand.img} alt={brand.name} fill className="object-contain" unoptimized />
                </div>
                <span className="text-xs font-bold tracking-wide uppercase text-gray-500 group-hover:opacity-0 transition-opacity duration-200">{brand.name}</span>
                <span className="absolute inset-0 flex items-center justify-center gap-1.5 text-white font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Shop Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}

            {/* Shop All tab */}
            <Link
              href="/catalog"
              className="group h-[120px] bg-gray-900 hover:bg-red-600 border border-gray-900 hover:border-red-600 rounded-lg flex flex-col items-center justify-center gap-2 card-lift text-white shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Shop All</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20 px-4 bg-grid">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">Browse</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
            </div>
            <Link href="/catalog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-red-600 transition-colors uppercase tracking-wider">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group flex items-center gap-4 bg-white border border-gray-200 hover:border-red-500 rounded-xl p-4 card-lift hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-red-600 flex items-center justify-center text-gray-700 group-hover:text-white transition-colors shrink-0">
                  <cat.icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition-colors truncate">{cat.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    Shop now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 px-4 bg-soft">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((item) => (
              <div key={item.itemId} className="group bg-white border border-gray-200 hover:border-red-500 rounded-2xl overflow-hidden card-lift hover:shadow-xl flex flex-col">
                <Link href={`/catalog/${item.itemId}`} className="block relative">
                  <div className="aspect-square bg-white overflow-hidden flex items-center justify-center p-4 border-b border-gray-100">
                    {item.image?.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🔧</div>
                    )}
                  </div>
                  {item.condition && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                      {item.condition}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded">
                    View
                  </span>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/catalog/${item.itemId}`}>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                    <p className="text-red-600 font-black text-xl">${parseFloat(item.price.value).toFixed(2)}</p>
                    <AddToCart
                      label="Add"
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-900 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors uppercase tracking-wide"
                      product={{
                        itemId: item.itemId,
                        title: item.title,
                        price: parseFloat(item.price.value),
                        currency: item.price.currency,
                        image: item.image?.imageUrl,
                        itemWebUrl: item.itemWebUrl,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (photographic) ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/85" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Why choose us</p>
            <h2 className="text-4xl font-black text-white tracking-tight">Built Different.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-red-500/50 hover:bg-white/10 transition-colors card-lift">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-red-600/30">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { n: "5,000+", l: "Parts in stock" },
              { n: "1–2 Days", l: "Fast shipping" },
              { n: "30-Day", l: "Easy returns" },
              { n: "Est. 2020", l: "Miami, FL" },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl px-4 py-5 text-center">
                <p className="text-2xl font-black text-red-500">{s.n}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide mt-1">{s.l}</p>
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
            <a href="tel:3057169794" className="inline-flex items-center gap-2 bg-white text-red-600 font-black px-6 py-3.5 rounded-sm hover:bg-gray-100 transition-colors text-sm uppercase tracking-widest">
              <Phone className="w-4 h-4" /> 305 716 9794
            </a>
            <Link href="/catalog" className="inline-flex items-center gap-2 border-2 border-white text-white font-black px-6 py-3.5 rounded-sm hover:bg-white hover:text-red-600 transition-colors text-sm uppercase tracking-widest">
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
