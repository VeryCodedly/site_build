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
      <section className="pt-16 pb-20 px-6 group">
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
                  <div key={i} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 flex items-start gap-3">
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
                &quot;If you&apos;ve ever felt like code explanations move too fast, this is for you.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="bg-black min-h-screen mx-auto px-6 py-20 order-y order-zinc-900">
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
              Start with the fundamentals. Each course builds on the last.
            </p>
          </div>
          <div className="w-[98%] md:w-[90%] lg:w-[75%] mx-auto">
            <CourseListClient courses={courses} />
          </div>
        </div>
      </section>

      {/* LEARNING PATHS - ENHANCED */}
      <section className="max-w-6xl mx-auto min-h-screen py-20 px-6 flex flex-col items-left justify-center group/bar">
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
              steps: ["Python", "APIs", "Databases", "Django"]
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
              className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl 
                       hover:border-zinc-500/50 group hover:shadow-[0_0_6px_#222222]
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
      <section id="featured" className="relative min-h-screen w-full mx-auto px-6 py-20 group/bar flex flex-row items-start">
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
                className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 active:border-zinc-500/50 active:shadow-[0_0_6px_#222222]
                   hover:border-zinc-500/50 hover:shadow-[0_0_6px_#222222] transition-all duration-500"
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
      <section className="py-20 w-full mx-auto px-6 group">
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
                className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-zinc-500/50 hover:shadow-[0_0_6px_#222222] transition-all duration-300 group"
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
      <section className="py-20 w-full mx-auto px-6 group">
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
              <div className="flex gap-4">
                <Link
                  href="https://discord.gg/53wVsqEcbE"
                  target="_blank"
                  className="font-bold sm:font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 text-black px-6 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
                >
                  Join Discord
                  {/* <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" /> */}
                </Link>
                {/* <Link
                  href="/community"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  Learn more <FontAwesomeIcon icon={faLongArrowRight} size="sm" />
                </Link> */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Study", label: "Buddies" },
                { stat: "24/7", label: "Support" },
                { stat: "Free", label: "Always" },
                { stat: "Zero", label: "Judgment" }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 text-center hover:border-zinc-500/50 transition-colors">
                  <div className="text-2xl font-bold text-white">{item.stat}</div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="max-w-6xl mx-auto px-6 text-center pb-24">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4" />
        <p className="text-xs text-gray-700 pb-6">
          We keep it simple, one concept at a time.
        </p>
      </div>
    </div>
  );
}
//  "use client";
 
//  import Image from "next/image";
//  import Link from "next/link";
//  import { motion as Motion } from "framer-motion"
//  // import CourseList from "./components/CourseList";
//  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//  import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
//  import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
//  import CourseListClient from "./components/CourseListClient";
//  import { Lessons } from "@/types/post";
//  type Course = {
//    id: number;
//    slug: string;
//    title: string;
//    description: string;
//    language?: string;
//    image?: string;
//    alt?: string;
//    lessons?: Lessons[];
//  };
//  interface Props {
//    courses: Course[];
//  }
//  export default function LearnPage({ courses }: Props) {
//    return (
//      <div>
//        <section className="relative w-full min-h-screen my-auto bg-black text-white overflow-hidden pt-30 sm:pt-24 pb-0 sm:pb-12 px-8 sm:px-6 lg:px-8">
//          {/* subtle grid / pattern background */}
//          <div className="absolute inset-0 bg-linear-gradient(135deg, #0f111a, #1a1c2c) bg-center bg-cover opacity-20 pointer-events-none"></div>
//          {/* content wrapper */}
//          <div className="relative max-w-6xl mx-auto my-auto flex flex-col items-center justify-center text-center gap-8">
//            <h1 className="hero relative text-6xl sm:text-7xl font-bold leading-tight text-center text-white">
//              {/* Static fallback layer to prevent layout jump */}
//              <span className="inline-block hero absolute inset-0 justify-center items-center opacity-0 select-none">
//                Learn. <span className="text-lime-400 mx-1">Code.</span>{" "}
//                <span className="text-pink-400 mx-1">Create.</span>{" "}
//              </span>
//              {/* Animated color fade-in */}
//              <span
//                className="px-30 sm:px-0 inline-block"
//               //  initial={{ opacity: 0 }}
//               //  animate={{ opacity: 1 }}
//               //  transition={{ duration: 0.4 }}
//              >
//                Learn.{" "}
//                <Motion.span
//                  className="mx-1"
//                  initial={{ color: "#ffffff" }}
//                  animate={{ color: "#9AE600" }}
//                  transition={{ delay: 0.3, duration: 1 }}
//                >
//                Code.{" "}
//                </Motion.span>
//                {/* <Motion.span
//                className="mx-1"
//                initial={{ color: "#ffffff" }}
//                animate={{ color: "#fb64b6" }}
//                transition={{ delay: 0.6, duration: 1 }}
//              >
//                Think
//              </Motion.span>{" "}
//              Creatively. */}
//                <span className="inline-flex flex-wrap justify-center items-center gap-x-1">
//                  <Motion.span
//                    className="mx-0"
//                    initial={{ color: "#ffffff" }}
//                    animate={{ color: "#fb64b6" }}
//                    transition={{ delay: 0.6, duration: 1 }}
//                  >
//                  Create.
//                  </Motion.span>
//                  {/* <span>&nbsp;Creatively.</span> */}
//                </span>
//              </span>
//            </h1>
//            <p className="text-gray-400 px-2 sm:px-0 text-md md:text-lg max-w-2xl">
//              Beginner-friendly coding lessons that help complex ideas click,
//              one concept at a time.
//              {/* Every concept explained clearly — the VeryCodedly way. */}
//            </p>
//            <div className="h-0.5 w-24 bg-lime-400/70 mt-4 mb-8 rounded-full"></div>
//            <Motion.h2
//              className="text-4xl font-bold mb-12 text-left text-white/90"
//              initial={{ opacity: 0, y: 20 }}
//              whileInView={{ opacity: 1, y: 0 }}
//              transition={{ duration: 0.6 }}
//            >
//              <FontAwesomeIcon className="text-7xl sm:text-7xl" icon={faGraduationCap} />
//            </Motion.h2>
//          </div>
//        </section>

//       {/* WHY THIS EXISTS */}
//      <section className="border-t border-zinc-900 py-24">
//        <div className="w-[80%] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
//          <div>
//            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">The Approach</p>
//            <h2 className="text-2xl font-semibold text-white">Why Learn</h2>
//          </div>
//          <div className="md:col-span-2 text-sm sm:text-base text-gray-300/90 leading-relaxed space-y-4">
//            <p>
//              Some coding resources rush you from syntax to frameworks. VeryCodedly goes the other way,
//              we start with understanding, then build speed.
//            </p>
//            <p>
//              These lessons are designed to help ideas stick, not overwhelm. If you’ve ever felt like code
//              explanations move too fast, this is for you.
//            </p>
//          </div>
//        </div>
//      </section>
//        <section className="bg-black min-h-screen mx-auto px-8 py-22 border-y border-zinc-900">
//          <Motion.h2
//            className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white/90"
//            initial={{ opacity: 0, y: 20 }}
//            whileInView={{ opacity: 1, y: 0 }}
//            transition={{ duration: 0.6 }}
//            viewport={{ once: true }}
//          >
//            <span className="text-white">Courses from <span className="text-lime-400">VeryCodedly</span></span>
//          </Motion.h2>
//          <div className="space-y-2.5 w-[98%] md:w-[90%] lg:w-[75%] mx-auto">
//            {/* <div className="absolute inset-0 bg-[url('/images/bg-plain.jpg')] bg-center bg-stretch opacity-50"></div> */}
//            {/* <div className=""> */}
//            <CourseListClient courses={courses} />
//            {/* </div> */}
//          </div>
//        </section>

//        {/* LEARNING PATHS */}
//        <section className="bg-gradient-to-b from-black to-zinc-950/60 max-w-4xl md:max-w-3xl lg:max-w-5xl mx-auto min-h-screen py-22 px-8 flex flex-col items-left justify-center">
//          <Motion.h2
//            className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 px-2 text-left text-white/90"
//            initial={{ opacity: 0, y: 20 }}
//            whileInView={{ opacity: 1, y: 0 }}
//            transition={{ duration: 0.6 }}
//            viewport={{ once: true }}
//          >
//            Choose Your <span className="text-lime-400 inline-flex flex-wrap justify-center items-center gap-x-1">Learning Path</span>
//          </Motion.h2>
//          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-5">
//            {[
//              {
//                name: "Frontend Starter",
//                desc: "HTML, CSS, JavaScript - build the visual layer of the web you interact with.",
//              },
//              {
//                name: "Backend Mastery",
//                desc: "APIs, databases, Django - create powerful, robust server-side logic.",
//              },
//              {
//                name: "AI & Data Science",
//                desc: "Python, Machine Learning, data handling - dive into the future of software.",
//              },
//            ].map((track) => (
//              <Motion.div
//                key={track.name}
//                className="bg-zinc-900/40 border border-zinc-900 m-3 sm:m-0 p-6 rounded-2xl 
//                            hover:shadow-[0_0_10px_#222222] backdrop-blur-md transition-all"
//                whileHover={{ y: -5 }}
//                tabIndex={0}
//              >
//               {/* // <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Path</p> */}
//                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{track.name}</h3>
//                <p className="text-gray-400 text-sm leading-relaxed">{track.desc}</p>
//              </Motion.div>
//            ))}
//          </div>
//        </section>

//        {/* FEATURED LESSONS */}
//        <section className="bg-gradient-to-b to-zinc-900/70 from-zinc-950/60 relative min-h-screen w-full mx-auto px-6 sm:px-18 py-28 flex flex-col items-start border-t border-zinc-900">
//          <div className="absolute inset-0 bg-center bg-stretch opacity-40"></div>
//            <p className="text-xs uppercase tracking-widest text-gray-500 ml-2 sm:ml-0 mb-2">Start Here</p>
//          <Motion.h2
//            className="relative text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 text-start text-white/90"
//            initial={{ opacity: 0, y: 20 }}
//            whileInView={{ opacity: 1, y: 0 }}
//            transition={{ duration: 0.6 }}
//            viewport={{ once: true }}
//          >
//            <span className="text-lime-400 ml-2 sm:ml-0">Featured</span> Lessons
//          </Motion.h2>
//          <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
//            {[
//              {
//                name: "Intro to Python",
//                slug: "introduction-to-python",
//                course: "python-programming-foundations",
//                desc: "Python is one of the most widely used languages in the world. You'll find it everywhere: powering apps like Instagram, helping scientists train AI models, and running simple scripts that automate everyday tasks.",
//                image: "logos/python.svg"
//              },
//              {
//                name: "What is JavaScript?",
//                slug: "what-is-javascript",
//                course: "javascript-programming-foundations",
//                desc: "JavaScript is the programming language that brings web pages to life. While HTML handles structure and CSS handles style, JavaScript controls interactivity — it lets websites respond to clicks, inputs, and real-time data.",
//                image: "logos/javascript.svg"
//              }
//            ].map((topic) => (
//              <Motion.div
//                key={topic.name}
//                className="flex flex-col sm:flex-row p-6 m-3 sm:m-0 rounded-2xl shadow bg-zinc-900/50 border border-zinc-800 group hover:-translate-y-[5px] 
//                   hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-1 sm:gap-4"
//              >
//                <Link href={`/learn/${topic.course}/${topic.slug}`} className="inline-flex items-center gap-1 w-full">
//                  {/* Left Text Section */}
//                  <div className="flex-1 flex flex-col justify-between space-x-2">
//                    <p className="text-xs font-semibold tracking-tighter text-pink-400 uppercase mb-2">
//                      Starter Guide
//                    </p>
//                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-100 group-hover:text-lime-400 transition leading-tight">
//                      {topic.name}
//                    </h3>
//                    <p className="text-sm text-gray-300 line-clamp-4 sm:line-clamp-5 mb-3 leading-relaxed">
//                      {topic.desc}
//                    </p>
//                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-x-1 text-base text-lime-400 group-hover:text-white">
//                      <span className="text-gray-400/80 text-xs">Beginner</span>
//                      <div className="font-bold mt-1 sm:mt-0 inline-flex items-center gap-2">
//                        Start Now <FontAwesomeIcon className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" icon={faLongArrowRight} size="sm" />
//                      </div>
//                    </div>
//                  </div>
//                  {/* Right Image */}
//                  <div className="flex-shrink-0 mb-3 sm:mb-0">
//                    <div className="relative max-w-[100px] w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] aspect-square mx-auto sm:mx-0">
//                      <Image
//                        fill
//                        src={topic.image}
//                        alt="Course Language Image"
//                        className="text-xs rounded-md object-cover group-hover:brightness-110 transition duration-300"
//                        sizes="(max-width: 640px) 100px, 120px"
//                      />
//                    </div>
//                  </div>
//                </Link>
//              </Motion.div>
//            ))}
//          </div>
//        </section>

//        {/* TOOLS & RESOURCES */}
//        <section className="bg-gradient-to-b from-zinc-900/70 to-zinc-950/60 py-20 w-full mx-auto px-16 border-t border-zinc-900">
//          <Motion.h2
//            className="text-3xl sm:text-4xl font-bold mb-10 text-white/90"
//            initial={{ opacity: 0, y: 20 }}
//            whileInView={{ opacity: 1, y: 0 }}
//            transition={{ duration: 0.6 }}
//            viewport={{ once: true }}
//          >
//            Tools&<span className="text-lime-400">Resources</span>
//          </Motion.h2>
//          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-start items-left">
//            {["/logos/vscode.svg", "/logos/react.svg", "/logos/javascript.svg", "/logos/python.svg", "/logos/django-plain.svg", "/logos/git.svg",].map(
//              (icon, idx) => (
//                <Motion.div
//                  key={idx}
//                  whileHover={{ scale: 1.15 }}
//                  className="bg-zinc-900/70 p-3 rounded-2xl transition-all"
//                  tabIndex={0}
//                >
//                  <Image src={icon ?? "Resource Image"} alt="Tool Icon" className="text-xs w-12 h-12 mx-auto" width={200} height={200} />
//                </Motion.div>
//              )
//            )}
//          </div>
//        </section>
//        {/* COMMUNITY SECTION */}
//        <section className="bg-gradient-to-b from-zinc-950/70 to-zinc-900/60 py-12 pb-22 w-full mx-auto text-right px-16 justify-end">
//          <Motion.h2
//            className="text-3xl sm:text-4xl font-bold mb-6 text-white/90"
//            initial={{ opacity: 0, y: 20 }}
//            whileInView={{ opacity: 1, y: 0 }}
//            transition={{ duration: 0.6 }}
//            viewport={{ once: true }}
//          >
//            Join the <span className="text-lime-400">Community</span>
//          </Motion.h2>
//          <p className="text-gray-300/90 text-md sm:text-lg w-fit sm:w-lg ml-auto mb-10 ">
//            {/* Connect with learners, share progress, and get feedback on your projects. */}
//            {/* We’re building a friendly hub for curious minds, come hang out. */}
//            Ask questions, share progress, get feedback, 
//            and learn alongside people who are also figuring things out, no pressure.
//          </p>
//          <div className="flex justify-end">
//            <Link
//              href="https://discord.gg/53wVsqEcbE"
//              target="_blank"
//              aria-label="Discord link"
//              // className="inline-block bg-lime-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-lime-300 transition"
//              className="bg-transparent text-md text-white font-bold cursor-pointer border-3 border-gray-500/100 px-8 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
//                 active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#39ff14] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
//            >
//              <span className="lg:hidden">Join</span>
//              <span className="hidden lg:inline">Join Discord</span>
//            </Link>
//          </div>
//        </section>
//        {/* HOW TO USE THIS PAGE */}
//        {/* <section className="relative mt-20 max-w-lg mx-auto text-center">
//        <div className="bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 text-sm italic rounded-2xl px-6 py-4 shadow-lg shadow-black/20 animate-fade-in">
//          💡 Pick a course to start learning, or follow a learning path.  
//          <br className="hidden sm:block" />
//          Every concept builds on the last — you’ll grow steadily, confidently, and creatively.
//        </div>
//      </section> */}
//      </div>
//    );
//  }
