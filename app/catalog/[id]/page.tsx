import Link from "next/link";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw, Star, Package } from "lucide-react";
import { getEbayItem, searchEbayItems } from "@/lib/ebay";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const item = await getEbayItem(id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Part not found</h1>
        <Link href="/catalog" className="text-red-600 hover:underline">Back to catalog</Link>
      </div>
    );
  }

  const { items: related } = await searchEbayItems("auto parts", undefined, 4, 0);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-red-600 transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="aspect-square bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            {item.image?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🔧</div>
            )}
          </div>

          {/* Details */}
          <div>
            {item.condition && (
              <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1 mb-4">
                {item.condition}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">{item.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
              ))}
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>

            <div className="text-4xl font-extrabold text-red-600 mb-6">
              ${parseFloat(item.price.value).toFixed(2)}
              <span className="text-base font-normal text-gray-400 ml-2">{item.price.currency}</span>
            </div>

            {item.categories?.[0] && (
              <p className="text-sm text-gray-500 mb-6">
                Category: <span className="text-gray-800 font-medium">{item.categories[0].categoryName}</span>
              </p>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-8">
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-20 border border-gray-300 rounded-md px-3 py-3 text-sm text-gray-800 text-center focus:outline-none focus:border-red-500"
              />
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            {/* Trust signals */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="w-5 h-5 text-red-600 shrink-0" />
                Fast shipping — most orders ship within 1–2 business days
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Package className="w-5 h-5 text-red-600 shrink-0" />
                Wholesale pricing available for shops &amp; resellers
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RefreshCw className="w-5 h-5 text-red-600 shrink-0" />
                30-day hassle-free returns
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
                Quality guaranteed — every part tested before shipping
              </div>
            </div>

            {item.itemWebUrl && item.itemWebUrl !== "#" && (
              <a
                href={item.itemWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-gray-400 hover:text-red-600 transition-colors underline"
              >
                Also available on eBay
              </a>
            )}
          </div>
        </div>

        <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to catalog
        </Link>

        {/* Related */}
        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.itemId}
                href={`/catalog/${rel.itemId}`}
                className="group bg-white border border-gray-200 hover:border-red-500 hover:shadow-md rounded-xl overflow-hidden transition-all"
              >
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  {rel.image?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={rel.image.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🔧</div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">{rel.title}</h3>
                  <p className="text-red-600 font-bold text-sm">${parseFloat(rel.price.value).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
