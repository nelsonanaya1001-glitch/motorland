import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-500 rounded-md p-1.5">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                MOTOR<span className="text-orange-500">LAND</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for quality auto parts and accessories. Trusted by thousands of car owners and mechanics.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Engine Parts", "Brakes", "Suspension", "Electrical", "Exterior", "Interior", "Wheels & Tires", "Fluids & Oils"].map((c) => (
                <li key={c}>
                  <Link href={`/products?category=${c.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="hover:text-orange-400 transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Order Tracking", "Returns & Refunds", "Shipping Info", "FAQs", "Compatibility Guide", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-orange-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>1-800-MOTORLAND</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@motorland.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Mon–Fri 9am–6pm EST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Motorland. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
