// Product data for Motorland Miami.
//
// Primary source: your eBay "all active listings" report, parsed into
// lib/inventory.json by scripts/build-inventory.mjs. To refresh inventory,
// download a new report to data/ebay-listings.csv and run:
//   node scripts/build-inventory.mjs
//
// If EBAY_APP_ID / EBAY_CERT_ID are set, the live eBay Browse API is used
// instead (auto-updating). Otherwise the CSV snapshot is served.

import inventory from "./inventory.json";

export interface EbayItem {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  image?: { imageUrl: string };
  condition?: string;
  itemWebUrl: string;
  categories?: { categoryName: string }[];
}

interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  condition: string;
}

const LISTINGS = inventory as Listing[];

// Map the site's category slugs to keyword matchers run against each
// listing's eBay category name + title.
const CATEGORY_MATCHERS: Record<string, RegExp> = {
  wiring: /wir(e|ing)|harness/i,
  mirrors: /mirror/i,
  headlights: /head\s?(light|lamp)/i,
  "door-handles": /door handle|handle/i,
  bumpers: /bumper/i,
  grilles: /grille|grill\b/i,
  radio: /radio|stereo|head unit|audio|receiver/i,
  engine: /engine|valve cover|intake manifold|ignition coil|throttle|camshaft|crankshaft|piston|cylinder head|oil pan|timing/i,
  suspension: /suspension|control arm|strut|shock|coil spring|leaf|stabilizer|sway|knuckle|ball joint|axle/i,
  brakes: /brake|caliper|master cylinder|rotor|\babs\b|booster/i,
  electrical: /ecu|module|sensor|fuse|relay|wir(e|ing)|alternator|starter|antenna|switch|speaker/i,
  interior: /console|dash|seat|trim|glove|visor|panel|carpet|headrest|sun ?visor/i,
  "wheels-tires": /wheel|tire|\bhub\b|rim|tpms/i,
};

function toEbayItem(l: Listing): EbayItem {
  return {
    itemId: l.id,
    title: l.title,
    price: { value: l.price.toFixed(2), currency: l.currency || "USD" },
    condition: l.condition || undefined,
    itemWebUrl: `https://www.ebay.com/itm/${l.id}`,
    categories: l.category ? [{ categoryName: l.category }] : undefined,
  };
}

function filterListings(query: string, category?: string): Listing[] {
  let list = LISTINGS;

  if (category) {
    const matcher = CATEGORY_MATCHERS[category];
    if (matcher) {
      list = list.filter((l) => matcher.test(`${l.category} ${l.title}`));
    }
  }

  // "auto parts" is the app's default = show everything.
  const q = (query || "").trim().toLowerCase();
  if (q && q !== "auto parts") {
    const terms = q.split(/\s+/);
    list = list.filter((l) => {
      const hay = `${l.title} ${l.category}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }

  return list;
}

async function searchViaApi(
  query: string,
  category: string | undefined,
  limit: number,
  offset: number
): Promise<{ items: EbayItem[]; total: number }> {
  const token = await getEbayToken();
  const params = new URLSearchParams({
    q: query || "auto parts",
    limit: String(limit),
    offset: String(offset),
  });
  if (category) params.set("category_ids", category);
  const seller = process.env.EBAY_SELLER ?? "motorlandmiami";
  if (seller) params.set("filter", `sellers:{${seller}}`);

  const res = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 } }
  );
  const data = await res.json();
  return { items: data.itemSummaries ?? [], total: data.total ?? 0 };
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
  if (process.env.EBAY_APP_ID) {
    try {
      return await searchViaApi(query, category, limit, offset);
    } catch {
      // fall through to the CSV snapshot
    }
  }

  const filtered = filterListings(query, category);
  return {
    items: filtered.slice(offset, offset + limit).map(toEbayItem),
    total: filtered.length,
  };
}

export async function getEbayItem(itemId: string): Promise<EbayItem | null> {
  if (process.env.EBAY_APP_ID) {
    try {
      const token = await getEbayToken();
      const res = await fetch(`https://api.ebay.com/buy/browse/v1/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
      });
      if (res.ok) return await res.json();
    } catch {
      // fall through to the CSV snapshot
    }
  }

  const found = LISTINGS.find((l) => l.id === itemId);
  return found ? toEbayItem(found) : null;
}
