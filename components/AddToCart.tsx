"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart, type CartItem } from "@/components/CartProvider";

interface Props {
  product: Omit<CartItem, "quantity">;
  withQuantity?: boolean;
  className?: string;
  label?: string;
}

export default function AddToCart({ product, withQuantity, className, label }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  if (!withQuantity) {
    // Compact button for product cards
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAdd();
        }}
        className={className ?? "text-xs bg-gray-900 hover:bg-red-600 text-white px-3 py-1.5 rounded-sm transition-colors uppercase tracking-wide"}
      >
        {added ? "Added ✓" : label ?? "Add"}
      </button>
    );
  }

  // Full control with quantity for product detail pages
  return (
    <div className="flex gap-3 w-full">
      <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
        className="w-20 border border-gray-300 rounded-md px-3 py-3 text-sm text-gray-800 text-center focus:outline-none focus:border-red-500 bg-white"
      />
      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
      >
        {added ? (
          <>
            <Check className="w-5 h-5" /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
