
// // // import React, { useState } from "react";
// // // import { motion as Motion, AnimatePresence } from "framer-motion";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// // // const testimonials = [
// // //   {
// // //     quote: "Joining this space unlocked my creative spark. I’ve never felt more seen and supported.",
// // //     name: "Ada U.",
// // //     role: "Digital Artist • Lagos 🇳🇬",
// // //   },
// // //   {
// // //     quote: "It’s more than a platform — it’s a vibe. I'm building, sharing, and learning with some awesome people!",
// // //     name: "Jordan K.",
// // //     role: "AI Storyteller • Berlin 🇩🇪",
// // //   },
// // //   {
// // //     quote: "The community uplifted me when I doubted myself. Now I’m launching my own project!",
// // //     name: "Nia R.",
// // //     role: "Creative Coder • Nairobi 🇰🇪",
// // //   },
// // // ];

// // // export default function Testimonials() {
// // //   const [current, setCurrent] = useState(0);

// // //   const nextTestimonial = () => {
// // //     setCurrent((prev) => (prev + 1) % testimonials.length);
// // //   };

// // //   const prevTestimonial = () => {
// // //     setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
// // //   };

// // //   return (
// // //     <section className="w-full py-24 bg-black/90 px-6 md:px-12 text-center">
// // //       {/* Header */}
// // //       <div className="max-w-3xl mx-auto mb-12">
// // //         <h3 className="font-pops text-3xl md:text-5xl font-bold text-white mb-4">
// // //           What Creatives Are Saying
// // //         </h3>
// // //         <p className="text-gray-400 text-base md:text-lg">
// // //           Real voices from our global community.
// // //         </p>
// // //       </div>

// // //       {/* Carousel Container */}
// // //       <div className="relative max-w-md mx-auto">
// // //         <AnimatePresence mode="wait">
// // //           <Motion.div
// // //             key={current}
// // //             initial={{ opacity: 0, x: 100 }}
// // //             animate={{ opacity: 1, x: 0 }}
// // //             exit={{ opacity: 0, x: -100 }}
// // //             transition={{ duration: 0.5 }}
// // //             // className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 shadow-xl border border-gray-700 backdrop-blur-md"
// // //             className="rounded-2xl p-6 shadow-xl border border-gray-800 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-md hover:shadow-[0_1px_5px_#9AE600] hover:ring-2 hover:ring-lime-400/30 transition-all duration-300"

// // //           >
// // //             <div className="text-lime-400 text-3xl font-bold mb-4">“</div>
// // //             <p className="text-gray-300 italic mb-6">“{testimonials[current].quote}”</p>
// // //             <div className="text-lime-400 font-semibold">{testimonials[current].name}</div>
// // //             <div className="text-gray-400 text-sm">{testimonials[current].role}</div>
// // //           </Motion.div>
// // //         </AnimatePresence>

// // //         {/* Controls */}
// // //         <div className="flex justify-between mt-6 gap-4">
// // //   <button
// // //   onClick={prevTestimonial}
// // //   className="bg-gradient-to-b from-white/10 to-white/0 relative px-4 py-2 rounded-full border border-gray-700 text-lime-300 font-medium overflow-hidden group"
// // // >
// // //   <span className="relative z-10 transition-colors duration-300 group-hover:text-black"><FontAwesomeIcon icon={ faArrowLeft } size="xs" /></span>

// // //   {/* Diagonal animated layer */}
// // //   <span
// // //     className="pointer-events-none absolute inset-0
// // //                before:content-[''] before:absolute before:inset-0
// // //                before:bg-gradient-to-br before:from-lime-400 before:via-lime-400 before:to-green-500
// // //                before:opacity-80 before:rounded-full
// // //                before:transform before:rotate-12 before:scale-125
// // //                translate-y-full group-hover:translate-y-0
// // //                transition-transform duration-500 ease-out"
// // //   />
// // // </button>


