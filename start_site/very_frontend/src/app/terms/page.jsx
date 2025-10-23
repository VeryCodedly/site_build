// // src/pages/Terms.jsx

// export default function Terms() {
//   return (
//     <div className="prose prose-neutral max-w-3xl mx-auto text-white">
//       <h1 className="text-3xl font-bold">Terms of Use</h1>

//       <p>
//         By using this site, you agree to a few sensible things:
//       </p>

//       <ol className="list-decimal ml-5 space-y-2">
//         <li>
//           Don’t copy content and claim it as your own. Be cool, give credit.
//         </li>
//         <li>
//           No AI doomsday trolling. We're here to learn and have fun.
//         </li>
//         <li>
//           I make no promises that everything here is flawless — but I do try.
//         </li>
//         <li>
//           The tech world moves fast, so things may change or break. I’ll patch it up.
//         </li>
//       </ol>

//       <p>
//         TL;DR: Be kind, don’t be sketchy, and enjoy the ride.
//       </p>

//       <p className="text-sm italic">
//         Questions? Just reach out — I don’t bite (unless...)
//       </p>
//     </div>
//   );
// }

'use client';

import { motion as Motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                   shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                   focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                   transition-all duration-300"
        tabIndex={0}
        role="region"
        aria-label="Terms of Use Section"
      >
        <Motion.h2
          className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Terms of Use
        </Motion.h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          By using this site, you agree to play nice and respect the following rules:
        </p>
        <ul className="text-gray-400 text-sm sm:text-base list-disc list-inside space-y-2">
          {[
            "No AI doomsday trolling. We're here to learn and have fun.",
            "Don’t misuse or exploit the platform.",
            "Respect other community members.",
            "Use the content for learning, not plagiarism.",
          ].map((item, index) => (
            <Motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="hover:text-lime-400 transition-colors duration-200"
            >
              {item}
            </Motion.li>
          ))}
        </ul>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          These terms may change over time. Keep an eye on this page for changes.
        </p>
      </Motion.div>
    </section>
  );
}
