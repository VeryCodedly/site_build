"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCode,
  faBookOpen,
  faCompass,
  faMicrochip,
  faMoneyBillTrendUp,
  faGlobeAfrica,
  faFire,
} from '@fortawesome/free-solid-svg-icons';


export default function StartPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950/40 text-white px-6 pt-20 pb-28">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <section className="space-y-6 text-center md:text-left">
          {/* <div className="inline-flex items-center gap-2 bg-lime-400/10 px-3 py-1.5 rounded-full border border-lime-400/20 mb-2">
            <FontAwesomeIcon icon={faCompass} className="text-lime-400 text-sm" />
            <span className="text-xs text-lime-400 font-medium tracking-wide">YOUR STARTING POINT</span>
          </div> */}

          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Start <span className="bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent">Here</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300/90 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Welcome to <span className="font-semibold text-lime-400">VeryCodedly</span>.
            If this is your first time here, this page will guide you through the
            best places to begin from courses to articles, and a few
            paths you can follow depending on what you&apos;re trying to learn.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 italic border-l-4 border-lime-400/50 pl-2 md:pl-4 rounded-md">
            <p className="text-sm">Start here. Or wander. Both work. Enjoy.</p>
          </div>
        </section>

        {/* COURSES */}
        <section className="mt-6 space-y-8 group/courses">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/courses:bg-pink-400 group-active/courses:bg-pink-400" />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-white">Learn the Fundamentals
                </motion.h2>
              </div>
              <p className="text-gray-400 max-w-2xl text-sm">
                If you prefer structured learning, start with the courses. VeryCodedly courses are
                designed to move from fundamentals to practical concepts used in real
                projects.
              </p>
            </div>
            <Link
              href="/learn/#courses"
              className="group flex items-center gap-2 text-lime-400 hover:text-lime-200 active:text-lime-200 text-sm font-medium transition-colors"
            >
              View all courses
              <FontAwesomeIcon icon={faArrowRight} className="text-xs group-active:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Course
              title="HTML"
              description="How the web is structured and how browsers interpret documents."
              href="/learn/html-beginner-tutorial"
              icon={faCode}
            />
            <Course
              title="CSS"
              description="Modern layout systems, responsive design, and clean styling."
              href="/learn/css-beginner-tutorial"
              icon={faCode}
            />
            <Course
              title="JavaScript"
              description="Programming fundamentals in the browser and the backbone of modern web apps."
              href="/learn/javascript-programming-foundations"
              icon={faCode}
            />
            <Course
              title="React"
              description="Component-driven development for building interactive applications."
              href="/learn/react-beginner-tutorial"
              icon={faCode}
            />
            <Course
              title="Python"
              description="A powerful language for backend development and automation."
              href="/learn/python-programming-foundations"
              icon={faCode}
            />
          </div>
        </section>

        {/* LEARNING PATHS */}
        <section className="space-y-8 group/paths">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/paths:bg-pink-400 group-active/paths:bg-pink-400" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white">Suggested Learning Paths
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Path
              title="Frontend Path"
              steps={["HTML", "CSS", "JavaScript", "React"]}
              start="learn/#courses"
            />
            <Path
              title="Backend Path"
              steps={["Python", "APIs", "System Design"]}
              start="learn/#courses"
            />
            <Path
              title="Full Stack Path"
              steps={["HTML", "CSS", "JavaScript", "React", "Python"]}
              start="learn/#courses"
            />
          </div>
        </section>

        {/* TECH DEEP DIVES */}
        <section className="space-y-8 group/takes">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/takes:bg-pink-400 group-active/takes:bg-pink-400" />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-white">Tech Takes
                </motion.h2>
              </div>
              <p className="text-gray-400 max-w-2xl text-sm">
                Just what’s happening in tech, how it works, and why it counts.
              </p>
            </div>
            <Link
              href="/read/#posts"
              className="group flex items-center gap-2 text-lime-400 hover:text-lime-200 active:text-lime-200 text-sm font-medium transition-colors"
            >
              Explore
              <FontAwesomeIcon icon={faArrowRight} className="text-xs group-active:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Topic
              title="Artificial Intelligence"
              description="“AI” follows the trends, breakthroughs, and debates in artificial intelligence, spotlighting the tech reshaping industries."
              href="read/subcategory/ai"
              icon={faMicrochip}
            />
            <Topic
              title="Featured"
              description="“Featured” gives you the top stories shaping tech this week, all in one scroll."
              href="read/subcategory/featured"
              icon={faFire}
            />
            <Topic
              title="Digital Money"
              description="“Digital Money” tracks the business side of the tech world: markets, funding, infrastructure, and how money moves."
              href="read/subcategory/digital-money"
              icon={faMoneyBillTrendUp}
            />
            <Topic
              title="Policy & Progress"
              description="“Policy & Progress” covers the tech + society mix: the moves, rules, and trade-offs that steer how we live with technology."
              href="read/subcategory/policy-progress"
              icon={faGlobeAfrica}
            />
          </div>
        </section>

        {/* POPULAR GUIDES */}
        <section className="space-y-6 group/reads">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/reads:bg-pink-400 group-active/reads:bg-pink-400" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white">Popular Reads
            </motion.h2>
          </div>

          <p className="text-gray-400 text-sm max-w-2xl">
            The top stories and helpful guides.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <GuideLink href="/read/openai-is-building-a-github-alt-after-dev-outages">
              OpenAI Is Building a GitHub Alt After Dev Outages
            </GuideLink>
            <GuideLink href="/read/7-fintech-companies-to-watch-in-2026	">
              7 Fintech Companies To Watch In 2026
            </GuideLink>
            <GuideLink href="/read/reading-other-peoples-code-without-hating-it">
              Reading Other People’s Code Without Hating It
            </GuideLink>
            <GuideLink href="/read/how-to-spot-a-phishing-website-in-seconds">
              How to Spot a Phishing Website in Seconds
            </GuideLink>
            <GuideLink href="read/sci-fi-weekend-picks">
              Want Sci-Fi This Weekend? Start With These
            </GuideLink>
            <GuideLink href="/read/children-teen-social-media-bans-where-why-and-how">
              Teen Social Media Bans: Where, Why and How
            </GuideLink>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="relative pt-12">
          {/* <div className="absolute left-0 top-0 w-24 h-px bg-zinc-800" /> */}

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-white pb-2.5">Why We Do This</h2>

            <p className="text-gray-300/90 leading-relaxed">
              VeryCodedly exists to make tech clear and a little less intimidating.
            </p>

            <p className="text-gray-300/90 leading-relaxed">
              We connect how software is built with how it shapes the world around us, whether that’s a new gadget, a coding workflow, or an industry trend most people haven’t noticed yet.
              Instead of treating tech like an exclusive club, we treat it like a conversation. If you're curious enough to ask questions, you're already in the right place.
            </p>

            <div className="py-3 flex items-center gap-2 text-sm text-gray-500">
              <p>Explore the courses. Read the articles. Build something interesting.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Course({ title, description, href, icon }) {
  return (
    <Link href={href} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.92 }}
        className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-400/30 hover:shadow-[0_0_15px_rgba(163,230,53,0.1)] active:border-zinc-400/30 active:shadow-[0_0_15px_rgba(163,230,53,0.1)] transition-all duration-300 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-lime-400 text-sm" />
          </div>
          <span className="text-xs text-gray-600 group-hover:text-white group-active:text-white transition-colors">Course</span>
        </div>
        <h3 className="font-semibold text-white mb-1 group-hover:text-lime-400 group-active:text-lime-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </motion.div>
    </Link>
  );
}

