// src/com/verycodedlyponents/Footer.jsx
import React from 'react';
import Link from 'next/link';
// import ScrollLink from './ScrollLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faReddit, faMedium } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faXTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faReddit, faMedium);

export default function Footer() {
  return (
    <>
    {/* Footer Section */}
    <footer className="bg-black text-gray-400 py-20 px-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        {/* Site Info */}
        <div>
          <h3 className="text-lime-400 text-xl font-bold mb-3">Very Codedly</h3>
          <div className="w-4/5">
            <p className="text-sm text-gray-500 mb-4">
              {/* Built for creators, thinkers, and everyday magic-makers. Join us as we push the boundaries of what’s possible. */}
              For the curious minds shaping the future, one small step at a time. You're in good company here. {/* shorten this */}
            </p>
          </div>
        </div>

        {/* Navigation Columns */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/support" className="hover:text-white">Support</Link></li>
            <li><Link href="/community" className="hover:text-white">Community</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faqs" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Logo Corner */}
        <div className="flex flex-col items-start">
          <h3 className="text-white text-lg font-semibold mb-3 tracking-tighter">Find us on</h3>
          <div className="grid grid-cols-3 gap-4">
            <Link href="https://x.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="X" target="_blank">
              <FontAwesomeIcon icon={['fab', 'x-twitter']} size="lg" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCNDy9Q0qPHcY-TT2BD7B1kw" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="YouTube" target="_blank">
              <FontAwesomeIcon icon={['fab', 'youtube']} size="lg" />
            </Link>
            <Link href="https://reddit.com/r/VeryCodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="Reddit" target="_blank">
              <FontAwesomeIcon icon={['fab', 'reddit']} size="lg" />
            </Link>
            <Link href="https://discord.com/invite/UVWNezaj" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" target="_blank">
              <FontAwesomeIcon icon={['fab', 'discord']} size="lg" />
            </Link>
            <Link href="https://medium.com/@verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="medium" target="_blank">
              <FontAwesomeIcon icon={['fab', 'medium']} size="sm" />
            </Link>
            <Link href="https://linkedin.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" target="_blank">
              <FontAwesomeIcon icon={['fab', 'linkedin']} size="lg" />
            </Link>
            <Link href="https://facebook.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" target="_blank">
              <FontAwesomeIcon icon={['fab', 'facebook']} size="lg" />
            </Link>
            <Link href="https://instagram.com/verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="Instagram" target="_blank">
              <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
            </Link>
            <Link href="https://tiktok.com/@verycodedly" className="h-6 w-6 hover:text-white hover:scale-110 transition-transform duration-300" alt="TikTok" target="_blank">
              <FontAwesomeIcon icon={['fab', 'tiktok']} size="lg" />
            </Link>
            {/* Add more platform icons as needed */}
          </div>
        </div>
      </div>      
    </footer>
    
    {/* Bottom Text */}
      <div className="pt-10 text-center text-xs text-gray-600">
        Powered by curiosity © {new Date().getFullYear()} Very Codedly. All rights reserved.
      </div>
    </>
  );
}