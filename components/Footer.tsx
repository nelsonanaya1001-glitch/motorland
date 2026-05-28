import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-300 mt-0">
      {/* Newsletter */}
      <div className="bg-red-600 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-white font-bold text-xl mb-2">Get deals in your inbox</h3>
          <p className="text-red-100 text-sm mb-5">Subscribe for exclusive discounts, new arrivals, and wholesale offers.</p>
          <form className="flex gap-2 max-w-md mx-auto" action="#">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-md text-sm text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#111] text-white font-semibold px-5 py-2.5 rounded-md hover:bg-gray-800 transition-colors text-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="Motorland Miami" width={80} height={80} className="object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Founded in 2020. Quality auto parts for every make and model — reliable, affordable, and shipped fast from Miami.
            </p>
            <a
              href="https://www.ebay.com/str/motorlandmiami"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> View our eBay store
            </a>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Catalog</h3>
            <ul className="space-y-2 text-sm">
              {["All Parts", "Wiring", "Mirrors", "Headlights", "Door Handles", "Bumpers", "Grilles", "Engine Parts"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "All Parts" ? "/catalog" : `/catalog?category=${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Order Tracking", href: "#" },
                { label: "Returns & Refunds", href: "#" },
                { label: "Shipping Info", href: "#" },
                { label: "FAQs", href: "#" },
                { label: "Wholesale Pricing", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-red-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="tel:3057169794" className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  305 716 9794
                </a>
              </li>
              <li>
                <a href="mailto:support@motorlandmia.com" className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  support@motorlandmia.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Miami, Florida<br />Mon–Fri 9am–6pm EST</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Motorland Miami. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
