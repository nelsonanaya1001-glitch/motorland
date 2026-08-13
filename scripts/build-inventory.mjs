// Parses the eBay "all active listings" CSV export into a compact JSON file
// the site can serve. Re-run after downloading a fresh report:
//   node scripts/build-inventory.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csv = readFileSync(join(root, "data", "ebay-listings.csv"), "utf8");

// Minimal RFC-4180-ish CSV line parser (handles quoted fields + "" escapes).
function parseLine(line) {
  const out = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { out.push(field); field = ""; }
    else field += c;
  }
  out.push(field);
  return out;
}

const lines = csv.split(/\r?\n/).filter((l) => l.trim() !== "");
lines.shift(); // drop header

const items = [];
for (const line of lines) {
  const cols = parseLine(line);
  const id = (cols[0] || "").trim();
  const title = (cols[1] || "").trim();
  const qty = parseInt(cols[4] || "0", 10);
  const currency = (cols[6] || "USD").trim() || "USD";
  const price = parseFloat(cols[10] || cols[7] || "0");
  const category = (cols[16] || "").trim();
  const condition = (cols[20] || "").trim();

  if (!id || !title || !(price > 0)) continue;
  if (!(qty > 0)) continue; // only in-stock listings

  items.push({ id, title, price, currency, category, condition });
}

writeFileSync(join(root, "lib", "inventory.json"), JSON.stringify(items));
console.log(`Wrote ${items.length} in-stock listings to lib/inventory.json`);
