'use client';

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch, faUserShield, faMicrochip, faGlobeAfrica,
  faFire, faPersonRays, faHandHoldingDollar, faCogs,
  faCameraRetro, faChalkboardTeacher, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Category } from "@/types/post";
import { usePathname } from "next/navigation";


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

export default function FloatingMenu({ categories }: { categories: Category[] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showButton, setShowButton] = useState(false);
  const pathname = usePathname();
  // const { data = [] } = categories;

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
  
      // useEffect(() => {
      //     const handleScroll = () => setShowTopBtn(window.scrollY > 100);
      //     window.addEventListener("scroll", handleScroll);
      //     return () => window.removeEventListener("scroll", handleScroll);
      // }, []);

    useEffect(() => {
      setExpanded(false);
      setActiveCatId(null);
    }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        setActiveCatId(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); // adjust threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // watches showButton and closes menu if button hides
  useEffect(() => {
    if (!showButton && expanded) {
      setExpanded(false);
      setActiveCatId(null);
    }
  }, [showButton, expanded]);

  return (
    <>
      { showButton && (
      <button
        ref={buttonRef}
        onClick={() => setExpanded(p => !p)}
        className="fixed p-3 left-0 top-1/2 -translate-y-1/2 z-[60] w-6 h-7 sm:w-6 sm:h-7 flex items-center justify-center 
                  rounded-r-xl bg-transparent text-gray-300/90 hover:text-white active:text-white shadow-[0_0_5px_3px_rgba(55,55,55,0.4)] 
                  hover:shadow-[0_0_7px_3px_rgba(255,255,255,0.08)] active:shadow-[0_0_7px_3px_rgba(255,255,255,0.08)] hover:bg-white/8 active:bg-white/8 
                  backdrop-blur-md border-l-0 transition-all duration-300 focus:outline-none 
                  focus:ring-2 focus:ring-offset-1 focus:ring-pink-300/70"
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" className={`transition-transform duration-300 ease-in-out ${expanded ? "rotate-90" : ""}`} />
      </button>)}

      <div
        ref={menuRef}
        onMouseEnter={() => setExpanded(true)}
        className={`fixed overflow-hidden pl-6 top-1/2 left-0 transform -translate-y-1/2 bg-black/30 hover:backdrop-blur-lg
                   shadow-lg rounded-r-3xl border border-l-0 border-white/20 transition-all duration-200 ease-in-out
                   ${expanded ? "w-70 sm:w-70 h-[61%] md:h-[461px] m:h-full ax-h-[86vh] opacity-100 backdrop-blur-lg" : "opacity-0 w-8 h-10"} z-50`}
      >
        <ul className="flex flex-col gap-1 py-3 text-gray-200 h-full min-h-0 overflow-y-auto -webkit-overflow-scrolling-touch custom-scrollbar">
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
                <div className="flex items-center gap-3 sm:gap-4 p-2.5 md:p-1.5 px-4 rounded-xl hover:bg-white/8 active:bg-white/8 transition-all duration-200">
                  <span className="text-xl text-white">
                    {icon ?
                      <Link href={`/read/category/${cat.slug}`}
                        aria-label="Category page link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(false);
                          setActiveCatId(null);
                        }} >
                        <FontAwesomeIcon icon={icon} size="sm" />
                      </Link>
                      : <span className="w-6 h-6 md:w-5 md:h-5" />}
                  </span>
                  {expanded && (
                    <span className="text-md md:text-sm text-white font-medium active:text-lime-200 select-none">
                      {cat.name}
                    </span>
                  )}
                </div>

                {expanded && activeCatId === cat.id && (
                  <div 
                  onClick={(e) => e.stopPropagation()}
                  className="ml-7 bg-black/3 hover:backdrop-blur-md rounded-xl shadow-lg text-xs sm:text-sm flex flex-col animate-fade-in">
                    {cat?.subcategories?.slice()
                      .sort((a, b) => a.name.length - b.name.length)
                      .map(sub => (
                        <Link
                          key={sub.id}
                          href={`/read/subcategory/${sub.slug}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(false);
                            setActiveCatId(null);
                          }}
                          className="rounded-md py-1.5 sm:py-1 hover:bg-white/8 active:bg-white/8">
                          <span className="text-white font-medium active:text-pink-200 text-sm md:text-xs fle items-start justify-cente p-5 transition">
                            {sub.name}
                          </span>
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
