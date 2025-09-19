import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faClose } from "@fortawesome/free-solid-svg-icons";

const logos = [
  { src: "/logos/react.svg", alt: "React"},
  { src: "/logos/javascript.svg", alt: "JavaScript"},
  { src: "/logos/python.svg", alt: "Python"},
  { src: "/logos/django-plain.svg", alt: "Django"},
  { src: "/logos/github.svg", alt: "GitHub"},
  { src: "/logos/vscode.svg", alt: "VSCode"},
  { src: "/logos/git.svg", alt: "Git"},
  { src: "/logos/npm.svg", alt: "NPM"},
  { src: "/logos/java.svg", alt: "Java"},
  { src: "/logos/android.svg", alt: "Android"},
  { src: "/logos/postcss.svg", alt: "PostCSS"},
  { src: "/logos/opensourcehardware.svg", alt: "OpenSource"},
  { src: "/logos/vitejs.svg", alt: "Vite"},
  { src: "/logos/tailwindcss.svg", alt: "Tailwind"},
  { src: "/logos/nodejs.svg", alt: "Nodejs"},
  { src: "/logos/html5.svg", alt: "HTML"},
  { src: "/logos/powershell.svg", alt: "PowerShell"},
  { src: "/logos/google.svg", alt: "Google"},
  { src: "/logos/linux.svg", alt: "Linux"},
  { src: "/logos/cloudflare.svg", alt: "Cloudflare"},
  ];

export default function MorphingPanel({ className = "" }) {
  // const [isRotating, setIsRotating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);
  const [allowTouchSpin, setAllowTouchSpin] = useState(false);
  const [isTouchSpinning, setIsTouchSpinning] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);
  const cubeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !introPlayed) {
          setIntroPlayed(true); // ✅ mark as played

          // start auto-spin
          setAutoSpin(true);

          // stop after 20s (2 cycles)
          setTimeout(() => {
            setAutoSpin(false);

            // wait 10s, then allow touch spin
            setTimeout(() => setAllowTouchSpin(true), 10000);
          }, 20000);
        }
      },
      { threshold: 0.5 }
    );

    if (cubeRef.current) observer.observe(cubeRef.current);

    return () => {
      if (cubeRef.current) observer.unobserve(cubeRef.current);
    };
  }, [introPlayed]);

  const getFaceTransform = (index) => {
    switch (index) {
      case 0: return "rotateY(45deg) translateZ(100px)";     // Front
      case 1: return "rotateY(225deg) translateZ(100px)";   // Back
      case 2: return "rotateY(135deg) translateZ(100px)";    // Right
      case 3: return "rotateY(-45deg) translateZ(100px)";   // Left
      case 4: return "rotateX(90deg) translateZ(100px) rotateZ(-45deg)";    // Top
      case 5: return "rotateX(-90deg) translateZ(100px) rotateZ(45deg)";   // Bottom
      default: return "";
    }
  };

  // Divide logos into 6 sets (5 logos per face)
  const groupedLogos = Array.from({ length: 6 }, (_, i) =>
    logos.slice(i * 4, i * 4 + 4)
  );

  return (
    <div className="relative flex items-center justify-center w-[200px] h-[200px] md:w-[210px] md:h-[210px]  
        sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px] perspective-[900px] mx-auto">

      <div className="absolute border-10 top-1/2 left-1/2 w-28 h-28 rounded-full bg-cyan-400/50 blur-3xl -translate-x-1/2 -translate-y-1/2 z-[-1] animate-pulse shadow-[0_0_10px_#00ffe0]" />

{/* Center logo */}
      <div className="absolute group top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 flex items-center justify-center transition duration-500 z-10 opacity-10 animate-float hover:opacity-70 drop-shadow-[0_0_10px_#9AE600] rounded-full">
      <button className="cursor-pointer"
        onClick={() => setShowModal(true)}
        style={{
          transform: "translateZ(0px)",
          // top: "50%",
          // left: "50%",
          transformOrigin: "center",
          transformStyle: "preserve-3d",
          // translate: "-50% -50%",
        }}>

      <Image
        src="/images/favicon-main.svg"
        alt="logo"
        className="object-cover hover:scale-110 transition duration-500 rounded-full"
        width={60}
        height={60}
      />
      </button>
      </div>

      <div className={`relative w-full h-full transition-transform duration-[5000ms] group hover:[transform:rotateX(-95deg)_rotateY(-270deg)_rotateZ(58deg)] [transform-style:preserve-3d]
          ${autoSpin ? "animate-spin-slow" : ""}
          ${isTouchSpinning && allowTouchSpin ? "animate-spin-slow" : ""}`}
          onTouchStart={() => allowTouchSpin && setIsTouchSpinning(true)}
          onTouchEnd={() => setIsTouchSpinning(false)}

          >
        {groupedLogos.map((group, faceIndex) => (
          <div
            key={faceIndex}
            className="absolute w-full h-full bg-white/5 border-1 border-black/40 rounded-2xl flex flex-col items-center justify-center gap-2 backdrop-blur-sm ring-3 ring-lime-400/30 hover:ring-lime-400/60 inset-0 z-[-1]
                        shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]"
            style={{ transform: getFaceTransform(faceIndex) }}
            >
            {/* Inside the face div */}
            {/* <div className="absolute top-1 left-1 w-2 h-2 bg-lime-400 rounded-full blur-sm opacity-80" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-lime-400 rounded-full blur-sm opacity-80" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-lime-400 rounded-full blur-sm opacity-80" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-lime-400 rounded-full blur-sm opacity-80" /> */}

            {/* Glow corners */}
            {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-2 h-2 bg-lime-400 rounded-full blur-sm opacity-80`}
              />
            ))}

            {/* Logos in a circle */}
            {group.map((logo, i) => {
              const angle = (360 / group.length) * i - 90; // Start at top
              const radius = 45; // Adjust for spacing (in px)
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
              <Image
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="object-contain absolute transition duration-300 hover:drop-shadow-[0_0_4px_#fff] hover:scale-111 hover:opacity-100 opacity-80"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  }}
                width={40}
                height={40}
                sizes="(max-width: < 240px) 10px,
                      (max-width: 240px) 40px,
                      (max-width: 640px) 40px, 
                      (max-width: 768px) 40px, 40px"
              />
              );
            })}
          </div>
        ))}
      </div>

      {showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-black/35 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg max-w-md w-[100%] text-center relative"
          onClick={(e) => e.stopPropagation()} // prevent close when clicking modal
        >
          <h2 className="text-lg font-bold mb-2">Core Stack</h2>
          <p className="mb-4 text-gray-300 text-xs">
            You found the core. <br />
            These logos are more than tools — they’re the stack that built this space, and we're glad you’re part of it.
          </p> 

          <button
            onClick={() => setShowModal(false)}
            className="cursor-pointer px-1 py-0.5 bg-lime-600 hover:bg-lime-400 text-black font-extrabold rounded-md transition"
          >
            <FontAwesomeIcon icon={ faClose } size="sm" />
          </button>
        </div>
    </div>
  )}
  </div>
  );
}
