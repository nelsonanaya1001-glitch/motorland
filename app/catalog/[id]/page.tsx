import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, Star, Package } from "lucide-react";
import { getEbayItem, searchEbayItems } from "@/lib/ebay";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const item = await getEbayItem(id);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center bg-carbon min-h-screen">
        <h1 className="font-display text-3xl font-bold mb-4 text-white uppercase">Part not found</h1>
        <Link href="/catalog" className="text-red-500 hover:underline">Back to catalog</Link>
      </div>
    );
  }

  const { items: related } = await searchEbayItems("auto parts", undefined, 4, 0);

  return (
    <div className="bg-carbon min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-widest">
          <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-red-500 transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs normal-case tracking-normal">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center p-6 relative">
            {item.condition && (
              <span className="absolute top-4 left-4 z-10 text-[11px] font-bold uppercase tracking-wide text-white bg-red-600 px-3 py-1 rounded-sm">
                {item.condition}
              </span>
            )}
            {item.image?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image.imageUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🔧</div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-4 uppercase tracking-tight">{item.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-red-500 fill-red-500" : "text-gray-700"}`} />
              ))}
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>

            <div className="font-display text-5xl font-bold text-red-500 mb-6 text-glow">
              ${parseFloat(item.price.value).toFixed(2)}
              <span className="text-base font-normal text-gray-500 ml-2 font-sans">{item.price.currency}</span>
            </div>

            {item.categories?.[0] && (
              <p className="text-sm text-gray-400 mb-6">
                Category: <span className="text-white font-medium">{item.categories[0].categoryName}</span>
              </p>
            )}

            {/* Quantity + Add to cart */}
            <div className="mb-8">
              <AddToCart
                withQuantity
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

            {/* Trust signals */}
            <div className="panel rounded-xl p-5 space-y-4">
              {[
                { icon: Truck, t: "Fast shipping — most orders ship within 1–2 business days" },
                { icon: Package, t: "Wholesale pricing available for shops & resellers" },
                { icon: RefreshCw, t: "30-day hassle-free returns" },
                { icon: ShieldCheck, t: "Quality guaranteed — every part tested before shipping" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3 text-sm text-gray-300">
                  <Icon className="w-5 h-5 text-red-500 shrink-0" /> {t}
                </div>
              ))}
            </div>

            {item.itemWebUrl && item.itemWebUrl !== "#" && (
              <a
                href={item.itemWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-gray-500 hover:text-red-500 transition-colors underline"
              >
                Also available on eBay
              </a>
            )}
          </div>
        </div>

        <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm mb-12 uppercase tracking-widest font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to catalog
        </Link>

        {/* Related */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wide">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((rel) => (
              <ProductCard key={rel.itemId} item={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
