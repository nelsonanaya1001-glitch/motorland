import Link from "next/link";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
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
        <h1 className="text-2xl font-bold mb-4">Part not found</h1>
        <Link href="/products" className="text-orange-400 hover:underline">Back to catalog</Link>
      </div>
    );
  }

  const { items: related } = await searchEbayItems("auto parts", undefined, 4, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-orange-400 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-300 truncate max-w-xs">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="aspect-square bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
          {item.image?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🔧</div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {item.condition && (
            <span className="inline-block bg-green-500/20 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 self-start">
              {item.condition}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-4">{item.title}</h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-orange-400 fill-orange-400" : "text-gray-600"}`} />
            ))}
            <span className="text-sm text-gray-500">(24 reviews)</span>
          </div>

          <div className="text-4xl font-extrabold text-orange-500 mb-6">
            ${parseFloat(item.price.value).toFixed(2)}
            <span className="text-base font-normal text-gray-500 ml-2">{item.price.currency}</span>
          </div>

          {/* Category */}
          {item.categories?.[0] && (
            <p className="text-sm text-gray-500 mb-6">
              Category: <span className="text-gray-300">{item.categories[0].categoryName}</span>
            </p>
          )}

          {/* Add to cart */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button className="px-6 py-3 border border-white/20 hover:border-orange-500/50 rounded-lg font-semibold transition-colors hover:text-orange-400">
              Save
            </button>
          </div>

          {/* Trust signals */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-gray-300">Fast shipping — most orders ship within 1–2 days</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RefreshCw className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-gray-300">30-day hassle-free returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-gray-300">Quality guaranteed — OEM & aftermarket tested</span>
            </div>
          </div>

          {/* eBay link */}
          {item.itemWebUrl && item.itemWebUrl !== "#" && (
            <a
              href={item.itemWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm text-gray-500 hover:text-orange-400 transition-colors underline"
            >
              View on eBay
            </a>
          )}
        </div>
      </div>

      {/* Back link */}
      <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 transition-colors text-sm mb-10">
        <ArrowLeft className="w-4 h-4" /> Back to catalog
      </Link>

      {/* Related products */}
      <div>
        <h2 className="text-xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {related.map((rel) => (
            <Link
              key={rel.itemId}
              href={`/products/${rel.itemId}`}
              className="group bg-[#1a1a1a] border border-white/10 hover:border-orange-500/40 rounded-xl overflow-hidden transition-all"
            >
              <div className="aspect-square bg-[#222] overflow-hidden">
                {rel.image?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={rel.image.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🔧</div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-xs font-medium text-white line-clamp-2 mb-1 group-hover:text-orange-400 transition-colors">{rel.title}</h3>
                <p className="text-orange-500 font-bold text-sm">${parseFloat(rel.price.value).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
