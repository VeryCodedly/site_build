"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faShieldAlt, faRobot, faGlobe, faLightbulb, faBookOpen, faCoins, 
  faMobileAlt, faUsers, faChartLine, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Category = {
  name: string;
  icon: IconDefinition;
  subs: string[];
};

const categories: Category[] = [
  { name: "Apps & Software", icon: faLaptopCode, subs: ["Reviews", "Productivity Tools", "Dev Tools & Platforms"] },
  { name: "Cybersecurity", icon: faShieldAlt, subs: ["Data Protection", "Online Safety", "Privacy & Compliance"] },
  { name: "Digital Lifestyle", icon: faUsers, subs: ["Tech Culture", "Entertainment", "Socials & Communities"] },
  { name: "Fintech & Crypto", icon: faCoins, subs: ["Blockchain & Crypto", "Payments & Wallets", "Digital Banking"] },
  { name: "Gadgets & Gear", icon: faMobileAlt, subs: ["Smartphones & Wearables", "Hardware & Accessories", "Reviews & Buy Guides"] },
  { name: "Guides & Tutorials", icon: faChartLine, subs: ["Beginner Guides", "Step-by-Step", "How-To Fixes"] },
  { name: "Innovation & AI", icon: faRobot, subs: ["AI", "Emerging Tech", "Startups"] },
  { name: "Learning & Growth", icon: faBookOpen, subs: ["Coding & Skills", "Career Development", "Industry Insights"] },
  { name: "Spotlight", icon: faLightbulb, subs: ["Featured Interviews", "Trending Now", "Special Reports"] },
  { name: "WorldWideTech", icon: faGlobe, subs: ["Africa Rising", "Tech Around the Globe", "Policy & Progress"] },
];

