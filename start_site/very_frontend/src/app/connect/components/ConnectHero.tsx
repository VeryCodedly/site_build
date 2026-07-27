"use client";

import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Countdown from "./Countdown";


export default function ConnectHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,230,0,0.04),transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        <Motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="hero text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight"
        >
          pick a room.
          <br />
          <span className="text-lime-400">get a handle.</span>
        </Motion.h1>

        <Motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} 
                  className="mt-4 text-sm font-medium text-gray-400">
          No login. No signup. Just chat.
        </Motion.p>

        <Motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-10">
          <a href="#rooms" className="font-bold sm:font-bold border-3 border-gray-500/100 bg-lime-400 text-black px-8 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200">
            Connect
          </a>
          <span className="text-xs text-gray-500 flex items-center gap-2">
            <span className="text-lime-400 opacity-50"><FontAwesomeIcon icon={faClock} size="sm" /></span>
            <Countdown />
          </span>
        </Motion.div>
      </div>
    </section>
  );
}