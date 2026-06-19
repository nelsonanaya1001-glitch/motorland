# Motorland Miami — Shopify Theme

A Liquid port of the Motorland Miami storefront. It uses **real Shopify data**
(products, collections, cart, search, contact form) so it can replace your
current store.

## Install

### Option A — upload as a theme (recommended)
1. Zip the **contents** of this `shopify-theme/` folder so that `layout/`,
   `templates/`, `sections/`, `snippets/`, `config/`, and `locales/` are at the
   root of the zip (not inside an extra folder).
2. Shopify admin → **Online Store → Themes → Add theme → Upload zip file**.
3. Click **Customize** to set the logo, menus, hero image, brands, and
   categories, then **Publish** to make it live.

### Option B — paste file-by-file
Use the Shopify code editor (**Themes → ⋯ → Edit code**) and create each file
under the matching folder, pasting the contents from here.

## After installing — set these up in Shopify admin
- **Navigation** (Content → Menus): create a `main-menu` (Home, Catalog,
  Contact) and footer menus, then pick them in the Header/Footer section
  settings.
- **Catalog link:** "Catalog" should point to a collection. Create a collection
  (e.g. *All Parts*) or use the automatic `all` collection at `/collections/all`.
- **Categories:** create a Shopify **collection** per category (Wiring, Mirrors,
  Headlights, etc.) and link the homepage "Shop by Category" blocks to them.
- **Brands:** add brand blocks in the homepage "Brands" section with a logo
  image and a link (usually a collection or a search URL).
- **Contact page:** create a page using the **page.contact** template so the
  form renders.
- **Featured products:** in the "Featured Products" section, pick the collection
  to feature.
- **Phone / email:** Theme settings → **Brand** (used on the contact page),
  plus the Header/Footer/CTA section settings.

## Notes
- **Tailwind** loads from a CDN in `layout/theme.liquid` for a pixel-accurate
  match to the original site. It works as-is, but for best performance you
  should compile Tailwind to a static asset and swap the CDN `<script>` for a
  `{{ 'theme.css' | asset_url | stylesheet_tag }}` line.
- Icons are inline SVGs in `snippets/icon.liquid` (ported from lucide).
- Reviews/ratings on the product page are static placeholders — wire up a
  reviews app if you want real ones.
