'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function FAQsPage() {
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
            FAQs
          </Motion.h2>

          <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed text-center">
            Get answers to your questions.
          </p>

          <div className="space-y-8 mt-8">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">Is this platform free?</h3>
              </div>
              <p className="ml-4 sm:ml-3 text-gray-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-2">
                Yes! Most of our content is free to access. Premium resources may come later,
                but our goal is to keep learning open.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">Do I need prior coding experience?</h3>
              </div>
              <p className="ml-4 sm:ml-3 text-gray-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-2">
                Nope. We design lessons and articles for absolute beginners all the way to advanced learners.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">Can I learn at my own pace?</h3>
              </div>
              <p className="ml-4 sm:ml-3 text-gray-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-2">
                Absolutely. All content is self-paced. No deadlines, no pressure. Learn whenever and however you want.
              </p>
            </Motion.div>

            {/* <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Will there be certificates?</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Yes! Complete a course path and earn a shareable certificate to showcase on LinkedIn or your portfolio.
              </p>
            </Motion.div> */}

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">What if I get stuck on a lesson?</h3>
              </div>
              <p className="ml-4 sm:ml-3 text-gray-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-2">
                Visit our <Link href="https://discord.gg/53wVsqEcbE" className="text-lime-400 underline active:text-white hover:text-lime-300 transition-colors duration-200"> community page</Link>.
                Ask questions, see solutions, or pair up with a study buddy. You're never alone.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">How do I join the community?</h3>
              </div>
              <p className="ml-4 sm:ml-3 text-gray-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-2">
                Check out our <Link href="/community" className="text-lime-400 underline hover:text-lime-300 active:text-white transition-colors duration-200">community page</Link> to join Discord or Facebook groups.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">How does the store work?</h3>
              </div>
              <div className="ml-4 sm:ml-3 text-gray-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-2 space-y-3">
                <p>
                  We're a small operation running things manually. Multiple items might ship separately depending on what they are. Shipping times vary because, well, shipping is weird sometimes.
                </p>
                <p>
                  Everything is final sale for now, as all items are made to order. We're figuring out the logistics and don't want to promise returns we can't handle cleanly. <br />No vex.
                </p>
                <Link 
                  href="/merch" 
                  className="text-base sm:text-lg inline-block mt-2 text-lime-400 hover:text-lime-300 active:text-white underline transition-colors duration-200 font-semibold"
                >
                  Visit the store
                </Link>
              </div>
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}