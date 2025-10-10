// // src/com/verycodedlyponents/Footer.jsx
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// // import ScrollLink from './ScrollLink';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faReddit, faMedium } from '@fortawesome/free-brands-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';
// library.add(faXTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faReddit, faMedium);

// export default function Footer() {
//   return (
//     <>
//     {/* Footer Section */}
//     <footer className="bg-black text-gray-400 py-20 px-15">
      
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 g-zinc-950">
//         {/* Site Info */}

//         {/* <div className='grid grid-row text-wrap'> */}
          
//         <div>
//           <h3 className="text-lime-400 text-xl font-bold mb-3">VeryCodedly<span className="text-xs">™</span></h3>
//           <div className="w-4/5">
//             <p className="text-sm text-gray-500 mb-4">
//               {/* Built for creators, thinkers, and everyday magic-makers. Join us as we push the boundaries of what’s possible. */}
//               For the curious minds shaping the future, one small step at a time. You're in good company here. {/* shorten this */}
//             </p>
//           </div>
//           </div>
//         {/* </div> */}

//         {/* Navigation Columns */}
//         <div>
//           <h3 className="text-white text-lg font-bold mb-3">Explore</h3>
//           <ul className="space-y-2 text-sm">
//             <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
//             <li><Link href="/learn" className="hover:text-white">Learn</Link></li>
//             <li><Link href="/about" className="hover:text-white">Store</Link></li>
//             <li><Link href="/support" className="hover:text-white">Support</Link></li>
//             <li><Link href="/community" className="hover:text-white">Community</Link></li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-white text-lg font-semibold mb-3">Help</h3>
//           <ul className="space-y-2 text-sm">
//             <li><Link href="/about" className="hover:text-white">About</Link></li>
//             <li><Link href="/faqs" className="hover:text-white">FAQs</Link></li>
//             <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
//             <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
//             <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
//           </ul>
//         </div>

//         {/* Logo Corner */}
//         <div className="flex flex-col items-start">
//           <h3 className="text-white text-lg font-semibold mb-3 tracking-tighter">Find us on</h3>
//           <div className="grid grid-cols-3 gap-4">
//             <Link href="https://x.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="X" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'x-twitter']} size="lg" />
//             </Link>
//             <Link href="https://www.youtube.com/channel/UCNDy9Q0qPHcY-TT2BD7B1kw" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="YouTube" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'youtube']} size="lg" />
//             </Link>
//             <Link href="https://reddit.com/r/VeryCodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="Reddit" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'reddit']} size="lg" />
//             </Link>
//             <Link href="https://discord.com/invite/UVWNezaj" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'discord']} size="lg" />
//             </Link>
//             <Link href="https://medium.com/@verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="medium" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'medium']} size="sm" />
//             </Link>
//             <Link href="https://linkedin.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'linkedin']} size="lg" />
//             </Link>
//             <Link href="https://facebook.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'facebook']} size="lg" />
//             </Link>
//             <Link href="https://instagram.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="Instagram" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
//             </Link>
//             <Link href="https://tiktok.com/@verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="TikTok" target="_blank">
//               <FontAwesomeIcon icon={['fab', 'tiktok']} size="lg" />
//             </Link>
//             {/* Add more platform icons as needed */}
//           </div>
//         </div>
//       </div>

// <Link href="/" className="">
//           <div className="flex flex-col items-start mt-10 sm:items-center borer">
//             <Image
//               src="/images/favicon-main.svg"
//               alt="Logo"
//               className="h-[140px] w-[110px] object-cover hover:scale-105 active:scale-70 transition-all duration-400"
//               loading="eager"
//               width={0}
//               height={0}
//               priority
//             />
//           </div>
//         </Link>           
//     </footer>
    
//     {/* Bottom Text */}
//       <div className="pt-10 text-center text-xs text-gray-600">
//         Powered by curiosity © {new Date().getFullYear()} VeryCodedly<span className="text-xs">™</span>. All rights reserved.
//       </div>
//     </>
//   );
// }
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faYoutube,
  faFacebook,
  faDiscord,
  faLinkedin,
  faTiktok,
  faInstagram,
  faReddit,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
  faXTwitter,
  faYoutube,
  faFacebook,
  faDiscord,
  faLinkedin,
  faTiktok,
  faInstagram,
  faReddit,
  faMedium
);

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-gray-400 py-24 px-6 overflow-hidden border-t border-zinc-800">
      {/* faint glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none"></div>

      {/* content grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand Column */}
        <div>
          <h3 className="text-lime-400 text-xl font-bold mb-3">
            VeryCodedly<span className="text-xs">™</span>
          </h3>
          <p className="text-sm text-gray-500 leading-tight w-4/5">
            For the curious minds shaping the future, you're in good company here.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3 tracking-tight">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ["Blog", "/blog"],
              ["Learn", "/learn"],
              ["Shop", "/shop"],
              ["Support", "/support"],
              ["Community", "/community"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3 tracking-tight">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ["About", "/about"],
              ["FAQs", "/faqs"],
              ["Contact Us", "/contact"],
              ["Terms of Use", "/terms"],
              ["Privacy Policy", "/privacy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-start">
          <h3 className="text-white text-lg font-semibold mb- tracking-tight">
            Connect
          </h3>
          <div className="grid grid-cols-3 gap-y-5 gap-x-4 mt-4 items-start">
            {[
              ["x-twitter", "https://x.com/verycodedly"],
              ["youtube", "https://www.youtube.com/@verycodedly"],
              ["reddit", "https://reddit.com/r/VeryCodedly"],
              ["discord", "https://discord.gg/invite/UVWNezaj"],
              ["medium", "https://medium.com/@verycodedly"],
              ["linkedin", "https://linkedin.com/company/verycodedly"],
              ["facebook", "https://facebook.com/verycodedly"],
              ["instagram", "https://instagram.com/verycodedly"],
              ["tiktok", "https://tiktok.com/@verycodedly"],
            ].map(([icon, link]) => (
              <Link
                key={icon}
                href={link}
                target="_blank"
                className="text-gray-500 hover:text-lime-400 hover:scale-110 transition-transform duration-300"
              >
                <FontAwesomeIcon icon={["fab", icon]} size="lg" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-16" />

      {/* Logo + Bottom line */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
        <Link href="/">
          <Image
            src="/images/favicon-main.svg"
            alt="VeryCodedly Logo"
            className="h-[100px] w-[100px] object-contain hover:scale-105 active:scale-75 transition-transform duration-300"
            width={100}
            height={100}
          />
        </Link>

        <p className="text-xs text-gray-600 text-center sm:text-right">
          © {new Date().getFullYear()} VeryCodedly<span className="text-xs">™</span>.{" "}
            Powered by curiosity
        </p>
      </div>
    </footer>
  );
}
