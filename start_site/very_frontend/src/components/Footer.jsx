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
    <footer className="relative bg-gradient-to-b from-black to-zinc-950 text-gray-400/95 pt-22 sm:pt-18 pb-8 px-8 overflow-clip border-t border-zinc-950">
      {/* faint glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none"></div>

      {/* content grid */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 pt-8 gap-12">
          {/* Brand Column */}
          <div className="flex justify-center">
            <div className="">
              <div className="w-full ml-2 sm:ml-0 max-w-[120px] sm:max-w-[140px]">
                <h3 className="text-lime-400 text-xl font-bold mb-2 tracking-[-0.1em]">
                  VeryCodedly{/* <span className="text-xs">™</span> */}
                </h3>
                <p className="text-sm text-gray-400/70 leading-4.5 tracking-[-0.09em] sm:tracking-[-0.1em]">
                  For the curious minds shaping the future, you're in good company here.
                </p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex justify-center">
            <div className="flex flex-col">
              <h3 className="text-white text-lg font-semibold tracking-tight">
                Connect
              </h3>
              <div className="grid grid-cols-3 gap-y-4 sm:gap-y-5 gap-x-5 mt-2">
                {socials.map(({ icon, link, name }) => (
                  <Link
                    key={link}
                    href={link}
                    title={name}
                    aria-label={`${name} link`}
                    target="_blank"
                    rel="noopener noreferrer"
                    loading="lazy"
                    className="w-fit p-0 text-gray-400/80 hover:text-lime-500 active:text-lime-500 hover:scale-110 transition duration-400 active:scale-60"
                  >
                    <FontAwesomeIcon icon={icon} size="lg" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="flex justify-center">
            <div className="mr-7.5 sm:mr-0">
              <h3 className="text-white text-lg font-semibold mb-2 tracking-tight">
                Explore
              </h3>
              <ul className="space-y-4 sm:space-y-2 text-sm">
                {[
                  ["About", "/about"],
                  ["Read", "/read"],
                  ["Learn", "/learn"],
                  ["Know", "/know"],
                  ["Merch", "/merch"],
                  ["Connect", "/connect"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-label={`${label} link`}
                      className="hover:text-lime-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Help */}
          <div className="flex justify-center">
            <div className="">
              <h3 className="text-white text-lg font-semibold mb-2 tracking-tight">
                Help
              </h3>
              <ul className="space-y-4 sm:space-y-2 text-sm">
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
                      aria-label={`${label} link`}
                      className="hover:text-lime-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative w-full h-px g-gradient-to-r from-transparent via-gray-800/50 to-transparent my-14 sm:my-8" />

      {/* Logo + Bottom line */}
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
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

        <p className="text-xs text-gray-600 text-center sm:text-right sm:pr-5">
          VeryCodedly<span className="text-xs">™</span>{" "}{year && `${year}`}
        </p>
      </div>
    </footer>
  );
}