'use client';

import { motion as Motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faYoutube, faDiscord, faInstagram, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function AboutPage() {

  return (
    <>
      <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
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
          aria-label="About Us Section"
        >
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Us
          </Motion.h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed pb-6">
            VeryCodedly is a place for people who are curious about technology but don’t necessarily want the usual tech-industry noise that comes with it.
            <br /><br />
            Around here, we talk about coding, software, hardware, AI, dev tools, and everything in between. 
            Technology changes how the world works everyday, so that could mean breaking down a new tool in a coding tutorial, or looking at a tech headline and asking, “okay… but what does this actually mean?”
            <br /><br />
            The goal isn’t to impress you with jargon. It’s to make complicated things make sense. Technology moves fast enough already, so this is the corner of the interweb where we slow down just enough to understand it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left">

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-gray-300/80 text-sm sm:text-base leading-6.5">
                VeryCodedly exists to make tech clear and a little less intimidating.
                {/* <br /><br /> */}
                {" "}We connect how software is built with how it shapes the world around us, whether that’s a new gadget, a coding workflow, or an industry trend most people haven’t noticed yet.
                <br /><br />
                Instead of treating tech like an exclusive club, we treat it like a conversation. If you're curious enough to ask questions, you're already in the right place.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Our Values</h3>
              <ul className="text-gray-300/80 text-sm sm:text-base list-disc list-outside space-y-2.5">
                <li>No gatekeeping. Everyone starts somewhere.</li>
                <li>Clarity over jargon. We keep it simple here.</li>
                <li>Community over competition. Learning isn’t a race.</li>
                <li>Curiosity always beats pretending to know everything.</li>
                <li>Technology should feel understandable, not mysterious.</li>
                <li>Lifelong learning. Nobody ever “finishes” tech</li>
              </ul>
            </div>

          </div>

          <div className="text-gray-300/80 text-sm sm:text-base leading-relaxed pt-2">
            <p>
              If something in tech is interesting, confusing, useful, or important, it’s probably worth talking about. That’s the entire idea behind this place.
            </p>
          </div>

          <div className="text-gray-300/80 text-sm sm:text-base leading-relaxed">
            <p>
              You can find VeryCodedly around the interweb where new articles, experiments, and occasional tech rabbit holes are shared:
            </p>

            <ul className="flex flex-wrap justify-center leading-tight px-0 md:px-10 lg:px-0 gap-6 sm:gap-8 list-none list-inside mt-8 space-y-1 text-lime-400">
              <li>
                <Link className="flex gap-1 items-center hover:underline hover:text-lime-200 active:underline active:text-lime-200" 
                href="https://www.youtube.com/@verycodedly" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                  YouTube
                </Link>
              </li>
              <li>
                <Link className="flex gap-1 items-center hover:underline hover:text-lime-200 active:underline active:text-lime-200" 
                href="https://discord.gg/53wVsqEcbE" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faDiscord} size="lg" />
                  Discord
                </Link>
              </li>
              <li>
                <Link className="flex gap-1 items-center hover:underline hover:text-lime-200 active:underline active:text-lime-200" 
                href="https://x.com/verycodedly" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link className="flex gap-1 items-center hover:underline hover:text-lime-200 active:underline active:text-lime-200" 
                href="https://verycodedly.substack.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  Substack
                </Link>
              </li>
              <li>
                <Link className="flex gap-1 items-center hover:underline hover:text-lime-200 active:underline active:text-lime-200" 
                href="https://instagram.com/verycodedly" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link className="flex gap-1 items-center hover:underline hover:text-lime-200 active:underline active:text-lime-200" 
                href="https://medium.com/@verycodedly" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faMedium} size="lg" />
                  Medium
                </Link>
              </li>
            </ul>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm py-4 italic">
            If you're learning to code, exploring tech, or just trying to keep up with the pace of the industry, welcome. Pull up a chair.
          </p>

        </Motion.div>
      </section>
    </>
  );
}
// 'use client';

// import { motion as Motion } from 'framer-motion';


// export default function AboutPage() {

//   return (
//     <>
//       <section className="relative min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
//         <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
//         <Motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="group max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg 
//                    shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
//                    focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
//                    transition-all duration-300"
//           tabIndex={0}
//           role="region"
//           aria-label="About Us Section"
//         >
//           <Motion.h2
//             className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             About Us
//           </Motion.h2>
//           <p className="text-gray-300 text-sm sm:text-base leading-relaxed pb-6">
//             VeryCodedly is a community-driven space for everyone. It’s about making sense of the tools, concepts, and culture that grow around technology.
//             Whether you’re learning, building, watching the industry shift, 
//             or just trying to keep up, this is a place to slow things down and actually understand what’s happening.
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left">
//             <div>
//               <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Our Mission</h3>
//               <p className="text-gray-300/80 text-sm sm:text-base leading-relaxed">
//                 To make technology feel understandable and relevant, by connecting how it’s built with how it shapes work, culture, and everyday life.
//                 We’ll explain things clearly, question them honestly, and help people form their own perspective on tech, not just consume it.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Our Values</h3>
//               <ul className="text-gray-300/80 text-sm sm:text-base list-disc list-inside space-y-2">
//                 <li>No gatekeeping</li>
//                 <li>Accessibility & clarity</li>
//                 <li>Community over competition - learning isn’t a race</li>
//                 <li>Curiosity & lifelong learning - nobody ever “finishes” tech</li>
//               </ul>
//             </div>
//           </div>
//         </Motion.div>
//       </section>
//     </>
//   );
// }