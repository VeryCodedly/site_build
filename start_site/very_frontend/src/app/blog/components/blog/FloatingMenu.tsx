// import { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCodeBranch, faUserShield, faMicrochip, faGlobeAfrica, faFire, faPersonRays, faHandHoldingDollar, 
// faCogs, faCameraRetro, faChalkboardTeacher, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";


// const categories = [
//   { name: "Apps & Software", icon: faCodeBranch, subs: ["Stack", "Rundown", "Dev Digest"] },
//   { name: "Cybersecurity", icon: faUserShield, subs: ["Data Defense", "Secure Habits", "Privacy & Compliance"] },
//   { name: "Digital Lifestyle", icon: faCameraRetro, subs: ["Social", "Tech Culture", "Entertainment"] },
//   { name: "Fintech & Crypto", icon: faHandHoldingDollar, subs: ["Key Players", "Digital Money", "Blockchain & Crypto"] },
//   { name: "Gadgets & Gear", icon: faCogs, subs: ["Reviews", "Hardware", "Buy Guides"] },
//   { name: "Guides & Tutorials", icon: faChalkboardTeacher, subs: ["Guides", "How-To Fixes"] },
//   { name: "Innovation & AI", icon: faMicrochip, subs: ["AI", "Startups", "Emerging Tech"] },
//   { name: "Learning & Growth", icon: faPersonRays, subs: ["CLIMB", "UpSkill", "Industry Insights"] },
//   { name: "Spotlight", icon: faFire, subs: ["Featured", "Spotlight", "Trending Now"] },
//   { name: "WorldWideTech", icon: faGlobeAfrica, subs: ["Africa Rising", "WorldWideTech", "Policy & Progress"] },
// ];

// export interface Subcategory {
//   id: number;
//   name: string;
//   slug: string;
// }

// export default function FloatingMenu() {
//   const [expanded, setExpanded] = useState(false);
//   const [active, setActive] = useState<IconDefinition | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const menu = menuRef.current;
//       const button = buttonRef.current;

//       // Check if click is outside both menu and button
//       if (
//         menu && 
//         button && 
//         !menu.contains(event.target as Node) && 
//         !button.contains(event.target as Node)
//       ) {
//         setExpanded(false);
//         setActive(null);
//       }
//     };

//     if (expanded) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }
//   }, [expanded]);

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         ref={buttonRef}
//         onClick={() => setExpanded((prev) => !prev)}
//         className={`fixed left-0 top-1/2 -translate-y-1/2 z-[60]
//         w-6 h-7 flex items-center justify-center rounded-r-lg
//         bg-transparent text-white shadow-md hover:bg-zinc-700/80 active:bg-zinc-700/80
//         backdrop-blur-md border-3 border-zinc-600 border-l-0
//         transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400`}
//         aria-label="Toggle menu"
//       >
//         {/* VC */}
//         <FontAwesomeIcon icon={faChevronRight} />
//       </button>

//       {/* Floating Menu */}
//       <div
//         onMouseEnter={() => setExpanded(true)}
//         // onMouseLeave={() => {
//           // setExpanded(false);
//           // setActive(null);
//         // }}
//         ref={menuRef}
//         className={`fixed pl-6 sm:pl-5 top-1/2 left-0 transform -translate-y-1/2
//         bg-transparent hover:backdrop-blur-lg shadow-lg rounded-r-2xl overflow-hidden
//         border-3 border-zinc-700 transition-all duration-300
//         ${
//           expanded
//             ? "w-60 sm:w-70 opacity-100 backdrop-blur-lg"
//             : "opacity-0 w-10 h-20"
//         } z-50`}
//         >
//         <ul className="flex flex-col gap-1 p-2 text-gray-200">
//           {categories.map((cat, index) => (
//             <li
//               key={index}
//               className="relative group"
//               onMouseEnter={() => setActive(cat.icon)}
//               onMouseLeave={() => setActive(null)}
//             >
//               <div
//                 className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer hover:bg-[rgba(255,192,203,0.1)]
//                 transition-all duration-200`}
//               >
//                 <span className="text-xl">
//                   <FontAwesomeIcon icon={cat.icon} size="sm" />
//                 </span>
//                 {expanded && (
//                   <span className="text-sm font-medium active:text-lime-400">
//                     {cat.name}
//                   </span>
//                 )}
//               </div>

