"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCoffee, faComment, faEnvelope, faPeopleGroup, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function SupportPage() {
  return (
    <section className="relative min-h-screen py-16 mb-10 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Card */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group rounded-2xl p-8 sm:p-12 mb-8 text-center border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
          >
            Support VeryCodedly
          </Motion.h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            VeryCodedly is run by a small, dedicated team. Your support helps us keep our content free, our community active,
            and our servers running. Every bit makes a difference.
          </p>
        </Motion.div>

        {/* 3‑column grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-5">
          {/* Financial Support */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/3 text-sm sm:text-base backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Financial support</h3>
            <p className="text-gray-300 text-sm mb-5">
              Buy merch, donate or give us a shoutout on socials. Pick whatever works for you.
            </p>
            <div className="space-y-3">
              <Link
                href="/merch"
                className="flex items-center justify-between w-full px-6 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all duration-200 group"
              >
                <span>Shop VeryCodedly</span>
                <FontAwesomeIcon icon={faShoppingCart} className="text-lime-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="https://ko-fi.com/verycodedly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all duration-200 group"
              >
                <span>Buy me a coffee</span>
                <FontAwesomeIcon icon={faCoffee} className="text-lime-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="https://github.com/sponsors/VeryCodedly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all duration-200 group"
              >
                <span>Sponsor on GitHub</span>
                <FontAwesomeIcon icon={faGithub} className="text-lime-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Motion.div>

          {/* Non‑financial support */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/3 text-sm sm:text-base backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Support without spending</h3>
            <p className="text-gray-300 text-sm mb-4">
              Share, star, join, and help other learners. These make a huge difference to discoverability.
            </p>
            <ul className="space-y-2 mb-5 text-gray-300 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                Share an article on Twitter, LinkedIn, or Reddit
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                Star the repo on GitHub
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                Invite friends to our Discord
              </li>
            </ul>
            <div className="flex gap-3">
              <Link
                href="https://twitter.com/intent/tweet?text=Into%20coding%20+%20tech%20trends?%20Explore%20VeryCodedly%20-%20https://verycodedly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 transition-all duration-200 group"
              >
                Share <FontAwesomeIcon icon={faTwitter} className="text-lime-400 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="https://github.com/VeryCodedly/site_build"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 transition-all duration-200 group"
              >
                Star <FontAwesomeIcon icon={faGithub} className="text-lime-400 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Motion.div>

          {/* Direct support & feedback */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/3 text-sm sm:text-base backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Direct support & feedback</h3>
            <p className="text-gray-300 text-sm mb-5">
              Want to help shape the site? Here’s how you can get involved or contact us directly.
            </p>
            <div className="space-y-3">
              <Link
                href="https://discord.gg/53wVsqEcbE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all duration-200 group"
              >
                <span>Join the community</span>
                <FontAwesomeIcon icon={faPeopleGroup} className="text-lime-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="mailto:connect@verycodedly.com?subject=Support%20VeryCodedly"
                className="flex items-center justify-between w-full px-6 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all duration-200 group"
              >
                <span>Email us</span>
                <FontAwesomeIcon icon={faEnvelope} className="text-lime-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between w-full px-6 py-2 rounded-xl border border-gray-700/70 text-gray-200 hover:bg-lime-400/10 hover:border-lime-400/30 transition-all duration-200 group"
              >
                <span>Send feedback</span>
                <FontAwesomeIcon icon={faComment} className="text-lime-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Motion.div>
        </div>

        {/* Quick FAQ Card */}
        <Motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group bg-white/3 text-sm sm:text-base backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Quick FAQ</h3>
            </div>
            <div className="space-y-5">
              <div>
                <dt className="font-medium text-gray-100">Will support change the content?</dt>
                <dd className="text-gray-300 text-sm mt-1">No. The core content remains free and available to everyone.</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-100">Is support tax-deductible?</dt>
                <dd className="text-gray-300 text-sm mt-1">
                  We’re a community-driven project, not a registered charity yet, so contributions aren’t tax-deductible.
                  But every bit goes directly into keeping our resources free for everyone.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-100">Can I contribute content?</dt>
                <dd className="text-gray-300 text-sm mt-1">Yes. Mail us or open a PR on our GitHub repo to get started.</dd>
              </div>
            </div>
          </Motion.div>

          {/* Social / SHELLy Card */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group bg-white/3 backdrop-blur-lg border border-gray-700/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 ml-6 mt-6">
              <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Say Hi to SHELLy on our socials</h3>
            </div>
            {/* Image container with proper dimensions */}
            <div className="relative w-full max-w-xs mx-auto aspect-square">
              <Image
                src="/images/SHELLy-smile.png"
                alt="SHELLy says Hi"
                fill
                className="object-contain scale-110 sm:scale-150 mx-auto rounded-2xl"
                sizes="..."
                loading="eager"
              />
            </div>
          </Motion.div>
        </Motion.div>

        {/* Footer thank‑you card */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/3 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <p className="text-gray-300 text-sm">
            Thank you ❤️ for reading, learning, and being part of this little corner of the interweb.
          </p>
          <p className="mt-2 text-gray-400 text-sm">Every share, star, and purchase waters this tree. 🌳</p>
        </Motion.div>
      </div>
    </section>
  );
}