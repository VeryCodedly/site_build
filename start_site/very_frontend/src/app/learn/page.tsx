"use client";

import Image from "next/image";
import Link from "next/link";
import { motion as Motion } from "framer-motion"
import CourseList from "./components/CourseList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LearnPage() {
  
  return (
    <div>
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden pt-24 pb-12 px-8 sm:px-6 lg:px-8">
      {/* subtle grid / pattern background */}
      <div className="absolute inset-0 bg-linear-gradient(135deg, #0f111a, #1a1c2c) bg-center bg-cover opacity-20 pointer-events-none"></div>

      {/* content wrapper */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
        <h1 className="hero relative text-[2.8rem] sm:text-5xl md:text-6xl font-bold leading-tight text-center text-white">
          {/* Static fallback layer to prevent layout jump */}
          <span className="inline-block hero absolute inset-0 justify-center items-center opacity-0 select-none">
            Learn <span className="text-lime-400 mx-1">Code</span>,{" "}
            <span className="text-pink-400 mx-1">Think</span>{" "}Creatively
          </span>

          {/* Animated color fade-in */}
          <Motion.span
            className="px-30 sm:px-0 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Learn{" "}
            <Motion.span
              className="mx-1"
              initial={{ color: "#ffffff" }}
              animate={{ color: "#9AE600" }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Code,
            </Motion.span>
            {" "}
            {/* <Motion.span
              className="mx-1"
              initial={{ color: "#ffffff" }}
              animate={{ color: "#fb64b6" }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Think
            </Motion.span>{" "}
            Creatively. */}
            <span className="inline-flex flex-wrap justify-center items-center gap-x-1">
            <Motion.span
              className="mx-0"
              initial={{ color: "#ffffff" }}
              animate={{ color: "#fb64b6" }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Think
            </Motion.span>
            <span>&nbsp;Creatively.</span>
            </span>
          </Motion.span>
        </h1>

        <p className="text-gray-400 text-sm md:text-md sm:text-lg max-w-2xl">
          Beginner-friendly coding lessons that help complex ideas click, 
          one concept at a time.
          {/* Every concept explained clearly — the VeryCodedly way. */}
        </p>

        <div className="h-0.5 w-24 bg-lime-400/70 mt-4 mb-8 rounded-full"></div>

      <Motion.h2
        className="text-4xl font-bold mb-12 text-left text-white/90"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FontAwesomeIcon className="text-7xl sm:text-8xl" icon={faGraduationCap} />
      </Motion.h2>

      </div>
    </section>

    <section className="bg-gradient-to-b from-black to-zinc-950 min-h-screen w-full px-8 py-22 border-t border-b border-zinc-900">
    <Motion.h2
        className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white/90"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-white">Courses from <span className="text-lime-400">VeryCodedly</span></span> 
      </Motion.h2>
      <div className="space-y-2.5 w-[90%] sm:w-[90%] lg:w-[80%] mx-auto">
      {/* <div className="absolute inset-0 bg-[url('/images/bg-plain.jpg')] bg-center bg-stretch opacity-50"></div> */}
        {/* <div className=""> */}
          <CourseList />
        {/* </div> */}
      </div>
    </section>

    {/* LEARNING PATHS */}
    <section className="bg-gradient-to-b to-black from-zinc-950 min-h-screen w-full mx-auto px-6 sm:px-28 py-16 sm:py-32 flex flex-col items-left justify-center border-b border-zinc-900">
  <Motion.h2
    className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 px-2 text-left text-white/90"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    Choose Your <span className="text-lime-400 inline-flex flex-wrap justify-center items-center gap-x-1">Learning Path</span>
  </Motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-5">
    {[
      {
        name: "Frontend Starter",
        desc: "HTML, CSS, JavaScript, React — build the visual layer of the web you interact with.",
      },
      {
        name: "Backend Mastery",
        desc: "APIs, databases, Django — create powerful, robust server-side logic.",
      },
      {
        name: "AI & Data Science",
        desc: "Python, Machine Learning, data handling — dive into the future of software.",
      },
    ].map((track) => (
      <Motion.div
        key={track.name}
        className="bg-zinc-900/80 border border-zinc-800 m-3 sm:m-0 p-4 sm:p-6 rounded-2xl 
        hover:shadow-[0_0_10px_#222222] backdrop-blur-md transition-all"
        whileHover={{ y: -5 }}
        tabIndex={0}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{track.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{track.desc}</p>
      </Motion.div>
    ))}
  </div>
</section>

    {/* FEATURED LESSONS */}

<section className="bg-gradient-to-b from-black to-zinc-900/80 relative min-h-screen w-full mx-auto px-4 sm:px-12 py-16 sm:py-32 flex flex-col items-center justify-center">
  <div className="absolute inset-0 bg-center bg-stretch opacity-40"></div>
  <Motion.h2
    className="relative text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 text-right text-white/90"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <span className="text-lime-400">Featured</span> Lessons
  </Motion.h2>

  <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
    {[
      {
        name: "Introduction to Python",
        slug: "introduction-to-python",
        course: "python-course",
        desc: "Python is one of the most widely used languages in the world. You'll find it everywhere: powering apps like Instagram, helping scientists train AI models, and running simple scripts that automate everyday tasks.",
        image: "logos/python.svg"
      },
      {
        name: "What is JavaScript?",
        slug: "what-is-javascript",
        course: "javascript-course",
        desc: "JavaScript is the programming language that brings web pages to life. While HTML handles structure and CSS handles style, JavaScript controls interactivity — it lets websites respond to clicks, inputs, and real-time data.",
        image: "logos/javascript.svg"
      }
    ].map((topic) => (
      <Motion.div
        key={topic.name}
        className="flex flex-col sm:flex-row p-5 m-3 sm:m-0 rounded-2xl shadow bg-zinc-900/80 border border-zinc-800 group hover:-translate-y-[5px] 
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-1 sm:gap-4"
      >
        <Link href={`/learn/${topic.course}/${topic.slug}`} className="inline-flex items-center gap-1 w-full">
          {/* Left Text Section */}
          <div className="flex-1 flex flex-col justify-between space-x-2">
            <p className="text-xs font-semibold tracking-tighter text-pink-400 uppercase mb-2">
              Starter Guide
            </p>
            <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-100 group-hover:text-lime-400 transition leading-tight">
              {topic.name}
            </h3>
            <p className="text-sm text-gray-300/80 line-clamp-3 sm:line-clamp-6 mb-3 leading-relaxed">
              {topic.desc}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-x-3 text-sm text-lime-400 group-hover:text-white">
              <span className="text-gray-500">Beginner</span>
              <div className="font-bold mt-2 sm:mt-0">
                Start Now <FontAwesomeIcon className="" icon={faArrowRight} size="sm" />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0 mb-3 sm:mb-0">
            <div className="relative max-w-[100px] w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] aspect-square mx-auto sm:mx-0">
              <Image
                fill
                src={topic.image}
                alt="Course Language Image"
                className="text-xs rounded-md object-cover group-hover:brightness-110 transition duration-300"
                sizes="(max-width: 640px) 100px, 120px"
              />
            </div>
          </div>
        </Link>
      </Motion.div>
    ))}
  </div>
</section>

    {/* TOOLS & RESOURCES */}
    <section className="bg-gradient-to-b from-zinc-900/70 to-zinc-950/60 py-20 w-full mx-auto px-16 border-t border-zinc-900">
      <Motion.h2
        className="text-3xl sm:text-4xl font-bold mb-10 text-white/90"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tools&<span className="text-lime-400">Resources</span>
      </Motion.h2>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-start items-left">
        {["/logos/vscode.svg", "/logos/react.svg", "/logos/javascript.svg", "/logos/python.svg", "/logos/django-plain.svg", "/logos/git.svg",].map(
          (icon, idx) => (
            <Motion.div
              key={idx}
              whileHover={{ scale: 1.15 }}
              className="bg-zinc-900/70 p-3 rounded-2xl transition-all"
              tabIndex={0}
            >
              <Image src={icon ?? "Resource Image"} alt="Tool Icon" className="text-xs w-12 h-12 mx-auto" width={200} height={200} />
            </Motion.div>
          )
        )}
      </div>
    </section>

    {/* COMMUNITY SECTION */}
    <section className="bg-gradient-to-b from-zinc-950/70 to-zinc-900/60 py-12 w-full mx-auto text-right px-16 justify-end">
      <Motion.h2
        className="text-3xl sm:text-4xl font-bold mb-6 text-white/90"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Join the <span className="text-lime-400">Community</span>
      </Motion.h2>
      <p className="text-gray-400 text-md sm:text-lg w-fit sm:w-lg ml-auto mb-10 ">
        Connect with learners, share progress, and get feedback on your projects.  
        We’re building a friendly hub for curious minds, come hang out.
      </p>
    
    <div className="flex justify-end">
      <Link
        href="https://discord.gg/53wVsqEcbE"
        target="_blank"
        // className="inline-block bg-lime-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-lime-300 transition"
        className="bg-transparent text-md text-white font-bold cursor-pointer border-3 border-gray-500/100 px-8 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
        active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#39ff14] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
      >
        <span className="lg:hidden">Join</span>
        <span className="hidden lg:inline">Join Discord</span>
      </Link>
    </div>
    </section>

    {/* HOW TO USE THIS PAGE */}
    {/* <section className="relative mt-20 max-w-lg mx-auto text-center">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 text-sm italic rounded-2xl px-6 py-4 shadow-lg shadow-black/20 animate-fade-in">
        💡 Pick a course to start learning, or follow a learning path.  
        <br className="hidden sm:block" />
        Every concept builds on the last — you’ll grow steadily, confidently, and creatively.
      </div>
    </section> */}

  </div>

  );
}
