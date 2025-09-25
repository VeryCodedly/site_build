"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faGraduationCap,
  faChartLine,
  faRss,
} from "@fortawesome/free-solid-svg-icons";
import { motion as Motion } from "framer-motion";
import { col } from "framer-motion/client";

const cards = [
  {
    id: "read",
    title: "Read",
    description: "Daily articles with technical depth, clarity, and purpose.",
    icon: faNewspaper,
    accent: "bg-lime-400",
    color: "text-lime-400",
    href: "/blog"
  },
  {
    id: "learn",
    title: "Learn",
    description: "Step-by-step coding paths for beginner to advanced.",
    icon: faGraduationCap,
    accent: "bg-lime-500",
    color: "text-lime-500",
    href: "/learn"
  },
  {
    id: "know",
    title: "Know",
    description: "Stay informed on tech trends, updates, and insights.",
    icon: faChartLine,
    accent: "bg-lime-600",
    color: "text-lime-600",
    href: "/know"
  },
  {
    id: "connect",
    title: "Connect",
    description: "Subscribe, keep up, and keep evolving in the tech space.",
    icon: faRss,
    accent: "bg-lime-700",
    color: "text-lime-700",
    href: "/connect"
  },
];


export default function TeaserCards() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-8 lg:px-22 overflow-hidden">
      {/* faded bg */}
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-stretch opacity-30"></div>

      {/* <CircuitLines cardIds={cards.map((c) => c.id)} /> */}
      <div className="relative w-full h-full gap-4 m-3 lg:gap-0 max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Motion.div
            id={`card-${card.id}`}
            key={index}
            className={`relative rounded-3xl px-10 py-8 border border-gray-800 bg-white/5 backdrop-blur-md 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-300 group`}
            whileHover={{ scale: 1.13 }}
            whileDrag={{ scale: 1.10 }}
            whileTap={{ scale: 1.10 }}
            style={{ zIndex: 0 }} 
            onMouseEnter={(e) => (e.currentTarget.style.zIndex = 10)}
            onMouseLeave={(e) => (e.currentTarget.style.zIndex = 0)}
          >
            <Link href={card.href} key={index}>
            <div className={`${card.color} text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <FontAwesomeIcon icon={card.icon} />
            </div>

            <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 hover:underline active:underline">
              {card.title}
            </h2>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {card.description}
            </p>

            <div className={`absolute bottom-4 left-8 h-0.5 w-20 ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          </Motion.div>
        ))}
      </div>
    </section>
  );
}

