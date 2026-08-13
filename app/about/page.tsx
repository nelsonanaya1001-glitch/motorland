import Link from "next/link";
import { ArrowRight, MapPin, Truck, ShieldCheck, DollarSign, Layers, Phone } from "lucide-react";

export const metadata = {
  title: "About Us — Motorland Miami",
  description: "Family-run auto parts supplier in Miami since 2020. OEM and aftermarket parts for every make and model.",
};

const STATS = [
  { n: "5,000+", l: "Parts in stock" },
  { n: "2020", l: "Established" },
  { n: "6+", l: "Major brands" },
  { n: "1–2 Days", l: "Ship time" },
];

const VALUES = [
  { icon: Layers, title: "Multi-Brand Selection", desc: "BMW, Chevrolet, Mazda, Toyota, Ford, Nissan and more — all under one roof." },
  { icon: DollarSign, title: "Wholesale Pricing", desc: "Better prices for shops and resellers. The more you buy, the more you save." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every part is inspected and tested before it leaves our Miami warehouse." },
  { icon: Truck, title: "Fast Shipping", desc: "Most orders ship within 1–2 business days, straight from Miami, FL." },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero band */}
      <section className="relative overflow-hidden min-h-[360px] flex items-center bg-[#1a0a0a]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Motorland Miami" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 w-full">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">About Motorland Miami</h1>
          <p className="text-gray-300 max-w-xl leading-relaxed">
            A family-run auto parts supplier shipping reliable OEM and aftermarket parts across the country from Miami, Florida.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-soft border-b border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-black text-red-600">{s.n}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">Who we are</p>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-6">Parts you can trust, prices you&apos;ll love.</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Motorland Miami started in 2020 with a simple goal: make it easy to find quality auto parts
              for every make and model without paying dealership prices. What began as a small operation has
              grown into a catalog of thousands of OEM and aftermarket parts.
            </p>
            <p>
              We work with shops, resellers, and everyday drivers alike — offering wholesale pricing on volume
              orders and personal support when you need help finding the exact part for your vehicle. Every part
              is inspected before it ships, so you know it&apos;s ready to install.
            </p>
            <p className="flex items-center gap-2 text-gray-700 font-medium">
              <MapPin className="w-4 h-4 text-red-600" /> Proudly based in Miami, Florida.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-grid">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-10 text-center">Why customers choose us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-500 card-lift hover:shadow-md">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 py-14 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Have a question?</h2>
            <p className="text-red-100 mt-1">We&apos;re here to help you find the right part.</p>
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
