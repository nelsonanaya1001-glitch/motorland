import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = [
  { label: "All Parts", value: "" },
  { label: "Wiring", value: "wiring" },
  { label: "Mirrors", value: "mirrors" },
  { label: "Headlights", value: "headlights" },
  { label: "Door Handles", value: "door-handles" },
  { label: "Bumpers", value: "bumpers" },
  { label: "Grilles", value: "grilles" },
  { label: "Radio", value: "radio" },
  { label: "Engine Parts", value: "engine" },
  { label: "Suspension", value: "suspension" },
  { label: "Brakes", value: "brakes" },
  { label: "Electrical", value: "electrical" },
  { label: "Interior", value: "interior" },
  { label: "Wheels & Tires", value: "wheels-tires" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "best_selling" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "A–Z", value: "az" },
  { label: "Z–A", value: "za" },
];

interface Props {
  searchParams: Promise<{ category?: string; sort?: string; page?: string; q?: string }>;
}

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category ?? "";
  const query = params.q ?? "auto parts";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const limit = 24;
  const offset = (page - 1) * limit;

  const { items, total } = await searchEbayItems(query, category || undefined, limit, offset);
  const totalPages = Math.ceil(total / limit);

  const activeLabel = CATEGORIES.find((c) => c.value === category)?.label ?? "All Parts";

  return (
    <div className="bg-carbon min-h-screen">
      {/* Page header */}
      <div className="relative bg-black/40 border-b border-white/10 py-12 px-4 overflow-hidden">
        <div className="hazard absolute left-0 top-0 bottom-0 w-2 opacity-90" />
        <div className="max-w-7xl mx-auto pl-4">
          <nav className="text-xs text-gray-500 mb-3 flex gap-1 uppercase tracking-widest">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">{activeLabel}</span>
          </nav>
          <h1 className="font-display text-5xl font-bold text-white tracking-tight uppercase">{activeLabel}</h1>
          <p className="text-gray-400 text-sm mt-1">{total.toLocaleString()} parts available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-6 panel rounded-xl p-5">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Availability</h3>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 cursor-pointer hover:text-gray-200">
                  <input type="checkbox" defaultChecked className="accent-red-600 w-4 h-4" /> In stock
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                  <input type="checkbox" className="accent-red-600 w-4 h-4" /> Out of stock
                </label>
              </div>

              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Category</h3>
                <ul className="space-y-0.5">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.value}>
                      <Link
                        href={cat.value ? `/catalog?category=${cat.value}` : "/catalog"}
                        className={`block text-sm px-2 py-1.5 rounded transition-colors ${
                          category === cat.value
                            ? "bg-red-600 text-white font-semibold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Price</h3>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="$Min" className="w-full bg-white/5 border border-white/15 rounded px-2 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500" />
                  <span className="text-gray-500 shrink-0">—</span>
                  <input type="number" placeholder="$Max" className="w-full bg-white/5 border border-white/15 rounded px-2 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500" />
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex gap-2 overflow-x-auto no-scrollbar lg:hidden pb-1">
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.value}
                    href={cat.value ? `/catalog?category=${cat.value}` : "/catalog"}
                    className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      category === cat.value
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-white/20 text-gray-400 hover:border-red-500 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <select className="bg-[#141519] border border-white/15 text-sm text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-red-500">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <p className="text-lg mb-2">No parts found.</p>
                <Link href="/catalog" className="text-red-500 hover:underline text-sm">Clear filters</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ProductCard key={item.itemId} item={item} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                {page > 1 && (
                  <Link
                    href={`/catalog?${new URLSearchParams({ ...(category && { category }), page: String(page - 1) })}`}
                    className="px-4 py-2 panel rounded-md text-sm text-gray-300 hover:border-red-500 hover:text-white transition-colors"
                  >
                    Previous
                  </Link>
                )}
                <span className="text-sm text-gray-500 px-2">Page {page} of {totalPages}</span>
                {page < totalPages && (
                  <Link
                    href={`/catalog?${new URLSearchParams({ ...(category && { category }), page: String(page + 1) })}`}
                    className="px-4 py-2 panel rounded-md text-sm text-gray-300 hover:border-red-500 hover:text-white transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
