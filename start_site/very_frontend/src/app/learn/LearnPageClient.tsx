"use client";

import Image from "next/image";
import Link from "next/link";
import { motion as Motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLongArrowRight,
  faRocket,
  faUsers,
  faCode,
  faServer,
  faBrain,
  faBolt,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import CourseListClient from "./components/CourseListClient";
import { Lessons } from "@/types/post";
import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";

type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  language?: string;
  image?: string;
  alt?: string;
  lessons?: Lessons[];
};

interface Props {
  courses: Course[];
}

export default function LearnPage({ courses }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="bg-gradient-to-b from-black via-black to-zinc-950/40 text-white">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-26 sm:pt-20 pb-10 px-6 sm:px-6 lg:px-8">
        {/* Background gradient */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(163,230,53,0.05),transparent_50%)] pointer-events-none" /> */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,0.05),transparent_50%)] pointer-events-none" /> */}
        
        {/* Content wrapper */}
        <div className="relative max-w-6xl mx-auto flex flex-col items-center justify-center text-center gap-8">
          {/* Pill badge */}
          {/* <div className="inline-flex items-center gap-2 bg-lime-400/10 px-3 py-1.5 rounded-full border border-lime-400/20">
            <FontAwesomeIcon icon={faCompass} className="text-lime-400 text-sm" />
            <span className="text-xs text-lime-400 font-medium tracking-wide">YOUR JOURNEY STARTS HERE</span>
          </div> */}
          
          <h1 className="hero text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-center">
            <span className="inline-block">
              Learn.{" "}
              <Motion.span
                className="inline-block"
                initial={{ color: "#ffffff" }}
                animate={{ color: "#9AE600" }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Code. {" "}
              </Motion.span>
              <Motion.span
                className="inline-block pl-2"
                initial={{ color: "#ffffff" }}
                animate={{ color: "#fb64b6" }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                {" "}Create.
              </Motion.span>
            </span>
          </h1>
          
          <p className="text-gray-400 px-2 sm:px-0 text-md md:text-lg max-w-2xl">
            Beginner-friendly coding lessons that help complex ideas click,
            one concept at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 py-12">
            <Link 
              href="#courses" 
              className="font-bold sm:font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 text-black px-6 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
            >
              Start Learning
            </Link>
            <a 
              href="#featured" 
              className="text-sm text-gray-400 hover:text-white active:text-white transition-colors flex items-center gap-2"
            >
              <span>Featured Lessons</span>
              <FontAwesomeIcon icon={faLongArrowRight} size="sm" />
            </a>
          </div>
          
          {/* <div className="h-0.5 w-24 bg-gradient-to-r from-lime-400 to-lime-400 mt-8 rounded-full"></div> */}
        </div>
      </section>

      {/* WHY THIS EXISTS - ENHANCED */}
      <section className="pt-16 pb-20 px-12 group">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.p 
                  initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
                  className="text-xs uppercase tracking-widest text-gray-500">The Approach</Motion.p>
              </div>
              <h2 className="text-3xl font-bold text-white">Why Learn <span className="text-lime-400">Here</span></h2>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-300/90 text-base leading-relaxed">
                Most coding resources rush you from syntax to frameworks. 
                <span className="text-lime-400 font-medium"> VeryCodedly goes the other way</span>. We start with understanding, then build speed.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { title: "Concept First", desc: "Every lesson explains the why before the how.", icon: faBrain },
                  { title: "No Jargon", desc: "Just what you need to know, nothing more.", icon: faBolt },
                  { title: "Build Confidence", desc: "Ideas stick because they actually make sense.", icon: faRocket },
                  { title: "Learn with Peers", desc: "Join a community that learns together.", icon: faUsers }
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FontAwesomeIcon icon={item.icon} className="text-lime-400 text-sm" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 border-l-4 border-lime-400/50 pl-4 py-1 italic text-sm rounded-md">
                &quot;If you&apos;ve ever felt like coding tutorials move too fast, this is for you.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="bg-black min-h-screen mx-auto px-12 py-20 order-y order-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* <div className="inline-flex items-center gap-2 bg-lime-400/10 px-3 py-1.5 rounded-full border border-lime-400/20 mb-4">
              <FontAwesomeIcon icon={faCode} className="text-lime-400 text-sm" />
              <span className="text-xs text-lime-400 font-medium tracking-wide">STRUCTURED LEARNING</span>
            </div> */}
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Courses from <span className="text-lime-400">VeryCodedly</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start with the fundamentals.
            </p>
          </div>
          <div className="w-[98%] md:w-[90%] lg:w-[75%] mx-auto">
            <CourseListClient courses={courses} />
          </div>
        </div>
      </section>

      {/* LEARNING PATHS - ENHANCED */}
      <section className="max-w-6xl mx-auto min-h-screen py-20 px-12 flex flex-col items-left justify-center group/bar">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
             className="text-xs uppercase tracking-widest text-gray-500">GUIDED JOURNEYS</Motion.p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Choose Your <span className="text-lime-400">Learning Path</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Not sure where to start? Follow a path designed to take you from beginner to confident.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Frontend Starter",
              desc: "HTML, CSS, JavaScript - build the visual layer of the web you interact with.",
              icon: faCode,
              color: "lime",
              href: "/learn/html-beginner-tutorial",
              steps: ["HTML", "CSS", "JavaScript", "React"]
            },
            {
              name: "Backend Mastery",
              desc: "APIs, databases, Django - create powerful, robust server-side logic.",
              icon: faServer,
              color: "lime",
              href: "/learn/python-programming-foundations",
              steps: ["Python", "APIs", "Django"]
            },
            {
              name: "AI & Data Science",
              desc: "Python, Machine Learning, data handling - dive into the future of software.",
              icon: faBrain,
              color: "lime",
              href: "/learn/python-programming-foundations",
              steps: ["Python", "Pandas", "ML Basics"]
            },
          ].map((track, index) => (
            <Motion.div
              key={track.name}
              className="bg-zinc-900/60 border border-zinc-900 p-6 rounded-2xl 
                       hover:border-zinc-700/50 group hover:shadow-[0_0_6px_#222222]
                       backdrop-blur-sm transition-all duration-300 group relative"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              tabIndex={0}
            >
              <div className={`w-10 h-6 rounded-lg bg-lime-400/10 flex items-center justify-center mb-3`}>
                <FontAwesomeIcon icon={track.icon} className={`text-lime-400`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-lime-400 group-active:text-lime-400 transition-colors">
                {track.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{track.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {track.steps.map((step, i) => (
                  <span key={i} className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-full">
                    {step}
                  </span>
                ))}
              </div>
              <Link href={track.href} className="inline-flex items-center gap-2 text-sm text-lime-400 group-hover:text-white group-active:text-white transition-colors">
                Start this path <FontAwesomeIcon icon={faArrowRight} size="xs" className="group-active:translate-x-1 transition-transform" />
              </Link>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED LESSONS - ENHANCED */}
      <section id="featured" className="relative min-h-screen w-full mx-auto px-12 py-20 group/bar flex flex-row items-start">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-gray-500 ml-2 mb-2 flex items-center gap-3">
              <span className="w-1.5 h-4 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400"></span>
              <Motion.span
                initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>START HERE
              </Motion.span>
            </p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-lime-400">Featured</span> Lessons
            </h2>
            <p className="text-gray-400 max-w-xl tracking-wide">
              Solid introductions to core concepts. Pick one and start learning in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Intro to Python",
                slug: "introduction-to-python",
                course: "python-programming-foundations",
                desc: "Python is one of the most widely used languages in the world. You'll find it everywhere: powering apps like Instagram, helping scientists train AI models, and running simple scripts that automate everyday tasks.",
                image: "logos/python.svg",
                level: "Beginner",
                duration: "10+ min"
              },
              {
                name: "What is JavaScript?",
                slug: "what-is-javascript",
                course: "javascript-programming-foundations",
                desc: "JavaScript is the programming language that brings web pages to life. While HTML handles structure and CSS handles style, JavaScript controls interactivity — it lets websites respond to clicks, inputs, and real-time data.",
                image: "logos/javascript.svg",
                level: "Beginner",
                duration: "10+ min"
              }
            ].map((topic, idx) => (
              <Motion.div
                key={topic.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-zinc-900/50 border border-zinc-900 rounded-2xl p-6 active:border-zinc-500/50 active:shadow-[0_0_6px_#222222]
                   hover:border-zinc-700/50 hover:shadow-[0_0_6px_#222222] transition-all duration-500"
              >
                <Link href={`/learn/${topic.course}/${topic.slug}`} className="flex flex-row gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold tracking-tighter text-pink-400 uppercase">
                        Starter Guide
                      </span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-600">{topic.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-lime-400 group-active:text-lime-400 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {topic.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{topic.level}</span>
                      <div className="flex items-center gap-2 text-lime-400 font-medium text-sm group-hover:text-white group-active:text-white transition-colors">
                        Start Now <FontAwesomeIcon icon={faLongArrowRight} className="group-active:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] mx-auto sm:mx-0">
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Image
                        fill
                        src={topic.image}
                        alt={topic.name}
                        className="relative z-10 object-contain group-hover:scale-105 group-active:scale-110 transition-transform duration-300"
                        sizes="100px"
                      />
                    </div>
                  </div>
                </Link>
              </Motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#courses" className="text-sm inline-flex items-center gap-2 text-gray-400 hover:text-white active:text-white transition-colors">
              Browse courses <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </a>
          </div>
        </div>
      </section>

      {/* TOOLS & RESOURCES - ENHANCED */}
      <section className="py-20 w-full mx-auto px-12 group">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.p
                  initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
                 className="text-xs uppercase tracking-widest text-gray-500">YOU&apos;LL USE THESE
                 </Motion.p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black">
                Tools & <span className="text-lime-400">Resources</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-md tracking-wide">
              The technologies we teach are used in production. You&apos;ll learn how.
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-4">
            {[
              { src: "/logos/vscode.svg", name: "VS Code" },
              { src: "/logos/react.svg", name: "React" },
              { src: "/logos/javascript.svg", name: "JavaScript" },
              { src: "/logos/python.svg", name: "Python" },
              { src: "/logos/django-plain.svg", name: "Django" },
              { src: "/logos/git.svg", name: "Git" },
            ].map((icon, idx) => (
              <Motion.div
                key={idx}
                whileHover={{ scale: 0.99, y: -1 }}
                className="bg-zinc-900/50 border border-zinc-900 p-3 rounded-xl hover:border-zinc-500/50 hover:shadow-[0_0_6px_#222222] transition-all duration-300 group"
                tabIndex={0}
              >
                <Image 
                  src={icon.src} 
                  alt={icon.name} 
                  className="w-12 h-12 mx-auto mb-2 group-hover:brightness-110 transition-all" 
                  width={48} 
                  height={48} 
                />
                <p className="text-xs text-center text-gray-600 transition-colors">{icon.name}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION - ENHANCED */}
      <section className="py-20 w-full mx-auto px-12 group">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.p
                  initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
                 className="text-xs uppercase tracking-widest text-gray-500">JOIN US
                 </Motion.p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                Join the <span className="text-lime-400">Community</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Ask questions, share progress, get feedback, and learn with 
                people who are also figuring things out. No pressure.
              </p>
              <div className="flex gap-8">
                <Link
                  href="https://discord.gg/53wVsqEcbE"
                  target="_blank"
                  className="font-bold sm:font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 text-black px-6 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  Join Discord
                  {/* <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" /> */}
                </Link>
                <Link
                  href="/community"
                  className="text-gray-400 text-sm hover:text-white active:text-white transition-colors flex items-center gap-2"
                >
                  Learn more <FontAwesomeIcon icon={faLongArrowRight} size="sm" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Study", label: "Buddies" },
                { stat: "24/7", label: "Support" },
                { stat: "Free", label: "Always" },
                { stat: "Zero", label: "Judgment" }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/50 border-1 border-zinc-900 rounded-xl p-6 text-center hover:border-zinc-500/50 transition-colors">
                  <div className="text-2xl font-bold text-white">{item.stat}</div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="max-w-6xl mx-auto mt-12 px-6 text-center pb-12">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4" />
        <p className="text-xs text-gray-700 pb-6">
          We&apos;ll keep it simple, one concept at a time.
        </p>
      </div>
    </div>
  );
}
