import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-carbon min-h-screen">
      {/* Header */}
      <div className="relative bg-black/40 border-b border-white/10 py-14 px-4 text-center overflow-hidden">
        <div className="hazard absolute top-0 left-0 right-0 h-1.5 opacity-90" />
        <p className="eyebrow justify-center mb-3">Get in touch</p>
        <h1 className="font-display text-5xl font-bold text-white uppercase tracking-tight mb-2">Contact Us</h1>
        <p className="text-gray-400 text-sm">We&apos;re here to help. Reach out and we&apos;ll get back to you quickly.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wide">Reach the team</h2>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: "305 716 9794", href: "tel:3057169794" },
                { icon: Mail, label: "Email", value: "infomotorlandmiami@gmail.com", href: "mailto:infomotorlandmiami@gmail.com" },
                { icon: MapPin, label: "Location", value: "Miami, Florida" },
                { icon: ExternalLink, label: "eBay Store", value: "ebay.com/str/motorlandmiami", href: "https://www.ebay.com/str/motorlandmiami", external: true },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <div key={label} className="flex gap-4 panel rounded-xl p-4 items-center">
                  <div className="w-11 h-11 bg-red-600/15 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-base font-bold text-white hover:text-red-500 transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-base font-bold text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="panel rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wide">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">First name</label>
                  <input type="text" placeholder="John" className="w-full bg-white/5 border border-white/15 rounded-md px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Last name</label>
                  <input type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/15 rounded-md px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/15 rounded-md px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Subject</label>
                <input type="text" placeholder="Part inquiry, order question..." className="w-full bg-white/5 border border-white/15 rounded-md px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Message</label>
                <textarea rows={5} placeholder="Tell us what part you need, your vehicle make/model/year..." className="w-full bg-white/5 border border-white/15 rounded-md px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none" />
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-md transition-colors text-sm uppercase tracking-widest glow-red">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
