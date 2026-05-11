'use client';

import { motion as Motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faYoutube, faDiscord, faInstagram, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 sm:p-12 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Header */}
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 text-center group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
          >
            About Us
          </Motion.h2>

          {/* Intro text */}
          <div className="mt-6 space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              <span className='text-lime-400'>VeryCodedly</span> is a place for people who are curious about technology but don’t necessarily want the usual tech-industry noise that comes with it.
            </p>
            <p>
              Here we talk about coding, software, hardware, AI, dev tools, and everything in between. 
              Technology changes how the world works everyday, so that could mean breaking down a new tool in a coding tutorial, or digging up the info buried in a headline.
            </p>
            <p>
              The goal isn’t to impress you with jargon. It’s to make complicated things make sense. Technology moves fast enough already, so this is the corner of the interweb where we slow down just enough to understand it.
            </p>
          </div>

          {/* Mission & Values - two columns */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {/* Mission */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs" />
                <h3 className="text-xl font-semibold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className='text-lime-400'>VeryCodedly</span> exists to make tech clear and a little less intimidating. 
                We connect how software is built with how it shapes the world around us, whether that’s a new gadget, a coding workflow, or an industry trend people haven’t noticed yet.
                <br /><br />
                Instead of treating tech like an exclusive club, we treat it like a conversation. If you're curious enough to ask questions, you're already in the right place.
              </p>
            </div>

            {/* Values */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs" />
                <h3 className="text-xl font-semibold text-white">Our Values</h3>
              </div>
              <ul className="space-y-3 text-gray-300 text-sm">
                {[
                  "No gatekeeping. Everyone starts somewhere.",
                  "Clarity over jargon. We keep it simple here.",
                  "Community over competition. Learning isn’t a race.",
                  "Curiosity always beats pretending to know everything.",
                  "Technology should feel understandable, not mysterious.",
                  "Lifelong learning. Nobody ever 'finishes' tech.",
                ].map((value, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Closing statement */}
          <div className="mt-8 text-gray-300 text-sm leading-relaxed border-t border-gray-800 pt-6">
            <p>
              If something is interesting, confusing, useful, or important, it’s probably worth talking about. That’s the entire idea behind <span className='text-lime-400'>VeryCodedly</span>.
            </p>
          </div>

          {/* Social links (reimagined as a grid of badges) */}
          <div className="mt-10 pt-6 border-t border-gray-800">
            <p className="text-gray-300 text-sm mb-5 lg:px-10 text-center">
              You can find VeryCodedly around the interweb where we share new articles, experiments, and occasional tech rabbit holes:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "YouTube", icon: faYoutube, url: "https://www.youtube.com/@verycodedly" },
                { name: "Discord", icon: faDiscord, url: "https://discord.gg/53wVsqEcbE" },
                { name: "Twitter", icon: faTwitter, url: "https://x.com/verycodedly" },
                { name: "Substack", icon: faEnvelope, url: "https://verycodedly.substack.com" },
                { name: "Instagram", icon: faInstagram, url: "https://instagram.com/verycodedly" },
                { name: "Medium", icon: faMedium, url: "https://medium.com/@verycodedly" },
              ].map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700/60 bg-white/5 text-gray-300 hover:bg-lime-400/10 hover:border-lime-400/30 hover:text-white transition-all duration-200 group"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lime-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center text-gray-500 text-xs italic pt-4 border-t border-gray-800">
            If you're learning to code, exploring tech, or just trying to keep up with the pace of the industry, welcome. Pull up a chair.
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