function Topic({ title, description, href, icon }) {
  return (
    <Link href={href} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.92 }}
        className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-400/30 hover:shadow-[0_0_15px_rgba(244,114,182,0.1)] active:border-zinc-400/30 active:shadow-[0_0_15px_rgba(244,114,182,0.1)] transition-all duration-300 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="group-active:translate-x-1 text-lime-400 text-sm" />
          </div>
          <span className="text-xs text-gray-600 group-hover:text-white group-active:text-white transition-colors">Subcategory</span>
        </div>
        <h3 className="font-semibold text-white mb-1 group-hover:text-lime-400 group-active:text-lime-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </motion.div>
    </Link>
  );
}

function GuideLink({ href, children }) {
  return (
    <Link href={href} className="group flex items-center gap-2 bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-3 hover:border-zinc-400/30 hover:shadow-[0_0_10px_rgba(163,230,53,0.05)] active:border-zinc-400/30 active:shadow-[0_0_10px_rgba(163,230,53,0.05)] transition-all duration-200">
      <span className="text-sm text-gray-300 group-hover:text-lime-400 group-active:text-lime-400 transition-colors">{children}</span>
      <FontAwesomeIcon icon={faArrowRight} className="text-xs text-gray-600 group-hover:text-lime-400 group-active:text-lime-400 group-active:translate-x-1 transition-all" />
    </Link>
  );
}

function Path({ title, steps, start }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.92 }}
      className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-4 group hover:border-zinc-400/30 active:border-zinc-400/30 transition-all duration-300">
      <h3 className="font-semibold text-white group-hover:text-lime-400 group-active:text-lime-400 transition-colors">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {steps.map((step, i) => (
          <span key={i} className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded-full">
            {step}
          </span>
        ))}
      </div>
      <Link
        href={start}
        className="group flex items-center gap-2 text-lime-400 text-sm group-hover:text-white group-active:text-white transition-colors"
      >
        Start here
        <FontAwesomeIcon icon={faArrowRight} className="text-xs group-active:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}