//               {/* Submenu */}
//               {expanded && active === cat.icon && (
//                 <div
//                   className="ml10 mx-2 mt-1 bg-black/3 hover:backdrop-blur-md rounded-lg shadow-lg
//                   px-2 py-0 sm:py-1 text-xs sm:text-sm flex flex-col gap-1 animate-fade-in"
//                 >
//                   {cat.subs.map((sub, i) => (
//                     <Link
//                       key={i}
//                       href={`/blog/subcategory/${sub.slug}`}
//                       className="active:text-pink-400 hover:bg-[rgba(255,192,203,0.1)] text-xs flex items-center justify-center px- py-0.5 rounded-md transition"
//                     >
//                       {sub}.
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

'use client';

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch, faUserShield, faMicrochip, faGlobeAfrica,
  faFire, faPersonRays, faHandHoldingDollar, faCogs,
  faCameraRetro, faChalkboardTeacher, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/features/api/apiSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  "Apps & Software": faCodeBranch,
  "Cybersecurity": faUserShield,
  "Digital Lifestyle": faCameraRetro,
  "Fintech & Crypto": faHandHoldingDollar,
  "Gadgets & Gear": faCogs,
  "Guides & Tutorials": faChalkboardTeacher,
  "Innovation & AI": faMicrochip,
  "Learning & Growth": faPersonRays,
  "Spotlight": faFire,
  "WorldWideTech": faGlobeAfrica,
};

export default function FloatingMenu() {
  const [expanded, setExpanded] = useState(false);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
        setActiveCatId(null);
      }
    };
    if (expanded) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expanded]);

  if (isLoading) {
    return (
      <button
        ref={buttonRef}
        onClick={() => setExpanded(p => !p)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] w-6 h-7 flex items-center justify-center rounded-r-lg bg-transparent text-white shadow-md hover:bg-zinc-700/80 active:bg-zinc-700/80 backdrop-blur-md border-3 border-zinc-600 border-l-0 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setExpanded(p => !p)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] w-6 h-9 sm:w-5 sm:h-7 flex items-center justify-center 
                  rounded-r-lg bg-transparent text-white shadow-md hover:bg-zinc-700/80 active:bg-zinc-700/80 
                  backdrop-blur-md border-3 border-zinc-600 border-l-0 transition-all duration-300 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </button>

      <div
        ref={menuRef}
        onMouseEnter={() => setExpanded(true)}
        className={`fixed pl-5 top-1/2 left-0 transform -translate-y-1/2 bg-black/5
                   shadow-lg rounded-r-2xl overflow-y-auto border-3 border-zinc-600 transition-all duration-300 
                   ${expanded ? "w-70 opacity-100 backdrop-blur-lg" : "opacity-0 w-8 h-10"} z-50`}
      >
        <ul className="flex flex-col gap-1 p-2 text-gray-200">
          {categories.map(cat => {
            const icon = iconMap[cat.name] || null;
            return (
              <li
                key={cat.id}
                className="relative group"
                onMouseEnter={() => setActiveCatId(cat.id)}
                onMouseLeave={() => setActiveCatId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCatId(activeCatId === cat.id ? null : cat.id);
                }}
              >
                <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[rgba(255,192,203,0.08)] active:bg-[rgba(255,192,203,0.08)] transition-all duration-200">
                  <span className="text-xl">
                    {icon ? <FontAwesomeIcon icon={icon} size="sm" /> : <span className="w-6 h-6 md:w-5 md:h-5" />}
                  </span>
                  {expanded && (
                    <span className="text-md font-medium active:text-lime-400 select-none">
                      {cat.name}
                    </span>
                  )}
                </div>

                {expanded && activeCatId === cat.id && (
                  <div className="ml-10 mx-2 mt-1 g-black/3 bg-[rgba(255,192,203,0.01)] hover:backdrop-blur-md rounded-lg shadow-lg px-2 py-1 text-xs sm:text-sm flex flex-col gap-1 animate-fade-in">
                    {cat?.subcategories?.slice()
                      .sort((a, b) => a.name.length - b.name.length)
                      .map(sub => (
                        <Link
                          key={sub.id}
                          href={`/blog/subcategory/${sub.slug}`}
                          className="active:text-pink-400 hover:bg-[rgba(255,192,203,0.05)] active:bg-[rgba(255,192,203,0.05)] text-sm fle items-start justify-cente px-3 py-1 rounded-md transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}