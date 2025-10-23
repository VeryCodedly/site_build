'use client';

import { motion as Motion } from 'framer-motion';

export default function CommunityPage() {
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
        aria-label="Community Section"
      >
        <Motion.h2
          className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Community
        </Motion.h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Learning is better when you’re not alone. Our community brings together tech 
          learners, builders, and tinkerers to support each other, share knowledge, and grow together.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Ways to Join</h3>
            <ul className="text-gray-400 text-sm sm:text-base list-disc list-inside space-y-1">
              <li>Chat with peers on Discord</li>
              <li>Join discussions in our Facebook group</li>
              <li>Collaborate on community projects</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Why It Matters</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              You’re not just learning alone — you’re joining a network of people excited 
              to share tips, solve problems, and celebrate progress.
            </p>
          </div>
        </div>
      </Motion.div>
    </section>
  );
}
