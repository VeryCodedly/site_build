'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 sm:p-12 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 text-center"
            whileHover={{ scale: 1.02 }}
          >
            Privacy Policy
          </Motion.h2>

          <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
            We built this place to help you learn and keep up with the tech space. Here’s exactly how we handle your data.
          </p>

          <div className="space-y-6 mt-10">
            {[
              {
                title: "No login required.",
                desc: "Everything is open and free. No accounts, no sign-up, no passwords."
              },
              {
                title: "We store nothing personal.",
                desc: "No email, no name, no profile. Your progress is saved locally in your browser."
              },
              {
                title: "Cookies? Only for essentials.",
                desc: "We collect anonymous site usage data (like which pages are visited) to help us improve the site."
              },
              {
                title: "Encrypted connections and no server tracking.",
                desc: "HTTPS everywhere. We don't run tracking scripts on our own servers."
              },
              {
                title: "We never sell your data.",
                desc: "Not to advertisers, not to marketers, not to anyone. This includes store order data."
              },
              {
                title: "Want to start fresh?",
                desc: "Clear your browser cache or local storage. That’s it, everything resets instantly."
              },
            ].map((item, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className=""
              >
                <h3 className="border-l-4 border-lime-400 rounded-sm pl-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed mt-1 ml-5">
                  {item.desc}
                </p>
              </Motion.div>
            ))}
          </div>

          <div className="mt-8 space-y-6 text-left">
            {/* What we collect (main site) */}
            <div className="">
              <h3 className="border-l-4 border-lime-400 rounded-sm pl-4 text-lg font-semibold text-white">What we collect (main site):</h3>
              <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed mt-1 ml-5">
                Nothing that identifies you personally. No emails, no names, no accounts. Only anonymous analytics data (e.g., page views) via cookies.
              </p>
            </div>

            {/* What we store (on your device) */}
            <div className="">
              <h3 className="border-l-4 border-lime-400 rounded-sm pl-4 text-lg font-semibold text-white">What we store (on your device):</h3>
              <ul className="text-gray-300/90 text-sm sm:text-base leading-relaxed mt-1 ml-5 space-y-2 list-disc list-inside">
                <li><strong>Course progress</strong> (e.g., “HTML Module 3 completed”)</li>
                <li><strong>Analytics cookies</strong>  for anonymous usage data</li>
                <li><strong>That’s it.</strong></li>
              </ul>
            </div>

            {/* Store section - separate because this collects personal data */}
            <div className="my-10 pt-6 border-t border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                <Link href="/merch" className="text-lime-400 hover:text-lime-300 active:text-white underline transition-colors duration-200">
                  Store Orders
                </Link> (Merch)
              </h3>
              <div className="space-y-4 text-gray-300/90 text-sm sm:text-base">
                <div>
                  <p className="border-l-4 border-lime-400 pl-4 rounded-sm font-medium text-white">What we collect for store orders:</p>
                  <p className="mt-1 ml-5">Your shipping information, only to fulfill your order.</p>
                </div>
                <div>
                  <p className="border-l-4 border-lime-400 pl-4 rounded-sm font-medium text-white">How we use it:</p>
                  <p className="mt-1 ml-5">We share this data with our fulfillment partner solely to ship your items, and we never use it for marketing or sell it to anyone.</p>
                </div>
                <div>
                  <p className="border-l-4 border-lime-400 pl-4 rounded-sm font-medium text-white">Third‑party processing:</p>
                  <p className="mt-1 ml-5">Our fulfillment partner acts as a data processor and has its own privacy policy.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed">
              Got questions? Reach out anytime via our{' '}
              <Link
                href="/contact"
                className="text-lime-400 underline hover:text-lime-300 transition-colors duration-200 font-medium"
              >
                contact page
              </Link>.
            </p>
          </div>

          <p className="mt-6 text-xs text-gray-500 italic text-center">
            Last updated: May 2026
          </p>
        </Motion.div>
      </div>
    </section>
  );
}