import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faShieldAlt, faRobot, faGlobe, faLightbulb, faBookOpen, faCoins, 
faMobileAlt, faUsers, faChartLine, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";


const categories = [
  { name: "Apps & Software", icon: faLaptopCode, subs: ["Stack", "Rundown", "Dev Digest"] },
  { name: "Cybersecurity", icon: faShieldAlt, subs: ["Data Defense", "Secure Habits", "Privacy & Compliance"] },
  { name: "Digital Lifestyle", icon: faUsers, subs: ["Social", "Tech Culture", "Entertainment"] },
  { name: "Fintech & Crypto", icon: faCoins, subs: ["Key Players", "Digital Money", "Blockchain & Crypto"] },
  { name: "Gadgets & Gear", icon: faMobileAlt, subs: ["Reviews", "Hardware", "Buy Guides"] },
  { name: "Guides & Tutorials", icon: faChartLine, subs: ["Guides", "How-To Fixes"] },
  { name: "Innovation & AI", icon: faRobot, subs: ["AI", "Startups", "Emerging Tech"] },
  { name: "Learning & Growth", icon: faBookOpen, subs: ["CLIMB", "UpSkill", "Industry Insights"] },
  { name: "Spotlight", icon: faLightbulb, subs: ["Featured", "Spotlight", "Trending Now"] },
  { name: "WorldWideTech", icon: faGlobe, subs: ["Africa Rising", "WorldWideTech", "Policy & Progress"] },
];

export default function FloatingMenu() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<IconDefinition | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = menuRef.current;
      const button = buttonRef.current;
      
      // Check if click is outside both menu and button
      if (
        menu && 
        button && 
        !menu.contains(event.target as Node) && 
        !button.contains(event.target as Node)
      ) {
        setExpanded(false);
        setActive(null);
      }
    };

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [expanded]);

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setExpanded((prev) => !prev)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-[60]
        w-7 h-7 flex items-center justify-center rounded-r-lg
        bg-transparent text-white shadow-md hover:bg-zinc-700/80 active:bg-zinc-700/80
        backdrop-blur-md border-3 border-zinc-600 border-l-0
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400`}
        aria-label="Toggle menu"
      >
        {/* VC */}
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Floating Menu */}
      <div
        // onMouseEnter={() => setExpanded(true)}
        // onMouseLeave={() => {
          // setExpanded(false);
          // setActive(null);
        // }}
        ref={menuRef}
        className={`fixed pl-6 sm:pl-5 top-1/2 left-0 transform -translate-y-1/2
        bg-transparent hover:backdrop-blur-lg shadow-lg rounded-r-2xl overflow-hidden
        border-3 border-zinc-700 transition-all duration-300
        ${
          expanded
            ? "w-55 sm:w-70 opacity-100 backdrop-blur-lg"
            : "opacity-0 w-10 h-20"
        } z-50`}
        >
        <ul className="flex flex-col gap-1 p-2 text-gray-200">
          {categories.map((cat, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setActive(cat.icon)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className={`flex items-center gap-2 p-0.5 sm:p-1.5 rounded-lg cursor-pointer hover:bg-zinc-700/50
                transition-all duration-200`}
              >
                <span className="text-xl">
                  <FontAwesomeIcon icon={cat.icon} size="sm" />
                </span>
                {expanded && (
                  <span className="text-xs sm:text-sm font-medium active:text-lime-400">
                    {cat.name}
                  </span>
                )}
              </div>

              {/* Submenu */}
              {expanded && active === cat.icon && (
                <div
                  className="ml-10 mt-1 bg-black/3 hover:backdrop-blur-md rounded-lg shadow-lg
                  px-2 py-0 sm:py-1 text-xs sm:text-sm flex flex-col gap-1 animate-fade-in"
                >
                  {cat.subs.map((sub, i) => (
                    <a
                      key={i}
                      href="#"
                      className="active:text-pink-400 hover:bg-zinc-700/50 text-xs px-2 py-0.5 rounded-md transition"
                    >
                      {sub}.
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
