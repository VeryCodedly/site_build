'use client';

import { motion as Motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 text-center space-y-8 sm:space-y-10 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
                   shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                   focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                   transition-all duration-300"
        tabIndex={0}
        role="region"
        aria-label="Terms of Use Section"
      >
        {/* Title */}
        <Motion.h2
          className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Terms of Use
        </Motion.h2>

        {/* Intro */}
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
        >
          By accessing or using this website, you agree to comply with and be bound by the following terms.
        </Motion.p>

        {/* Rules */}
        <Motion.ul
          className="text-left max-w-2xl mx-auto text-gray-400 text-sm sm:text-base space-y-4 list-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              title: "Permitted Use",
              desc: "Content is provided for personal, non-commercial educational use only. You may not reproduce, distribute, or create derivative works without prior written permission."
            },
            {
              title: "Prohibited Activities",
              desc: "You may not use the site to transmit harmful code, engage in automated scraping, or interfere with its operation. Impersonation, harassment, or illegal activity is strictly prohibited."
            },
            {
              title: "Intellectual Property",
              desc: "All content, including text, code, and design, is protected by copyright and owned by the platform or its licensors."
            },
            {
              title: "No Warranty",
              desc: "The site is provided 'as is' without warranties of any kind. We do not guarantee availability, accuracy, or fitness for a particular purpose."
            },
            {
              title: "Limitation of Liability",
              desc: "We are not liable for any indirect, incidental, or consequential damages arising from your use of the site."
            },
            {
              title: "Modifications",
              desc: "We reserve the right to update these terms at any time. Continued use constitutes acceptance of the revised terms."
            }
          ].map((item, index) => (
            <Motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              <strong className="text-white block mb-1">{item.title}</strong>
              <p className="text-gray-300/80 text-sm">{item.desc}</p>
            </Motion.li>
          ))}
        </Motion.ul>

        {/* Contact */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="pt-6 border-t border-gray-700/50"
        >
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Questions about these terms? Contact us via the{' '}
            <Link 
              href="/contact" 
              className="text-lime-400 underline hover:text-lime-300 transition-colors duration-200"
            >
              contact page
            </Link>
            .
          </p>
        </Motion.div>

        {/* Footer */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-xs text-gray-500 italic"
        >
          Last revised: November 2025
        </Motion.p>
      </Motion.div>
    </section>
  );
}
// 'use client';

// import { motion as Motion } from 'framer-motion';

// export default function TermsPage() {
//   return (
//     <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
//       <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
//       <Motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
//                    shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
//                    focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
//                    transition-all duration-300"
//         tabIndex={0}
//         role="region"
//         aria-label="Terms of Use Section"
//       >
//         <Motion.h2
//           className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Terms of Use
//         </Motion.h2>
//         <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
//           By using this site, you agree to play nice and respect the following rules:
//         </p>
//         <ul className="text-gray-400 text-sm sm:text-base list-disc list-inside space-y-2">
//           {[
//             "No AI doomsday trolling. We're here to learn and have fun.",
//             "Don’t misuse or exploit the platform.",
//             "Respect other community members.",
//             "Use the content for learning, not plagiarism.",
//           ].map((item, index) => (
//             <Motion.li
//               key={index}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
//               className="hover:text-lime-400 transition-colors duration-200"
//             >
//               {item}
//             </Motion.li>
//           ))}
//         </ul>
//         <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
//           These terms may change over time. Keep an eye on this page for changes.
//         </p>
//       </Motion.div>
//     </section>
//   );
// }