export default function FloatingMenu() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // overall icons visible
  const [expandedNames, setExpandedNames] = useState(false); // whether category names are visible (after icons shown)
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // focused category (shows subs)
  const [openSubs, setOpenSubs] = useState<string | null>(null); // which category's subs are open
  const [isHoverable, setIsHoverable] = useState<boolean>(true); // whether device supports hover
  // medium speed: durations around 300-450ms
  const DURATION = 400;

  useEffect(() => {
    // detect if device supports hover — prefer (hover: hover) for desktop
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const handler = () => setIsHoverable(Boolean(mq && mq.matches));
    handler();
    mq?.addEventListener?.("change", handler);
    return () => mq?.removeEventListener?.("change", handler);
  }, []);

  // close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        // click outside → close
        setOpenSubs(null);
        setActiveCategory(null);
        setExpandedNames(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // keyboard: Esc closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenSubs(null);
        setActiveCategory(null);
        setExpandedNames(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // toggle category name expansion (shows subs on subsequent click)
  const handleCategoryClick = (catName: string) => {
    // If names are not visible yet, clicking an icon should reveal names first and focus this one
    if (!expandedNames) {
      setExpandedNames(true);
      setActiveCategory(catName);
      setOpenSubs(null);
      return;
    }

    // names visible: tapping a category name toggles its subs
    setOpenSubs((prev) => (prev === catName ? null : catName));
    setActiveCategory(catName);
  };

  // When icon clicked directly (not name), we expand names if not already
  const onIconClick = (catName: string) => {
    if (!expandedNames) {
      setExpandedNames(true);
      setActiveCategory(catName);
      setOpenSubs(null);
    } else {
      // if already expanded, focusing the category
      setActiveCategory(catName);
      setOpenSubs(null);
    }
  };

  // Utility: returns dim / focus classes
  const categoryOpacity = (name: string) => {
    if (!expandedNames) return "opacity-100";
    return activeCategory === name ? "opacity-100" : "opacity-80";
  };

  return (
    <div ref={containerRef}>
      {/* Logo button - top-left under header */}
      <div
        // desktop: allow hover to open menu; mobile: click toggles
        onMouseEnter={isHoverable ? () => setMenuOpen(true) : undefined}
        onMouseLeave={isHoverable ? () => { setExpandedNames(false); setActiveCategory(null); setOpenSubs(null); setMenuOpen(false); } : undefined}
        className="fixed top-1.5 left-18 z-50"
      >
        <button
          aria-label="Open menu"
          onClick={() => {
            // on mobile click toggles; on desktop click also toggles (desktop hover still works)
            setMenuOpen((v) => !v);
            if (menuOpen) {
              // closing
              setExpandedNames(false);
              setActiveCategory(null);
              setOpenSubs(null);
            } else {
              // opening
              // slight delay before showing icons (makes hover+click consistent)
              setTimeout(() => setMenuOpen(true), 0);
            }
          }}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full
                     bg-white/6 backdrop-blur-lg border border-white/10 shadow-sm
                     hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300
                     transition-transform duration-200"
        >
          {/* Glass placeholder logo (neutral gray glass) */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full
                       bg-white/12 border border-white/8
                       text-gray-100 text-lg font-semibold"
            style={{
              boxShadow: "0 6px 18px rgba(2,6,23,0.35)",
              backdropFilter: "saturate(140%) blur(6px)",
            }}
          >
            VC
          </div>

          {/* subtle focus glow when menuOpen */}
          <span
            className={`pointer-events-none absolute -inset-1 rounded-full transition-opacity duration-300 ${
              menuOpen ? "opacity-60 bg-gradient-to-r from-pink-400/20 via-white/5 to-pink-300/12" : "opacity-0"
            }`}
          />
        </button>

        {/* Icons panel (slides down) */}
        <div
          // if menuOpen: visible with slide down; else hidden with transform
          className={`origin-top-right mt- backdrop-blur-lg transform transition-all duration-${DURATION} ease-in-out
                      ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          style={{ willChange: "opacity, transform" }}
        >
          <ul className="flex flex-col gap-">
            {categories.map((cat, idx) => {
              const delay = `${idx * 60}ms`; // stagger
              return (
                <li key={cat.name} className="relative">
                  {/* Icon circle */}
                  <button
                    onClick={() => {
                      // on hoverable device we want hover to still control focus; clicking should behave consistently
                      onIconClick(cat.name);
                    }}
                    onMouseEnter={isHoverable ? () => { setActiveCategory(cat.name); } : undefined}
                    onMouseLeave={isHoverable ? () => { if (!expandedNames) setActiveCategory(null); } : undefined}
                    className={`flex items-center gap- px-3 py-0.5 rounded-lg
                                transition-all duration-300 transform
                                ${categoryOpacity(cat.name)} 
                                hover:translate-x-0 hover:scale-100`}
                    style={{
                      // slide-in from above with staggered delay
                      transitionDelay: menuOpen ? delay : "0ms",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06))",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <span
                      className="w-10 h-10 flex items-center justify-center rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <FontAwesomeIcon icon={cat.icon} className="text-sm text-gray-100" />
                    </span>

                    {/* Slide-out category name (only when names expanded) */}
                    <div
                      className={`overflow-hidden transition-all duration-${DURATION} ease-in-out`}
                      style={{
                        width: expandedNames ? 180 : 0,
                        opacity: expandedNames ? 1 : 0,
                        transitionDelay: menuOpen ? delay : "0ms",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(cat.name);
                        }}
                        className={`text-left w-full text-sm text-gray-100 focus:outline-none`}
                      >
                        <div className="flex items-start justify-start">
                          <span className={activeCategory === cat.name ? "text-lime-400" : "text-gray-100"}>
                            {cat.name}
                          </span>
                          <span className="ml-2 mt-0.5 text-xs text-gray-300">
                            {/* caret visual */}
                            {openSubs === cat.name ? "▾" : "▸"}
                          </span>
                        </div>
                      </button>

                      {/* Subcategories panel: slide down beneath the category name, a bit to the right */}
                      <div
                        className={`mt-1 ml- max-w-xs overflow-hidden transition-all duration-300`}
                        style={{
                          height: openSubs === cat.name ? cat.subs.length * 32 : 0,
                          opacity: openSubs === cat.name ? 1 : 0,
                        }}
                      >
                        <ul className="flex flex-col gap-1 items-start">
                          {cat.subs.map((sub) => (
                            <li key={sub}>
                              <a
                                href="#"
                                onClick={(ev) => ev.stopPropagation()}
                                className="block pl-3 px-2 py-1 rounded-md text-xs text-gray-200 hover:text-lime-300 hover:bg-white/3 transition"
                              >
                                {sub}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Nice spare nav (plain)
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLaptopCode,
//   faShieldAlt,
//   faRobot,
//   faGlobe,
//   faLightbulb,
//   faBookOpen,
//   faCoins,
//   faMobileAlt,
//   faUsers,
//   faChartLine,
//   IconDefinition,
// } from "@fortawesome/free-solid-svg-icons";

// type Category = {
//   name: string;
//   icon: IconDefinition;
//   subs: string[];
// };

// const categories = [
//   { name: "Apps & Software", icon: faLaptopCode, subs: ["Reviews", "Productivity Tools", "Dev Tools & Platforms"] },
//   { name: "Cybersecurity", icon: faShieldAlt, subs: ["Data Protection", "Online Safety", "Privacy & Compliance"] },
//   { name: "Digital Lifestyle", icon: faUsers, subs: ["Tech Culture", "Entertainment", "Socials & Communities"] },
//   { name: "Fintech & Crypto", icon: faCoins, subs: ["Blockchain & Crypto", "Payments & Wallets", "Digital Banking"] },
//   { name: "Gadgets & Gear", icon: faMobileAlt, subs: ["Hardware", "Reviews", "Buy Guides"] },
//   { name: "Guides & Tutorials", icon: faChartLine, subs: ["Beginner Guides", "Step-by-Step", "How-To Fixes"] },
//   { name: "Innovation & AI", icon: faRobot, subs: ["AI", "Emerging Tech", "Startups"] },
//   { name: "Learning & Growth", icon: faBookOpen, subs: ["Coding & Skills", "Career Development", "Industry Insights"] },
//   { name: "Spotlight", icon: faLightbulb, subs: ["Featured Interviews", "Trending Now", "Special Reports"] },
//   { name: "WorldWideTech", icon: faGlobe, subs: ["Africa Rising", "Tech Around the Globe", "Policy & Progress"] },
// ];

// export default function FloatingMenu() {
//   const [expanded, setExpanded] = useState(false);
//   const [active, setActive] = useState<IconDefinition | null>(null);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // close when clicking outside
//   useEffect(() => {
//     function handleOutside(e: MouseEvent) {
//       if (!menuRef.current) return;
//       if (!menuRef.current.contains(e.target as Node)) {
//         setExpanded(false);
//         setActive(null);
//         setActiveCategory(null);
//       }
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   // helper to toggle category on click/tap
//   const toggleCategory = (cat: Category) => {
//     if (active === cat.icon) {
//       setActive(null);
//       setActiveCategory(null);
//     } else {
//       setActive(cat.icon);
//       setActiveCategory(cat.name);
//     }
//   };

//   return (
//     <div ref={menuRef} className="fixed top-1/2 left-3 -translate-y-1/2 z-50 flex items-center gap-2">
//       {/* VC button */}
//       <button
//         aria-label="Toggle menu"
//         onClick={() => {
//           setExpanded((s) => !s);
//           // reset active on open/close
//           setActive(null);
//           setActiveCategory(null);
//         }}
//         className={`relative flex items-center justify-center w-10 h-10 rounded-full
//           border-2 border-white/10 bg-white/8 text-white text-sm font-semibold
//           shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2
//           ${expanded ? "opacity-60" : "opacity-100"}`}
//         style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.28)", backdropFilter: "saturate(140%) blur(8px)" }}
//       >
//         VC
//       </button>

//       {/* icons column that slides out to the right of VC */}
//       <div
//         className={`flex flex-col gap- transition-all duration-400 ease-in-out
//           ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
//       >
//         {categories.map((cat, i) => (
//           <div key={cat.name} className="relative group">
//             <button
//               onClick={() => toggleCategory(cat)}
//               onMouseEnter={() => setActive(cat.icon)}
//               onMouseLeave={() => setActive((cur) => (cur === cat.icon ? cur : null))}
//               className="flex items-center justify-center w-10 h-10 rounded-full
//                 border border-white/8 bg-white/6 text-gray-100 transition transform duration-200
//                 hover:scale-110 focus:outline-none"
//             >
//               <FontAwesomeIcon icon={cat.icon} />
//             </button>

//             {/* category name — slides out horizontally (translate + opacity) */}
//             <div
//               className={`absolute left-12 top-1/2 -translate-y-1/2 transition-all duration-300 ease-out
//                 ${active === cat.icon ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-2 opacity-0 pointer-events-none"}
//                 bg-zinc-800/70 backdrop-blur-md text-gray-100 text-xs font-medium px-3 py-1 rounded-md shadow-md min-w-[10rem]`}
//               >
//               <div
//                 // clicking name should toggle subcategories (use same activeCategory)
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setActive(cat.icon);
//                   setActiveCategory((prev) => (prev === cat.name ? null : cat.name));
//                 }}
//                 className="cursor-pointer"
//               >
//                 {cat.name}
//               </div>

//               {/* subcategories: slide down using max-h + opacity */}
//               <div
//                 className={`overflow-hidden transition-all duration-300 mt- ${
//                   activeCategory === cat.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <ul className="flex flex-col gap-1">
//                   {cat.subs.map((sub) => (
//                     <li key={sub}>
//                       <a
//                         href="#"
//                         className="block text-gray-300 text-xs hover:text-lime-300 transition-colors px-1 py-0.5"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         {sub}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }