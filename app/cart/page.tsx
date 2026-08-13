"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, ExternalLink, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();

  const hasEbayLinks = items.some((i) => i.itemWebUrl && i.itemWebUrl !== "#");

  function checkoutOnEbay() {
    // Open each item's eBay listing in a new tab to complete purchase there.
    items.forEach((i) => {
      if (i.itemWebUrl && i.itemWebUrl !== "#") {
        window.open(i.itemWebUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black tracking-tight mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-500 mb-6">Your cart is empty.</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-md transition-colors text-sm uppercase tracking-widest"
            >
              Browse Parts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.itemId} className="flex gap-4 border border-gray-200 rounded-xl p-4 items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl">🔧</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-2">{item.title}</p>
                    <p className="text-red-600 font-bold mt-1">
                      ${item.price.toFixed(2)} <span className="text-xs font-normal text-gray-400">{item.currency}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.itemId, Math.max(1, parseInt(e.target.value || "1", 10)))}
                      className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm text-center focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.itemId)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 pt-6">
              <button onClick={clear} className="text-sm text-gray-500 hover:text-red-600 underline order-2 sm:order-1">
                Clear cart
              </button>

              <div className="order-1 sm:order-2 text-right w-full sm:w-auto">
                <p className="text-sm text-gray-500 mb-2">
                  Subtotal <span className="text-2xl font-black text-gray-900 ml-2">${subtotal.toFixed(2)}</span>
                </p>
                <button
                  onClick={checkoutOnEbay}
                  disabled={!hasEbayLinks}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3.5 rounded-md transition-colors text-sm uppercase tracking-widest"
                >
                  <ExternalLink className="w-4 h-4" /> Checkout on eBay
                </button>
                <p className="text-xs text-gray-400 mt-2 max-w-xs sm:ml-auto">
                  Each item opens its eBay listing to complete purchase securely on eBay.
                </p>
              </div>
            </div>

            {/* Per-item eBay links (fallback if popups are blocked) */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Buy items individually</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.itemId}>
                    {item.itemWebUrl && item.itemWebUrl !== "#" ? (
                      <a
                        href={item.itemWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> {item.title}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                        {item.title} — link unavailable
                      </span>
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
