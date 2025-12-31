'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faDatabase, faShield, faCookie, faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 text-center space-y-8 sm:space-y-10 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                   shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                   focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                   transition-all duration-300"
        tabIndex={0}
        role="region"
        aria-label="Privacy Policy Section"
      >
        {/* Title */}
        <Motion.h2
          className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Privacy Policy
        </Motion.h2>

        {/* Intro */}
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
        >
          No cookies · No login · No tracking · No bullshit.<br />
          We built this platform to help you learn and keep up with the tech space, not to track or exploit you. Here’s exactly how we handle your data.
        </Motion.p>

        {/* Key Promises */}
        <Motion.ul
          className="text-left max-w-2xl mx-auto text-gray-300/80 text-sm sm:text-base space-y-2 list-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              icon: faUser,
              title: "No login required.",
              desc: "Everything is open and free. No accounts, no sign-up, no passwords."
            },
            {
              icon: faDatabase,
              title: "We store nothing personal.",
              desc: "No email, no name, no profile. Your progress is saved locally in your browser."
            },
            {
              icon: faCookie,
              title: "Cookies? Only for your settings.",
              desc: "We use local storage to remember your course progress — all on your device."
            },
            {
              icon: faShield,
              title: "Secure by design. Your data never leaves your browser.",
              desc: "Encrypted connections (HTTPS), no server tracking, and no third-party scripts."
            },
            {
              icon: faTrash,
              title: "Want to start fresh?",
              desc: "Clear your browser cache or local storage. That’s it — everything resets instantly."
            },
            {
              icon: faLock,
              title: "We never sell your data.",
              desc: "Not to advertisers, not to marketers, not to anyone."
            }
          ].map((item, index) => (
            <Motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group/item"
            >
              <span className="text-lime-400 text-xl mt-0.5 group-hover/item:scale-110 transition-transform">
                <FontAwesomeIcon icon={item.icon} size="md" />
              </span>
              <div>
                <strong className="text-white">{item.title}</strong>
                <p className="text-gray-300/80 text-sm mt-1">{item.desc}</p>
              </div>
            </Motion.li>
          ))}
        </Motion.ul>

        {/* Data Usage Details */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-left max-w-2xl mx-auto space-y-5 text-sm sm:text-base"
        >
          <div>
            <h3 className="text-white font-semibold mb-1">What we collect:</h3>
            <p className="text-gray-300/80 mb-3">
              <strong>Nothing from you.</strong> No personal info, no emails, no IP logging.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">What we store (on your device):</h3>
            <ul className="text-gray-300/80 space-y-2 list-disc list-inside mb-3">
              <li><strong>Course progress</strong> (e.g., “HTML Module 3 completed”)</li>
              {/* <li><strong>Preferences</strong> (dark mode, text size)</li> */}
              <li><strong>That’s it</strong> — all in your browser’s local storage</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-1">What we don’t do:</h3>
            <ul className="text-gray-300/80 space-y-2 list-disc list-inside mb-3">
              <li>No user accounts</li>
              <li>No behavioral tracking</li>
              <li>No ad profiling</li>
              <li>No data sharing with third parties</li>
            </ul>
          </div>
        </Motion.div>

        {/* Call to Action */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="pt-6 border-t border-gray-700/50"
        >
          <p className="text-gray-300/80 text-sm sm:text-base leading-relaxed">
            Got questions? Reach out anytime via our{' '}
            <Link
              href="/contact"
              className="text-lime-400 underline hover:text-lime-300 transition-colors duration-200 font-medium"
            >
              contact page
            </Link>.
          </p>
        </Motion.div>

        {/* Footer Note */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-xs text-gray-500 italic"
        >
          Last updated: November 2025 · We’ll notify you of any major changes.
        </Motion.p>
      </Motion.div>
    </section>
  );
}