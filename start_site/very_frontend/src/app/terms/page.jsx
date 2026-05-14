'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <section className="relative min-h-screen py-16 px-2 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 sm:p-12 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-lime-400 text-center">
            Terms of Use
          </h2>

          <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
            By accessing or using this website, you agree to comply with and be bound by the following terms.
          </p>

          <div className="space-y-6 mt-10">
            {[
              {
                title: "Permitted Use",
                desc: "Content is provided for personal, non-commercial educational use only. You may not reproduce, distribute, or create derivative works without prior written permission."
              },
              {
                title: "Prohibited Activities",
                desc: "You may not use the site to transmit harmful code, engage in automated scraping, or interfere with its operation. Impersonation, harassment, or illegal activity is strictly prohibited."
              },
              {
                title: "Intellectual Property",
                desc: "All content, including text, code, and design, is protected by copyright and owned by the platform or its licensors."
              },
              {
                title: "No Warranty",
                desc: "The site is provided 'as is' without warranties of any kind. We do not guarantee availability, accuracy, or fitness for a particular purpose."
              },
              {
                title: "Limitation of Liability",
                desc: "We are not liable for any indirect, incidental, or consequential damages arising from your use of the site."
              },
              {
                title: "Modifications",
                desc: "We reserve the right to update these terms at any time. Continued use constitutes acceptance of the revised terms."
              }
            ].map((item, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className=""
              >
                <h3 className="border-l-4 border-lime-400 rounded-sm pl-4 text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="ml-5 text-gray-300/90 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </Motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-xl sm:text-2xl text-white font-semibold mb-3">
              <Link href="/merch" className="text-lime-400 hover:text-lime-300 active:text-white underline transition-colors duration-200">
                Store Use
              </Link> (Merch)
            </h3>
            <ul className="space-y-2 text-gray-300/90 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                <span>Orders are fulfilled manually.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                <span>Shipping times may vary.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                <span>Multiple items may ship separately.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                <span>Store products are non-refundable for now.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed">
              Questions about these terms? Contact us via the{' '}
              <Link href="/contact" className="text-lime-400 hover:text-lime-300 active:underline active:text-white transition-colors">
                contact 
              </Link>page.
            </p>
          </div>

          <p className="mt-10 text-xs text-gray-500 italic text-center">
            Last revised: May 2026
          </p>
        </Motion.div>
      </div>
    </section>
  );
}