import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import type { EbayItem } from "@/lib/ebay";

export default function ProductCard({ item }: { item: EbayItem }) {
  const price = parseFloat(item.price.value);

  return (
    <Link
      href={`/catalog/${item.itemId}`}
      className="group relative panel rounded-xl overflow-hidden card-hover hover:border-red-600/70 flex flex-col"
    >
      {/* Image on a bright panel so part photos read clearly */}
      <div className="aspect-square bg-white overflow-hidden relative flex items-center justify-center p-3">
        {item.image?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image.imageUrl}
            alt={item.title}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🔧</div>
        )}
        {item.condition && (
          <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide text-white bg-red-600 px-2 py-0.5 rounded-sm">
            {item.condition}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-200 line-clamp-2 mb-3 group-hover:text-white transition-colors leading-snug">
          {item.title}
        </h3>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <p className="font-display text-xl font-bold text-red-500">${price.toFixed(2)}</p>
          <AddToCart
            className="text-xs font-bold uppercase tracking-wide bg-white/10 hover:bg-red-600 text-white px-3 py-1.5 rounded-sm transition-colors"
            product={{
              itemId: item.itemId,
              title: item.title,
              price,
              currency: item.price.currency,
              image: item.image?.imageUrl,
              itemWebUrl: item.itemWebUrl,
            }}
          />
        </div>
      </div>
    </Link>
  );
}
