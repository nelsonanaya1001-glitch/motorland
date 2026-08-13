"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, ExternalLink, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();

  const hasEbayLinks = items.some((i) => i.itemWebUrl && i.itemWebUrl !== "#");

  function checkoutOnEbay() {
    items.forEach((i) => {
      if (i.itemWebUrl && i.itemWebUrl !== "#") {
        window.open(i.itemWebUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  return (
    <div className="bg-carbon min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8 uppercase">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 panel rounded-2xl">
            <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-lg text-gray-400 mb-6">Your cart is empty.</p>
            <Link href="/catalog" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-md transition-colors text-sm uppercase tracking-widest glow-red">
              Browse Parts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.itemId} className="flex gap-4 panel rounded-xl p-4 items-center">
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl">🔧</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-2 text-gray-100">{item.title}</p>
                    <p className="font-display text-lg font-bold text-red-500 mt-1">
                      ${item.price.toFixed(2)} <span className="text-xs font-normal text-gray-500 font-sans">{item.currency}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.itemId, Math.max(1, parseInt(e.target.value || "1", 10)))}
                      className="w-16 bg-white/5 border border-white/15 rounded-md px-2 py-1.5 text-sm text-center text-white focus:outline-none focus:border-red-500"
                    />
                    <button type="button" onClick={() => removeItem(item.itemId)} className="text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove item">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 pt-6">
              <button onClick={clear} className="text-sm text-gray-500 hover:text-red-500 underline order-2 sm:order-1">Clear cart</button>

              <div className="order-1 sm:order-2 text-right w-full sm:w-auto">
                <p className="text-sm text-gray-400 mb-2">
                  Subtotal <span className="font-display text-3xl font-bold text-white ml-2">${subtotal.toFixed(2)}</span>
                </p>
                <button
                  onClick={checkoutOnEbay}
                  disabled={!hasEbayLinks}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-md transition-colors text-sm uppercase tracking-widest glow-red"
                >
                  <ExternalLink className="w-4 h-4" /> Checkout on eBay
                </button>
                <p className="text-xs text-gray-500 mt-2 max-w-xs sm:ml-auto">
                  Each item opens its eBay listing to complete purchase securely on eBay.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Buy items individually</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.itemId}>
                    {item.itemWebUrl && item.itemWebUrl !== "#" ? (
                      <a href={item.itemWebUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-red-500 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> {item.title}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-600">{item.title} — link unavailable</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
