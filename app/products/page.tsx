import Link from "next/link";
import { Filter, SlidersHorizontal } from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";

const CATEGORIES = [
  { label: "All Parts", value: "" },
  { label: "Engine Parts", value: "engine" },
  { label: "Brakes", value: "brakes" },
  { label: "Suspension", value: "suspension" },
  { label: "Electrical", value: "electrical" },
  { label: "Exterior", value: "exterior" },
  { label: "Wheels & Tires", value: "wheels-tires" },
  { label: "Interior", value: "interior" },
  { label: "Fluids & Oils", value: "fluids-oils" },
];

const SORT_OPTIONS = [
  { label: "Best Match", value: "best_match" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
];

interface Props {
  searchParams: Promise<{ category?: string; sort?: string; page?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const query = params.q ?? "auto parts";
  const limit = 24;
  const offset = (page - 1) * limit;

  const { items, total } = await searchEbayItems(query, category || undefined, limit, offset);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {CATEGORIES.find((c) => c.value === category)?.label ?? "All Parts"}
        </h1>
        <p className="text-gray-500 text-sm">{total.toLocaleString()} results</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 sticky top-20">
            <div className="flex items-center gap-2 text-sm font-semibold mb-4 text-white">
              <Filter className="w-4 h-4" /> Filters
            </div>

            {/* Categories */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Category</p>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.value}>
                    <Link
                      href={cat.value ? `/products?category=${cat.value}` : "/products"}
                      className={`block text-sm px-2 py-1.5 rounded-md transition-colors ${
                        category === cat.value
                          ? "bg-orange-500/20 text-orange-400 font-medium"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price range (UI only) */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Price Range</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full bg-white/10 border border-white/10 rounded-md px-2 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full bg-white/10 border border-white/10 rounded-md px-2 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4 gap-4">
            {/* Mobile category pills */}
            <div className="flex gap-2 overflow-x-auto lg:hidden pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  href={cat.value ? `/products?category=${cat.value}` : "/products"}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    category === cat.value
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-white/20 text-gray-400 hover:border-orange-500/50 hover:text-white"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <select className="bg-[#1a1a1a] border border-white/10 text-sm text-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-orange-500">
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product grid */}
          {items.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-lg">No parts found.</p>
              <Link href="/products" className="text-orange-400 hover:underline text-sm mt-2 inline-block">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item) => (
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
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-1">{item.condition ?? "New"}</p>
                    <h3 className="text-sm font-medium text-white line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-orange-500 font-bold text-sm">
                      ${parseFloat(item.price.value).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={`/products?${new URLSearchParams({ ...(category && { category }), page: String(page - 1) })}`}
                  className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm hover:border-orange-500/50 transition-colors"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/products?${new URLSearchParams({ ...(category && { category }), page: String(page + 1) })}`}
                  className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm hover:border-orange-500/50 transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