// // //   <button
// // //   onClick={nextTestimonial}
// // //   className="bg-gradient-to-b from-white/10 to-white/0 relative px-4 py- rounded-full border border-gray-700 text-lime-300 font-medium overflow-hidden group"
// // // >
// // //   <span className="relative z-10 transition-colors duration-300 group-hover:text-black"><FontAwesomeIcon icon={ faArrowRight } size="xs" /></span>
// // //   <span
// // //     className="pointer-events-none absolute inset-0
// // //                before:content-[''] before:absolute before:inset-0
// // //                before:bg-gradient-to-br before:from-lime-300 before:via-lime-400 before:to-green-500
// // //                before:opacity-80 before:rounded-full
// // //                before:transform before:rotate-12 before:scale-125
// // //                translate-y-full group-hover:translate-y-0
// // //                transition-transform duration-500 ease-out"
// // //   />
// // // </button>
// // // </div>

// // //       </div>
// // //     </section>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import { motion as Motion, AnimatePresence } from "framer-motion";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// // const testimonials = [
// //   {
// //     quote: "Joining this space unlocked my creative spark. I’ve never felt more seen and supported.",
// //     name: "Ada U.",
// //     role: "Digital Artist • Lagos 🇳🇬",
// //   },
// //   {
// //     quote: "It’s more than a platform — it’s a vibe. I'm building, sharing, and learning with some awesome people!",
// //     name: "Jordan K.",
// //     role: "AI Storyteller • Berlin 🇩🇪",
// //   },
// //   {
// //     quote: "The community uplifted me when I doubted myself. Now I’m launching my own project!",
// //     name: "Nia R.",
// //     role: "Creative Coder • Nairobi 🇰🇪",
// //   },
// // ];

// // export default function Testimonials() {
// //   const [current, setCurrent] = useState(0);

// //   const nextTestimonial = () => setCurrent((prev) => (prev + 1) % testimonials.length);
// //   const prevTestimonial = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

// //   return (
// //     <section className="relative w-full py-24 bg-black px-6 md:px-12 text-center overflow-hidden">
      
// //       {/* Floating Dots */}
// //       <div className="absolute inset-0 -z-10 pointer-events-none">
// //         <div className="w-2 h-2 bg-lime-400 rounded-full absolute top-10 left-20 animate-ping"></div>
// //         <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full absolute bottom-20 right-32 animate-pulse"></div>
// //         <div className="w-1 h-1 bg-pink-300 rounded-full absolute top-32 right-16 animate-bounce"></div>
// //       </div>

// //       {/* Header */}
// //       <div className="max-w-3xl mx-auto mb-12">
// //         <h3 className="font-pops text-3xl md:text-5xl font-bold text-white mb-4">
// //           What Creatives Are Saying
// //         </h3>
// //         <p className="text-gray-400 text-base md:text-lg">
// //           Real voices from our global community.
// //         </p>
// //       </div>

// //       {/* Carousel */}
// //       <div className="relative max-w-md mx-auto">
// //         <AnimatePresence mode="wait">
// //           <Motion.div
// //             key={current}
// //             initial={{ opacity: 0, x: 100 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             exit={{ opacity: 0, x: -100 }}
// //             transition={{ duration: 0.5 }}
// //             className="rounded-2xl p-6 shadow-xl border border-gray-800 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-md hover:shadow-[0_1px_5px_#9AE600] hover:ring-2 hover:ring-lime-400/30 transition-all duration-300"
// //           >
// //             <div className="text-lime-400 text-3xl font-bold mb-4">“</div>
// //             <p className="text-gray-300 italic mb-6">“{testimonials[current].quote}”</p>
// //             <div className="text-lime-400 font-semibold">{testimonials[current].name}</div>
// //             <div className="text-gray-400 text-sm">{testimonials[current].role}</div>
// //           </Motion.div>
// //         </AnimatePresence>

