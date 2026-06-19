// Shopify Storefront API integration (headless)
// Docs: https://shopify.dev/docs/api/storefront
//
// Configure these in .env.local to enable live data:
//   SHOPIFY_STORE_DOMAIN     e.g. motorlandmia.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN your Storefront API access token (public)
//   SHOPIFY_API_VERSION      optional, defaults to 2024-10
//
// Without these set, the site falls back to generated mock data so it
// still renders in development.

export interface Product {
  itemId: string; // Shopify product handle — used in /catalog/[id] and /products/[id]
  title: string;
  description?: string;
  price: { value: string; currency: string };
  image?: { imageUrl: string };
  condition?: string;
  itemWebUrl: string; // canonical Shopify online-store URL
  categories?: { categoryName: string }[];
  variantId?: string; // default variant — needed for cart/checkout
}

const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";

function isConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN);
}

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate = 300
): Promise<T> {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join("; "));
  }
  return json.data as T;
}

// ── Shopify GraphQL shapes ──────────────────────────────────────────────
interface SfImage {
  url: string;
}
interface SfMoney {
  amount: string;
  currencyCode: string;
}
interface SfVariantNode {
  id: string;
}
interface SfProduct {
  handle: string;
  title: string;
  description?: string;
  onlineStoreUrl?: string | null;
  productType?: string;
  tags?: string[];
  featuredImage?: SfImage | null;
  priceRange: { minVariantPrice: SfMoney };
  variants?: { edges: { node: SfVariantNode }[] };
}

const PRODUCT_FIELDS = `
  handle
  title
  description
  onlineStoreUrl
  productType
  tags
  featuredImage { url }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { edges { node { id } } }
`;

function mapProduct(p: SfProduct): Product {
  return {
    itemId: p.handle,
    title: p.title,
    description: p.description,
    price: {
      value: p.priceRange.minVariantPrice.amount,
      currency: p.priceRange.minVariantPrice.currencyCode,
    },
    image: p.featuredImage ? { imageUrl: p.featuredImage.url } : undefined,
    condition: p.tags?.find((t) => /new|used|refurb/i.test(t)) ?? undefined,
    itemWebUrl: p.onlineStoreUrl ?? `https://${process.env.SHOPIFY_STORE_DOMAIN}/products/${p.handle}`,
    categories: p.productType ? [{ categoryName: p.productType }] : undefined,
    variantId: p.variants?.edges[0]?.node.id,
  };
}

// Build a Shopify product-search query string from the UI's free-text + category.
function buildQuery(query: string, category?: string): string {
  const parts: string[] = [];
  if (query && query !== "auto parts") parts.push(query);
  if (category) parts.push(`(product_type:${category} OR tag:${category})`);
  return parts.join(" ").trim();
}

export async function searchProducts(
  query: string,
  category?: string,
  limit = 24,
  offset = 0
): Promise<{ items: Product[]; total: number }> {
  if (!isConfigured()) {
    return getMockItems(query, category, limit, offset);
  }

  try {
    // The Storefront API paginates with cursors, not offsets. We fetch
    // (offset + limit) items and slice the page we need — fine for typical
    // catalog sizes and keeps the existing page-based UI working.
    const first = offset + limit;
    const data = await storefront<{
      products: {
        edges: { node: SfProduct }[];
        pageInfo: { hasNextPage: boolean };
      };
    }>(
      `query Search($first: Int!, $query: String) {
        products(first: $first, query: $query, sortKey: BEST_SELLING) {
          edges { node { ${PRODUCT_FIELDS} } }
          pageInfo { hasNextPage }
        }
      }`,
      { first, query: buildQuery(query, category) }
    );

    const all = data.products.edges.map((e) => mapProduct(e.node));
    const items = all.slice(offset, offset + limit);
    // Approximate total: enough to drive the Next button when more pages exist.
    const total = data.products.pageInfo.hasNextPage ? offset + limit + 1 : all.length;
    return { items, total };
  } catch {
    return getMockItems(query, category, limit, offset);
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isConfigured()) {
    return getMockItems("", undefined, 1, 0).items[0] ?? null;
  }
  try {
    const data = await storefront<{ product: SfProduct | null }>(
      `query Product($handle: String!) {
        product(handle: $handle) { ${PRODUCT_FIELDS} }
      }`,
      { handle }
    );
    return data.product ? mapProduct(data.product) : null;
  } catch {
    return null;
  }
}

// ── Mock data (used when Shopify env vars are not configured) ────────────
function getMockItems(
  _query: string,
  category: string | undefined,
  limit: number,
  offset: number
): { items: Product[]; total: number } {
  const categories = ["Engine Parts", "Brakes", "Suspension", "Electrical", "Exterior", "Wheels & Tires"];
  const brands = ["Bosch", "ACDelco", "Dorman", "Moog", "Monroe", "Gates", "NGK", "Denso"];
  const conditions = ["New", "New other", "Manufacturer refurbished"];

  const all: Product[] = Array.from({ length: 200 }, (_, i) => {
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
