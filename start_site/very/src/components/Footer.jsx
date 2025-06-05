// src/com/verycodedlyponents/Footer.jsx
import React from 'react';
import ScrollLink from './ScrollLink';
// import { ScrollLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faYoutube, faFacebook, faGithub, faLinkedin, faTiktok, faInstagram, faReddit, faMedium } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faXTwitter, faYoutube, faFacebook, faGithub, faLinkedin, faTiktok, faInstagram, faReddit, faMedium);

export default function Footer() {
  return (
    <>
    {/* Footer Section */}
    <footer className="bg-black text-gray-400 py-20 px-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        {/* Site Info */}
        <div>
          <h3 className="font-pops text-lime-400 text-xl font-bold mb-4">Very Codedly</h3>
          <p className="text-sm text-gray-500 mb-4">
            Built for creators, thinkers, and everyday magic-makers. Join us as we push the boundaries of what’s possible.
          </p>
        </div>

        {/* Navigation Columns */}
        <div>
          <h3 className="font-pops text-white text-md font-bold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><ScrollLink to="/about" className="hover:text-white">About</ScrollLink></li>
            <li><ScrollLink to="/blog" className="hover:text-white">Blog</ScrollLink></li>
            <li><ScrollLink to="/support" className="hover:text-white">Support</ScrollLink></li>
            <li><ScrollLink to="/com/verycodedlymunity" className="hover:text-white">com/verycodedlymunity</ScrollLink></li>
          </ul>
        </div>

        <div>
          <h3 className="font-pops text-white text-md font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
            <li><ScrollLink to="/faqs" className="hover:text-white">FAQs</ScrollLink></li>
            <li><ScrollLink to="/contact" className="hover:text-white">Contact Us</ScrollLink></li>
            <li><ScrollLink to="/terms" className="hover:text-white">Terms of Use</ScrollLink></li>
            <li><ScrollLink to="/privacy" className="hover:text-white">Privacy Policy</ScrollLink></li>
          </ul>
        </div>

        {/* Logo Corner */}
        <div className="flex flex-col items-start">
          <h3 className="font-pops text-lime-400 text-lg font-semibold mb-4 tracking-wider">Find us on</h3>
          <div className="grid grid-cols-3 gap-5">
            <a href="https://x.com/verycodedly" className="h-6 w-6 hover:text-white" alt="X" target="_blank">
              <FontAwesomeIcon icon={['fab', 'x-twitter']} size="lg" />
            </a>
            <a href="https://youtube.com/verycodedly" className="h-6 w-6 hover:text-white" alt="YouTube" target="_blank">
              <FontAwesomeIcon icon={['fab', 'youtube']} size="lg" />
            </a>
            <a href="https://reddit.com/verycodedly" className="h-6 w-6 hover:text-white" alt="Reddit" target="_blank">
              <FontAwesomeIcon icon={['fab', 'reddit']} size="lg" />
            </a>
            <a href="https://github.com/verycodedly" className="h-6 w-6 hover:text-white" target="_blank">
              <FontAwesomeIcon icon={['fab', 'github']} size="lg" />
            </a>
            <a href="https://medium.com/verycodedly" className="h-6 w-6 hover:text-white" alt="medium" target="_blank">
              <FontAwesomeIcon icon={['fab', 'medium']} size="sm" />
            </a>
            <a href="https://linkedin.com/verycodedly" className="h-6 w-6 hover:text-white" target="_blank">
              <FontAwesomeIcon icon={['fab', 'linkedin']} size="lg" />
            </a>
            <a href="https://facebook.com/verycodedly" className="h-6 w-6 hover:text-white" target="_blank">
              <FontAwesomeIcon icon={['fab', 'facebook']} size="lg" />
            </a>
            <a href="https://instagram.com/verycodedly" className="h-6 w-6 hover:text-white" alt="Instagram" target="_blank">
              <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
            </a>
            <a href="https://tiktok.com/verycodedly" className="h-6 w-6 hover:text-white" alt="TikTok" target="_blank">
              <FontAwesomeIcon icon={['fab', 'tiktok']} size="lg" />
            </a>
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