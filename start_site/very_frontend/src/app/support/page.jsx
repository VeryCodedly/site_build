'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function SupportPage() {
  return (
    <section className="relative min-h-screen py-12 sm:py-20 px-6 sm:px-8 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 text-cente space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                   shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                   focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                   transition-all duration-300"
        tabIndex={0}
        role="region"
        aria-label="Support Section"
      >
        <Motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Motion.h2
            className="text-3xl sm:text-4xl text-center py-4 font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Help keep VeryCodedly alive
          </Motion.h2>
          <p className="text-gray-300 text-sm sm:text-base text-center leading-relaxed max-w-2xl mx-auto">
            VeryCodedly is built by a small, obsessed team. Your support keeps our content free,
            the community warm, and the servers humming. Every bit helps — and
            none of it changes who we are.
          </p>
        </Motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                       shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                       focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                       transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Financial support</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              One-off or recurring donations fund hosting, tools, and new
              tutorials. Pick whatever works for you.
            </p>
            <div className="space-y-3">
              <Link
                href="https://ko-fi.com/verycodedly"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-sm sm:text-base px-4 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Buy me a coffee ☕
              </Link>
              <Link
                href="https://www.patreon.com/YOUR_HANDLE"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-sm sm:text-base px-4 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Become a Patron
              </Link>
              <Link
                href="https://github.com/sponsors/VeryCodedly"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-sm sm:text-base px-4 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Sponsor on GitHub
              </Link>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                       shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                       focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                       transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Support without spending</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              Share, star, join, and help other learners. These actions make a
              huge difference to discoverability and morale.
            </p>
            <ul className="text-gray-400 text-sm sm:text-base list-disc list-inside space-y-2 mb-4">
              {[
                "Share an article on Twitter, LinkedIn, or Reddit",
                "Star the repo on GitHub",
                "Invite friends to our Discord",
              ].map((item, index) => (
                <Motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  {item}
                </Motion.li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link
                href="https://twitter.com/intent/tweet?text=Into%20coding%20+%20tech%20trends?%20Check%20out%20Very%20Codedly%20-%20https://verycodedly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm sm:text-base px-3 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Share <FontAwesomeIcon icon={faTwitter} className="inline-flex ml-1" size="md" />
              </Link>
              <Link
                href="https://github.com/VeryCodedly/site_build"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm sm:text-base px-3.5 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Star <FontAwesomeIcon icon={faGithub} className="inline ml-1" size="lg" />
              </Link>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-2xl border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                       shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                       focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                       transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Direct support & feedback</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              Want to help shape the site? Here’s how you can get involved or contact us directly.
            </p>
            <div className="space-y-3">
              <Link
                href="/community"
                className="block w-full text-center text-sm sm:text-base px-4 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Join the community
              </Link>
              <Link
                href="mailto:verycodedly@gmail.com?subject=Support%20VeryCodedly"
                className="block w-full text-center text-sm sm:text-base px-4 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Email us
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center text-sm sm:text-base px-4 py-2 rounded-lg border-2 border-gray-700/60 text-white hover:bg-lime-400/20 
                           active:bg-lime-400/20 focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                Send feedback
              </Link>
            </div>
          </Motion.div>
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 rounded-2xl border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                     shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                     focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                     transition-all duration-300"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Quick FAQ</h3>
          <div className="space-y-3 text-sm sm:text-base">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <dt className="font-medium text-gray-300">Will support change the content?</dt>
              <dd className="text-gray-400">No — the core content remains free and available to everyone.</dd>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <dt className="font-medium text-gray-300">Is support tax-deductible?</dt>
              <dd className="text-gray-400">We aren’t a non-profit; check individual platforms for their policies.</dd>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <dt className="font-medium text-gray-300">Can I contribute content?</dt>
              <dd className="text-gray-400">Yes — email us or open a PR on our GitHub repo to get started.</dd>
            </Motion.div>
          </div>
        </Motion.div>

        <Motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="p-6 rounded-2xl border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                     shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                     focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 
                     focus:ring-offset-white/20 text-center transition-all duration-300"
        >
          <p className="text-gray-400 text-sm sm:text-base">
            Thank you ❤️ for reading, learning, and being part of this little corner of the web.
          </p>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">Every share, star, and coffee waters this tree. 🌳</p>
        </Motion.footer>
      </Motion.div>
    </section>
  );
}
