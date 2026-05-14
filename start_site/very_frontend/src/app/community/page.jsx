'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-stretch opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 sm:p-12 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 text-center"
            whileHover={{ scale: 1.02 }}
          >
            Community
          </Motion.h2>

          <p className="mt-6 text-gray-300 text-sm leading-relaxed text-center">
            Learning is better when you’re not alone. Our community is a place to ask questions and learn alongside people who are genuinely curious about how tech works and where it’s headed.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {/* Ways to Join */}
            <div className='group'>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400" />
                <h3 className="text-xl font-semibold text-white">Ways to Join</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                  <span>
                    Chat with people on{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://discord.gg/53wVsqEcbE"
                      className="text-lime-400 hover:text-lime-300 active:underline active:text-white transition-colors"
                    >
                      Discord
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                  <span>
                    Join conversations in our{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://facebook.com/verycodedly"
                      className="text-lime-400 hover:text-lime-300 active:underline active:text-white transition-colors"
                    >
                      Facebook
                    </Link>{" "}
                    group
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
                  <span>Collaborate on community projects</span>
                </li>
              </ul>
            </div>

            {/* Why It Matters */}
            <div className='group'>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400" />
                <h3 className="text-xl font-semibold text-white">Why It Matters</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                You’re not learning alone, you’re joining a network of people happy
                to share tips, solve problems, and celebrate progress.
              </p>
            </div>
          </div>

          {/* Slower Conversations */}
          <div className="group mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400" />
              <h3 className="text-xl font-semibold text-white">Slower Conversations</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Not all community convo happens in real time. We also use{" "}
              <Link
                href="https://verycodedly.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:text-lime-300 active:underline active:text-white transition-colors"
              >
                Substack
              </Link>{" "}
              for longer reflections, shared context, and ideas that benefit from a little more space.
            </p>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}