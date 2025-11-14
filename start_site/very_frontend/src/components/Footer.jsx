"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faReddit, faMedium } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faXTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faReddit, faMedium);

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-gray-400 py-24 px-8 overflow-hidden border-t border-zinc-800">
      {/* faint glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none"></div>

      {/* content grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 lg:pl-16">
        {/* Brand Column */}
        <div>
          <h3 className="text-lime-400 text-xl font-bold mb-3">
            VeryCodedly{/* <span className="text-xs">™</span> */}
          </h3>
          <p className="text-sm text-gray-500 leading-tight w-[140px]">
            For the curious minds shaping the future, you're in good company here.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3 tracking-tight">
            Explore
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Read", "/blog"],
              ["Learn", "/learn"],
              ["Shop", "/shop"],
              ["Support", "/support"],
              ["Community", "/community"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={`${label} page link`}
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
          <ul className="space-y-3 text-sm">
            {[
              ["About", "/about"],
              ["FAQs", "/faqs"],
              ["Contact", "/contact"],
              ["Privacy", "/privacy"],
              ["Terms of Use", "/terms"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={`${label} page link`}
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
              ["discord", "https://discord.gg/53wVsqEcbE"],
              ["medium", "https://medium.com/@verycodedly"],
              ["linkedin", "https://linkedin.com/in/verycodedly"],
              ["facebook", "https://facebook.com/verycodedly"],
              ["instagram", "https://instagram.com/verycodedly"],
              ["tiktok", "https://tiktok.com/@verycodedly"],
            ].map(([icon, link]) => (
              <Link
                key={icon}
                href={link}
                aria-label={`${icon} link`}
                target="_blank"
                className="text-gray-500 hover:text-lime-500 hover:scale-110 transition-transform duration-300"
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
        <Link aria-label="Home button" href="/">
          <Image
            src="/images/favicon-main.svg"
            alt="VeryCodedly Logo"
            className="h-[100px] w-[100px] object-contain hover:scale-105 active:scale-75 transition-transform duration-300"
            width={100}
            height={100}
            priority={false}
          />
        </Link>

        <p className="text-xs text-gray-600 text-center sm:text-right">
            Powered by curiosity. © VeryCodedly<span className="text-xs">™</span>{" "}{new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
