import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Layers, DollarSign } from "lucide-react";
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
  { name: "Wiring", slug: "wiring", emoji: "🔌" },
  { name: "Mirrors", slug: "mirrors", emoji: "🪞" },
  { name: "Headlights", slug: "headlights", emoji: "💡" },
  { name: "Door Handles", slug: "door-handles", emoji: "🚪" },
  { name: "Bumpers", slug: "bumpers", emoji: "🚗" },
  { name: "Grilles", slug: "grilles", emoji: "⬛" },
  { name: "Radio", slug: "radio", emoji: "📻" },
  { name: "Engine Parts", slug: "engine", emoji: "🔧" },
];

const VALUES = [
  {
    icon: Layers,
    title: "Multi-Brand Selection",
    desc: "We carry parts for BMW, Chevrolet, Mazda, Toyota, Ford, Nissan, and many more — all in one place.",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective Solutions",
    desc: "Wholesale pricing available for shops and resellers. Save more when you buy in bulk.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance",
    desc: "Every part goes through rigorous testing standards so you can install with confidence.",
  },
];

export default async function HomePage() {
  const { items: featured } = await searchEbayItems("auto parts", undefined, 8, 0);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://motorlandmia.com/cdn/shop/files/ChatGPT_Image_Feb_12_2026_at_01_21_10_PM.png?v=1770920517&width=1920"
            alt="Motorland Miami hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-[45%] sm:max-w-sm lg:max-w-md">
            <p className="text-red-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Auto Parts &amp; Accessories
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Quality Parts for<br />
              <span className="text-red-500">Every Make &amp; Model</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Founded in 2020, Motorland Miami delivers reliable, affordable OEM and aftermarket parts — shipped fast from Miami.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-md transition-colors text-sm uppercase tracking-wide"
              >
                Shop All Parts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-3.5 rounded-md transition-colors text-sm uppercase tracking-wide"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Shop by Brand</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Find parts for your specific make</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href={`/catalog?q=${brand.name.toLowerCase()}`}
                className="group bg-white border border-gray-200 hover:border-red-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center gap-3 transition-all"
              >
                <div className="w-16 h-16 relative">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-red-600 transition-colors">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Browse our most popular part types</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group bg-gray-50 hover:bg-red-600 border border-gray-200 hover:border-red-600 rounded-xl p-6 text-center transition-all"
              >
                <span className="text-4xl mb-3 block">{cat.emoji}</span>
                <h3 className="font-semibold text-gray-800 group-hover:text-white transition-colors text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Parts</h2>
              <p className="text-gray-500 text-sm mt-1">Hand-picked from our catalog</p>
            </div>
            <Link href="/catalog" className="inline-flex items-center gap-1 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <Link
                key={item.itemId}
                href={`/catalog/${item.itemId}`}
                className="group bg-white border border-gray-200 hover:border-red-500 hover:shadow-lg rounded-xl overflow-hidden transition-all"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
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
                  {item.condition && (
                    <span className="inline-block text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded px-1.5 py-0.5 mb-2">
                      {item.condition}
                    </span>
                  )}
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 font-bold text-base">
                      ${parseFloat(item.price.value).toFixed(2)}
                    </p>
                    <button className="text-xs bg-gray-900 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors font-medium">
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Why Motorland Miami?</h2>
          <p className="text-gray-400 text-sm text-center mb-12">Built with one goal — to make quality parts accessible.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600 rounded-xl mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-red-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to find your part?</h2>
          <p className="text-red-100 mb-8 text-lg">
            Over 5,000 items available. Wholesale pricing for shops &amp; resellers.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-3.5 rounded-md transition-colors text-sm uppercase tracking-wide"
          >
            Browse Full Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
