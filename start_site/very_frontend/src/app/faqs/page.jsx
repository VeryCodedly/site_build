'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function FAQsPage() {
  return (
    <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                   shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                   focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                   transition-all duration-300"
        tabIndex={0}
        role="region"
        aria-label="Frequently Asked Questions Section"
      >
        <Motion.h2
          className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          FAQs
        </Motion.h2>
        <div className="space-y-6 sm:space-y-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Is this platform free?</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Yes! Most of our content is free to access. Premium resources may come later, 
              but our goal is to keep learning open.
            </p>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Do I need prior coding experience?</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Nope. We design lessons and articles for absolute beginners all the way to advanced learners.
            </p>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">How do I join the community?</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Check out our <Link href="/community" className="text-lime-400 underline hover:text-lime-300 transition-colors duration-200">community page</Link> 
              to join Discord or Facebook groups.
            </p>
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
}
