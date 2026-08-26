'use client';

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Series } from "@/types/know";
import { usePathname } from "next/navigation";


export default function KnowMenu({ series }: { series: Series[] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeSerieId, setActiveSerieId] = useState<number | null>(null);
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
        setActiveSerieId(null);
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
      setActiveSerieId(null);
    }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        setActiveSerieId(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); // adjust threshold
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // watches showButton and closes menu if button hides
  useEffect(() => {
    if (!showButton && expanded) {
      setExpanded(false);
      setActiveSerieId(null);
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
        className={`fixed overflow-hidden pl-6 sm:pl-7 top-1/2 left-0 transform -translate-y-1/2 bg-black/30 hover:backdrop-blur-lg
                   shadow-lg rounded-r-3xl border border-l-0 border-white/20 transition-all duration-200 ease-in-out
                   ${expanded ? "w-77 sm:w-71 h[541.5px] sm:h-[421px] md:h[461px] lg:h[461px] max-h-[86vh] opacity-100 backdrop-blur-lg" : "opacity-0 w-8 h-10"} z-50`}
      >
        <ul className="flex flex-col gap-1 py-3 text-gray-200 h-full min-h-0 overflow-y-auto -webkit-overflow-scrolling-touch custom-scrollbar">
          {series.map(serie => {   // Replace serie later please that's not a word
            const icon = faCirclePlay; // Replace with actual icon logic later
            return (
              <li
                key={serie.slug}
                className="relative group"
                onMouseEnter={() => setActiveSerieId(serie.id)}
                onMouseLeave={() => setActiveSerieId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSerieId(activeSerieId === serie.id ? null : serie.id);
                }}
              >
                <div className="flex items-center gap-3.5 sm:gap-4 p-2.5 sm:p-1.5 px-4 rounded-xl hover:bg-white/8 active:bg-white/8 transition-all duration-200">
                  <span className="text-xl text-pink-200/90 hover:text-pink-300/90 active:text-pink-300/90">
                    {icon ?
                      <Link href={`/know/series/${serie.slug}`}
                        aria-label="Series page link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(false);
                          setActiveSerieId(null);
                        }} >
                        <FontAwesomeIcon icon={icon} size="sm" />
                      </Link>
                      : <span className="w-6 h-6 md:w-5 md:h-5" />}
                  </span>
                  {expanded && (
                    <span className="text-base sm:text-sm text-white/80 sm:font-medium active:text-lime-200 select-none">
                      {serie.title}
                    </span>
                  )}
                </div>

                {/* {expanded && activeCatId === cat.id && (
                  <div 
                  onClick={(e) => e.stopPropagation()}
                  className="ml-9.5 sm:ml-8 bg-black/3 hover:backdrop-blur-md rounded-xl shadow-lg text-xs sm:text-sm flex flex-col animate-fade-in">
                    {cat?.subcategories?.slice()
                      .sort((a, b) => a.name.length - b.name.length)
                      .map(sub => (
                        <Link
                          key={sub.slug}
                          href={`/read/subcategory/${sub.slug}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(false);
                            setActiveCatId(null);
                          }}
                          className="rounded-md py-1.5 sm:py-1 hover:bg-white/8 active:bg-white/8">
                          <span className="text-white/80 font-medium active:text-pink-200 text-sm sm:text-xs fle items-start justify-cente p-5 transition">
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                  </div>
                )} */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}