'use client';

import { motion as Motion } from 'framer-motion';


export default function AboutPage() {

  return (
    <>
      <section className="relaive min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
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
          aria-label="About Us Section"
        >
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Us
          </Motion.h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed pb-6">
            VeryCodedly is a community-driven platform that isn’t just about learning how to code.
            It’s about understanding the world that builds around it. We bridge the gap between tech
            education and tech culture, helping people not only learn how technology works but also why it matters.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Our Mission</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                To connect tech education with the culture around it, helping people see both how
                technology works and why it shapes the world we live in.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Our Values</h3>
              <ul className="text-gray-400 text-sm sm:text-base list-disc list-inside space-y-1">
                <li>No gatekeeping</li>
                <li>Accessibility & clarity</li>
                <li>Community over competition</li>
                <li>Curiosity & lifelong learning</li>
              </ul>
            </div>
          </div>
        </Motion.div>
      </section>
    </>
  );
}