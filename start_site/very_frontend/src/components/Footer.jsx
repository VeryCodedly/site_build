"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faYoutube, faFacebook, faDiscord, faLinkedin, faTiktok, faInstagram, faMedium, faDev } from "@fortawesome/free-brands-svg-icons";


const socials = [
  { icon: faYoutube, link: "https://www.youtube.com/@verycodedly", name: "Youtube" },
  { icon: faDiscord, link: "https://discord.gg/53wVsqEcbE", name: "Discord" },
  { icon: faTwitter, link: "https://x.com/verycodedly", name: "Twitter" },
  { icon: faEnvelope, link: "https://verycodedly.substack.com", name: "Substack" },
  { icon: faDev, link: "https://dev.to/verycodedly", name: "Dev.to" },
  { icon: faLinkedin, link: "https://linkedin.com/in/verycodedly", name: "LinkedIn" },
  { icon: faInstagram, link: "https://instagram.com/verycodedly", name: "Instagram" },
  { icon: faTiktok, link: "https://tiktok.com/@verycodedly", name: "TikTok" },
  { icon: faFacebook, link: "https://facebook.com/verycodedly", name: "Facebook" },
];

export default function Footer() {
  
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-gray-300/80 py-24 px-8 overflow-hidden border-t border-zinc-800">
      {/* faint glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none"></div>

      {/* content grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 lg:pl-16">
        {/* Brand Column */}
        <div>
          <h3 className="text-lime-400 text-xl font-bold mb-3">
            VeryCodedly<span className="text-xs">™</span>
          </h3>
          <p className="text-sm text-gray-400/80 leading-tight w-[140px]">
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
              ["About", "/about"],
              ["Shop", "/shop"],
              ["Read", "/read"],
              ["Learn", "/learn"],
              ["Know", "/know"],
              ["Connect", "/connect"],
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
              ["FAQs", "/faqs"],
              ["Contact", "/contact"],
              ["Support", "/support"],
              ["Privacy", "/privacy"],
              ["Community", "/community"],
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
          <h3 className="text-white text-lg font-semibold tracking-tight">
            Connect
          </h3>
          <div className="grid grid-cols-3 gap-y-5 gap-x-4 mt-2 items-start">
            {socials.map(({ icon, link, name }) => (
              <Link
                key={link}
                href={link}
                title={name}
                aria-label={`${name} link`}
                target="_blank"
                className="p-0.5 text-gray-400/80 hover:text-lime-500 active:text-lime-500 hover:scale-110 active:scale-110 transition-transform duration-300"
              >
                <FontAwesomeIcon icon={icon} size="lg" />
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
            priority={true}
            aria-label="VeryCodedly Logo and Home Link"
          />
        </Link>

        <p className="text-xs text-gray-600 text-center sm:text-right">
            Powered by curiosity. VeryCodedly<span className="text-xs">™</span>{" "}{year && `${year}.`}.
        </p>
      </div>
    </footer>
  );
}