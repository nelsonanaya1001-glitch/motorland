import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, ChevronRight } from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";

const CATEGORIES = [
  { name: "Engine Parts", slug: "engine", icon: "🔧", desc: "Filters, gaskets, timing, belts" },
  { name: "Brakes", slug: "brakes", icon: "⚙️", desc: "Pads, rotors, calipers, lines" },
  { name: "Suspension", slug: "suspension", icon: "🚗", desc: "Shocks, struts, control arms" },
  { name: "Electrical", slug: "electrical", icon: "⚡", desc: "Batteries, alternators, starters" },
  { name: "Exterior", slug: "exterior", icon: "🎨", desc: "Mirrors, lights, bumpers, trim" },
  { name: "Wheels & Tires", slug: "wheels-tires", icon: "🛞", desc: "Rims, tires, lug nuts, caps" },
  { name: "Interior", slug: "interior", icon: "🪑", desc: "Seats, dash, mats, trim pieces" },
  { name: "Fluids & Oils", slug: "fluids-oils", icon: "🛢️", desc: "Motor oil, coolant, brake fluid" },
];

const TRUST = [
  { icon: Truck, title: "Fast Shipping", desc: "Most orders ship within 1–2 business days" },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "OEM and aftermarket parts, fully tested" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free return policy" },
  { icon: Headphones, title: "Expert Support", desc: "Real mechanics available Mon–Fri" },
];

export default async function HomePage() {
  const { items: featured } = await searchEbayItems("auto parts", undefined, 8, 0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#0f0f0f] py-20 px-4">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#f97316,_transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
              5,000+ Parts In Stock
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              The Parts You Need,<br />
              <span className="text-orange-500">When You Need Them.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Quality OEM and aftermarket auto parts for every make and model. Fast shipping, unbeatable prices, backed by expert support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Shop All Parts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?category=engine"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Browse Engine Parts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-orange-500 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 text-white">
              <Icon className="w-6 h-6 shrink-0 opacity-80" />
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-orange-100">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/products" className="text-orange-400 text-sm flex items-center gap-1 hover:text-orange-300 transition-colors">
              All categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group bg-[#1a1a1a] hover:bg-[#222] border border-white/10 hover:border-orange-500/50 rounded-xl p-5 transition-all"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Parts</h2>
            <Link href="/products" className="text-orange-400 text-sm flex items-center gap-1 hover:text-orange-300 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <Link
                key={item.itemId}
                href={`/products/${item.itemId}`}
                className="group bg-[#1a1a1a] border border-white/10 hover:border-orange-500/40 rounded-xl overflow-hidden transition-all"
              >
                <div className="aspect-square bg-[#222] overflow-hidden">
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
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{item.condition ?? "New"}</p>
                  <h3 className="text-sm font-medium text-white line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-orange-500 font-bold">
                    ${parseFloat(item.price.value).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Can&apos;t find what you need?</h2>
            <p className="text-orange-100 mb-6">Browse our full catalog of 5,000+ parts or contact our team for help finding the right part.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                Browse Full Catalog
              </Link>
              <Link href="#" className="bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-800 transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
