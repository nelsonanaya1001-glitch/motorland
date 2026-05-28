// eBay Browse API integration
// Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
// Set EBAY_APP_ID in your .env.local to enable live data

export interface EbayItem {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  image?: { imageUrl: string };
  condition?: string;
  itemWebUrl: string;
  categories?: { categoryName: string }[];
}

async function getEbayToken(): Promise<string> {
  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.EBAY_APP_ID}:${process.env.EBAY_CERT_ID}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
    next: { revalidate: 7000 },
  });
  const data = await res.json();
  return data.access_token;
}

export async function searchEbayItems(
  query: string,
  category?: string,
  limit = 24,
  offset = 0
): Promise<{ items: EbayItem[]; total: number }> {
  if (!process.env.EBAY_APP_ID) {
    return getMockItems(query, category, limit, offset);
  }

  try {
    const token = await getEbayToken();
    const params = new URLSearchParams({
      q: query || "auto parts",
      limit: String(limit),
      offset: String(offset),
    });
    if (category) params.set("category_ids", category);

    const res = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    return {
      items: data.itemSummaries ?? [],
      total: data.total ?? 0,
    };
  } catch {
    return getMockItems(query, category, limit, offset);
  }
}

export async function getEbayItem(itemId: string): Promise<EbayItem | null> {
  if (!process.env.EBAY_APP_ID) {
    return getMockItems("", undefined, 1, 0).items[0] ?? null;
  }
  try {
    const token = await getEbayToken();
    const res = await fetch(`https://api.ebay.com/buy/browse/v1/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });
    return await res.json();
  } catch {
    return null;
  }
}

// Mock data used when EBAY_APP_ID is not configured
function getMockItems(
  _query: string,
  category: string | undefined,
  limit: number,
  offset: number
): { items: EbayItem[]; total: number } {
  const categories = ["Engine Parts", "Brakes", "Suspension", "Electrical", "Exterior", "Wheels & Tires"];
  const brands = ["Bosch", "ACDelco", "Dorman", "Moog", "Monroe", "Gates", "NGK", "Denso"];
  const conditions = ["New", "New other", "Manufacturer refurbished"];

  const all: EbayItem[] = Array.from({ length: 200 }, (_, i) => {
    const cat = category ?? categories[i % categories.length];
    const brand = brands[i % brands.length];
    const price = (9.99 + i * 3.5).toFixed(2);
    return {
      itemId: `mock-${i + 1}`,
      title: `${brand} ${cat} Part #ML${String(i + 1).padStart(4, "0")} — OEM Quality Replacement`,
      price: { value: price, currency: "USD" },
      image: {
        imageUrl: `https://placehold.co/400x400/1a1a1a/f97316?text=${encodeURIComponent(brand)}`,
      },
      condition: conditions[i % conditions.length],
      itemWebUrl: `#`,
      categories: [{ categoryName: cat }],
    };
  });

  return {
    items: all.slice(offset, offset + limit),
    total: all.length,
  };
}
