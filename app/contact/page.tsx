import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-sm">We&apos;re here to help. Reach out and we&apos;ll get back to you quickly.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Get in touch</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                  <a href="tel:3057169794" className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors">
                    305 716 9794
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <a href="mailto:support@motorlandmia.com" className="text-base font-semibold text-gray-900 hover:text-red-600 transition-colors">
                    support@motorlandmia.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-base font-semibold text-gray-900">Miami, Florida</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Hours</p>
                  <p className="text-base font-semibold text-gray-900">Mon – Fri: 9:00 AM – 6:00 PM EST</p>
                  <p className="text-sm text-gray-500">Sat – Sun: Closed</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <ExternalLink className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">eBay Store</p>
                  <a
                    href="https://www.ebay.com/str/motorlandmiami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    ebay.com/str/motorlandmiami
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="Part inquiry, order question..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what part you need, your vehicle make/model/year..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition-colors text-sm uppercase tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