// //         {/* Controls */}
// //         <div className="flex justify-between mt-6 gap-4">
// //           {/* Left Arrow */}
// //           <button
// //             onClick={prevTestimonial}
// //             className="bg-gradient-to-b from-white/10 to-white/0 relative px-4 py-2 rounded-full border border-gray-700 text-lime-300 font-medium overflow-hidden group"
// //           >
// //             <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
// //               <FontAwesomeIcon icon={faArrowLeft} size="xs" />
// //             </span>
// //             <span
// //               className="pointer-events-none absolute inset-0
// //                          before:content-[''] before:absolute before:inset-0
// //                          before:bg-gradient-to-b before:from-lime-400 before:to-lime-700
// //                          before:opacity-90 before:rounded-full
// //                          translate-y-full group-hover:translate-y-0
// //                          transition-transform duration-500 ease-out"
// //             />
// //           </button>

// //           {/* Right Arrow */}
// //           <button
// //             onClick={nextTestimonial}
// //             className="bg-gradient-to-b from-white/10 to-white/0 relative px-4 py-2 rounded-full border border-gray-700 text-lime-300 font-medium overflow-hidden group"
// //           >
// //             <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
// //               <FontAwesomeIcon icon={faArrowRight} size="xs" />
// //             </span>
// //             <span
// //               className="pointer-events-none absolute inset-0
// //                          before:content-[''] before:absolute before:inset-0
// //                          before:bg-gradient-to-b before:from-lime-400 before:to-lime-700
// //                          before:opacity-90 before:rounded-full
// //                          translate-y-full group-hover:translate-y-0
// //                          transition-transform duration-500 ease-out"
// //             />
// //           </button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// import React, { useState } from "react";
// import { motion as Motion, AnimatePresence } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// const testimonials = [
//   {
//     quote: "Joining this space unlocked my creative spark. I’ve never felt more seen and supported.",
//     name: "Ada U.",
//     role: "Digital Artist • Lagos 🇳🇬",
//   },
//   {
//     quote: "It’s more than a platform — it’s a vibe. I'm building, sharing, and learning with some awesome people!",
//     name: "Jordan K.",
//     role: "AI Storyteller • Berlin 🇩🇪",
//   },
//   {
//     quote: "The community uplifted me when I doubted myself. Now I’m launching my own project!",
//     name: "Nia R.",
//     role: "Creative Coder • Nairobi 🇰🇪",
//   },
// ];

// export default function Testimonials() {
//   const [current, setCurrent] = useState(0);

//   const nextTestimonial = () => setCurrent((prev) => (prev + 1) % testimonials.length);
//   const prevTestimonial = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

//   return (
//     <section className="relative w-full py-28 bg-black px-6 md:px-12 overflow-hidden">
//       {/* Floating 3D Panels */}
//       <Motion.div
//         className="absolute top-20 left-10 w-40 h-40 bg-lime-400/10 blur-2xl rounded-2xl -z-10"
//         animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <Motion.div
//         className="absolute bottom-10 right-16 w-56 h-56 bg-cyan-400/10 blur-2xl rounded-2xl -z-10"
//         animate={{ y: [0, -20, 0], rotate: [0, -8, 8, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Header */}
//       <div className="max-w-3xl mx-auto text-center mb-12">
//         <h3 className="font-pops text-3xl md:text-5xl font-bold text-white mb-4">
//           What Creatives Are Saying
//         </h3>
//         <p className="text-gray-400 text-base md:text-lg">
//           Real voices from our global community.
//         </p>
//       </div>

//       {/* Carousel */}
//       <div className="relative max-w-md mx-auto perspective-[1000px]">
//         <AnimatePresence mode="wait">
//           <Motion.div
//             key={current}
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -100 }}
//             transition={{ duration: 0.5 }}
//             whileHover={{ rotateX: -3, rotateY: 3, scale: 1.02 }}
//             className="rounded-2xl p-6 shadow-2xl border border-gray-800 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-md hover:shadow-[0_0_20px_#9AE600] transition-all duration-300"
//           >
//             <div className="text-lime-400 text-3xl font-bold mb-4">“</div>
//             <p className="text-gray-300 italic mb-6">“{testimonials[current].quote}”</p>
//             <div className="text-lime-400 font-semibold">{testimonials[current].name}</div>
//             <div className="text-gray-400 text-sm">{testimonials[current].role}</div>
//           </Motion.div>
//         </AnimatePresence>

