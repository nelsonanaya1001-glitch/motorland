import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { searchEbayItems } from "@/lib/ebay";

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
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <div className="bg-[#111] border-b border-white/10 py-10 px-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />
        <div className="max-w-7xl mx-auto pl-4">
          <nav className="text-xs text-gray-500 mb-3 flex gap-1">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">{activeLabel}</span>
          </nav>
          <h1 className="text-4xl font-black text-white tracking-tight">{activeLabel}</h1>
          <p className="text-gray-400 text-sm mt-1">{total.toLocaleString()} parts available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-36 space-y-6">
              {/* Availability */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Availability</h3>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-red-600 w-4 h-4" />
                  In stock
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="accent-red-600 w-4 h-4" />
                  Out of stock
                </label>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Category</h3>
                <ul className="space-y-0.5">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.value}>
                      <Link
                        href={cat.value ? `/catalog?category=${cat.value}` : "/catalog"}
                        className={`block text-sm px-2 py-1.5 rounded transition-colors ${
                          category === cat.value
                            ? "bg-red-50 text-red-600 font-semibold"
                            : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
                        }`}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Price</h3>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="$Min"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-red-500"
                  />
                  <span className="text-gray-400 shrink-0">—</span>
                  <input
                    type="number"
                    placeholder="$Max"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <button className="text-xs text-red-600 hover:underline">Clear all filters</button>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Sort + mobile filters */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex gap-2 overflow-x-auto no-scrollbar lg:hidden pb-1">
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.value}
                    href={cat.value ? `/catalog?category=${cat.value}` : "/catalog"}
                    className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      category === cat.value
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600"
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <select className="border border-gray-300 text-sm text-gray-700 rounded-md px-3 py-1.5 focus:outline-none focus:border-red-500 bg-white">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <p className="text-lg mb-2">No parts found.</p>
                <Link href="/catalog" className="text-red-600 hover:underline text-sm">Clear filters</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Link
                    key={item.itemId}
                    href={`/catalog/${item.itemId}`}
                    className="group bg-white border border-gray-200 hover:border-red-500 hover:shadow-md rounded-xl overflow-hidden transition-all"
                  >
                    <div className="aspect-square bg-gray-50 overflow-hidden">
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
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-red-600 font-bold">
                          ${parseFloat(item.price.value).toFixed(2)}
                        </p>
                        <div className="flex gap-1">
                          <button className="text-xs border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-2 py-1 rounded transition-colors">
                            Choose
                          </button>
                          <button className="text-xs bg-gray-900 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
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
                    href={`/catalog?${new URLSearchParams({ ...(category && { category }), page: String(page - 1) })}`}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                <span className="text-sm text-gray-500 px-2">Page {page} of {totalPages}</span>
                {page < totalPages && (
                  <Link
                    href={`/catalog?${new URLSearchParams({ ...(category && { category }), page: String(page + 1) })}`}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors"
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
