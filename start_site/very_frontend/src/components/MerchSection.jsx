"use client";

import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";


const items = [
  {
    image: "/merch/beanie-grey.png",
    alt: "signature-beanie",
    name: "Signature Beanie",
  },
  {
    image: "/merch/cap-camo-pink.png",
    alt: "off-duty-cap",
    name: "Off-Duty Cap",
  },
  {
    image: "/merch/hoodie-grey.png",
    alt: "VC-zip-hoodie",
    name: "VC Zip Hoodie",
  },
  {
    image: "/merch/got-bugs.png",
    alt: "baby-shelly-tee",
    name: "Baby Shelly Tee",
  },
  {
    image: "/merch/SHELLy-hat.png",
    alt: "cool-person-alert",
    name: "Cool person alert",
  },
  {
    image: "/merch/oversized-tee.png",
    alt: "oversized-tee",
    name: "Oversized Tee",
  },
  {
    image: "/merch/bottle-lime.png",
    alt: "active-bottle-lime",
    name: "Active Bottle - Lime",
  },
  {
    image: "/merch/hoodie-pink.png",
    alt: "VC-hoodie",
    name: "VC Hoodie - Pink",
  },
  {
    image: "/merch/laptop-sleeve.png",
    alt: "VC-laptop-sleeve",
    name: "Laptop Sleeve",
  },
  // {
  //   image: "/merch/mug-read.png",
  //   alt: "read-mug",
  //   name: "Read Mug",
  // },
];


export default function MerchSection() {
  const [current, setCurrent] = useState(0);

  // Auto-slide 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextItem = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevItem = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="relative w-full py-20 bg-black px-4 text-center overflow-hidden">
      {/* Floating accents */}
      {/* <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-2 h-2 bg-lime-400 rounded-full absolute top-10 left-20 animate-ping"></div>
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full absolute bottom-20 right-32 animate-pulse"></div>
        <div className="w-1 h-1 bg-pink-300 rounded-full absolute top-32 right-16 animate-bounce"></div>
      </div> */}

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent">
          VeryCodedly Supply
        </h3>
        <p className="text-gray-400 text-base sm:text-lg mt-6">
          We make it. You make it look good.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center gap-12 md:gap-6 flex-col md:flex-row min-h-screen">
        <div className="relative mx-auto order-1 md:order-2 w-full h-full md:w-[40%] md:h-[50%]">
          <AnimatePresence mode="wait">
            <Link href="/merch">
              <span className="sr-only">Merch</span>
              <Motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                // className="w-full h-[40vh] rounded-2xl p-6 transition-all duration-300"
                className="relative w-full h-[40vh] rounded-2xl transition-all duration-300"
              >
                {/* theres more */}
                {/* <div className="mb-4" /> */}
                <Image
                  src={items[current].image}
                  alt={items[current].alt}
                  // width={200}
                  // height={200}
                  fill
                  // className="mx-auto object-contain object-center"
                  className="object-contain object-center"
                  quality={100}
                  loading="eager"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 40vw"
                />
                {/* <div className="text-lime-300 font-semibold mt-3">{items[current].name}</div> */}
                {/* <div className="text-gray-400 text-sm">{items[current].role}</div> */}
              </Motion.div>
            </Link>
          </AnimatePresence>

          {/* Animated Progress Dots */}
          {/* <div className="flex justify-center mt-8 gap-3">
          {items.map((_, index) => (
            <span
              key={index}
              className="relative w-3 h-2.5 rounded-full bg-gray-600 overflow-hidden"
              onClick={() => setCurrent(index)}
            >
              {current === index && (
                <Motion.span
                  className="absolute inset-0 bg-lime-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </span>
          ))}
        </div> */}

          {/* Controls */}
          <div className="flex justify-between mt-8 px-4 sm:px-8 md:px-4 lg:px-4">
            {/* Left Arrow */}
            <button
              onClick={prevItem}
              aria-label="Previous item"
              className="bg-gradient-to-b from-white/5 to-white/0 relative px-4 py-2 rounded-full text-lime-300 font-medium overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black group-active:text-black">
                <FontAwesomeIcon icon={faArrowLeft} size="sm" />
              </span>
              <span
                className="pointer-events-none absolute inset-0
                        before:content-[''] before:absolute before:inset-0
                        before:bg-gradient-to-b before:from-lime-400 before:to-lime-700
                        before:opacity-90 before:rounded-full
                        translate-y-full group-hover:translate-y-0 group-active:translate-y-0
                        transition-transform duration-300 ease-out"
              />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextItem}
              aria-label="Next item"
              className="bg-gradient-to-b from-white/5 to-white/0 relative px-4 py-2 rounded-full text-lime-300 font-medium overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black group-active:text-black">
                <FontAwesomeIcon icon={faArrowRight} size="sm" />
              </span>
              <span
                className="pointer-events-none absolute inset-0
                        before:content-[''] before:absolute before:inset-0
                        before:bg-gradient-to-b before:from-lime-400 before:to-lime-700
                        before:opacity-90 before:rounded-full
                        translate-y-full group-hover:translate-y-0 group-active:translate-y-0
                        transition-transform duration-300 ease-out"
              />
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-[50vw] h-[50vh] md:h-screen flex-shrink-0 order-2 md:order-1">
          <Image
            src="/merch/merch-photo.webp"
            alt="VeryCodedly Supply"
            fill
            className="object-contain object-center"
            quality={100}
            loading="eager"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
      </div>
    </section>
  );
}