//         {/* Controls */}
//         <div className="flex justify-between mt-6 gap-4">
//           {["prev", "next"].map((type, i) => (
//             <Motion.button
//               key={type}
//               onClick={type === "prev" ? prevTestimonial : nextTestimonial}
//               whileHover={{ scale: 1.1, y: -2 }}
//               whileTap={{ scale: 0.9, y: 1 }}
//               className="relative px-4 py-2 rounded-full border border-gray-700 text-lime-300 bg-gradient-to-b from-white/10 to-white/0 overflow-hidden group"
//             >
//               <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
//                 <FontAwesomeIcon icon={i === 0 ? faArrowLeft : faArrowRight} size="xs" />
//               </span>
//               <span
//                 className="pointer-events-none absolute inset-0
//                   before:content-[''] before:absolute before:inset-0
//                   before:bg-gradient-to-b before:from-lime-400 before:to-green-500
//                   before:opacity-90 before:rounded-full
//                   translate-y-full group-hover:translate-y-0
//                   transition-transform duration-500 ease-out"
//               />
//             </Motion.button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState, useEffect, use } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    quote: "Joining this space unlocked my creative spark. I’ve never felt more seen and supported.",
    name: "Ada U.",
    role: "Digital Artist • Lagos 🇳🇬",
  },
  {
    quote: "It’s more than a platform — it’s a vibe. I'm building, sharing, and learning with some awesome people!",
    name: "Jordan K.",
    role: "AI Storyteller • Berlin 🇩🇪",
  },
  {
    quote: "The community uplifted me when I doubted myself. Now I’m launching my own project!",
    name: "Nia R.",
    role: "Creative Coder • Nairobi 🇰🇪",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative w-full py-24 bg-black px-6 md:px-12 text-center overflow-hidden">
      {/* Floating accents */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-2 h-2 bg-lime-400 rounded-full absolute top-10 left-20 animate-ping"></div>
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full absolute bottom-20 right-32 animate-pulse"></div>
        <div className="w-1 h-1 bg-pink-300 rounded-full absolute top-32 right-16 animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
          What Creatives Are Saying
        </h3>
        <p className="text-gray-300 text-base md:text-lg">
          Real voices from our global community.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <Motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 shadow-xl border border-gray-800 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-md hover:ring-2 hover:ring-lime-400/30 transition-all duration-300"
          >
            <div className="text-lime-400 text-3xl font-bold mb-4">“</div>
            <p className="text-gray-300 italic mb-6">“{testimonials[current].quote}”</p>
            <div className="text-lime-400 font-semibold">{testimonials[current].name}</div>
            <div className="text-gray-400 text-sm">{testimonials[current].role}</div>
          </Motion.div>
        </AnimatePresence>

        {/* Animated Progress Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className="relative w-3 h-3 rounded-full bg-gray-600 overflow-hidden"
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
        </div>

        {/* Controls */}
        <div className="flex justify-between mt-6 gap-4">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="bg-gradient-to-b from-white/10 to-white/0 relative px-4 py-2 rounded-full border border-gray-700 text-lime-300 font-medium overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              <FontAwesomeIcon icon={faArrowLeft} size="xs" />
            </span>
            <span
              className="pointer-events-none absolute inset-0
                        before:content-[''] before:absolute before:inset-0
                        before:bg-gradient-to-b before:from-lime-400 before:to-lime-700
                        before:opacity-90 before:rounded-full
                        translate-y-full group-hover:translate-y-0
                        transition-transform duration-500 ease-out"
            />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="bg-gradient-to-b from-white/10 to-white/0 relative px-4 py-2 rounded-full border border-gray-700 text-lime-300 font-medium overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              <FontAwesomeIcon icon={faArrowRight} size="xs" />
            </span>
            <span
              className="pointer-events-none absolute inset-0
                        before:content-[''] before:absolute before:inset-0
                        before:bg-gradient-to-b before:from-lime-400 before:to-lime-700
                        before:opacity-90 before:rounded-full
                        translate-y-full group-hover:translate-y-0
                        transition-transform duration-500 ease-out"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
