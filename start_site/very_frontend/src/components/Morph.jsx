// src/components/MorphingPanel.jsx
import React, { useEffect, useState } from "react";
import clsx from "clsx";

// Array of imported assets
import cloudflare from "../assets/logos/cloudflare.svg";
import django from "../assets/logos/django-plain.svg";
import react from "../assets/logos/react.svg";
import python from "../assets/logos/python.svg";
import javascript from "../assets/logos/javascript.svg";
import java from "../assets/logos/java.svg";
import git from "../assets/logos/git.svg";
import powershell from "../assets/logos/powershell.svg";
import github from "../assets/logos/github.svg";
import vite from "../assets/logos/vitejs.svg";
import tailwind from "../assets/logos/tailwindcss.svg";
import google from "../assets/logos/google.svg";
import html from "../assets/logos/html5.svg";
import npm from "../assets/logos/npm.svg";
import postcss from "../assets/logos/postcss.svg";


const items = [
  { type: "logo", src: cloudflare, alt: "Cloudfare" },
  { type: "logo", src: django, alt: "Django" },
  { type: "logo", src: javascript, alt: "JavaScript" },
  { type: "logo", src: git, alt: "Git" },
  { type: "logo", src: powershell, alt: "PowerShell" },
  { type: "logo", src: react, alt: "React" },
  { type: "logo", src: python, alt: "Python" },
  { type: "logo", src: java, alt: "Java" },
  { type: "logo", src: vite, alt: "Vite" },
  { type: "logo", src: tailwind, alt: "Tailwind CSS" },
  { type: "logo", src: google, alt: "Google" },
  { type: "logo", src: html, alt: "HTML5" },
  { type: "logo", src: npm, alt: "NPM" },
  { type: "logo", src: postcss, alt: "PostCSS" },
  { type: "logo", src: github, alt: "GitHub" }, 
  {
    type: "snippet",
    content: `import React from 'react';\nimport ReactDOM from 'react-dom'`,
  },
  {
    type: "snippet",
    content:
      `const greet = (human) => {\n` +
      `  return \`Hello, \${human}!\`;\n` +
      `};\n\nconsole.log(greet('World'));`,
  },
  {
    type: "quote",
    content: `"Hello, World!" isn’t just a phrase.`,
  },
  {
    type: "debug",
    content: `[ERROR] Unexpected genius detected in line 42`,
  },
  {
    type: "quote",
    content: `Today's tech, tomorrow's problems.`,
  },
  // ... add up to 57 variations
];

const getRandomItem = () =>
  items[Math.floor(Math.random() * items.length)];

export default function MorphingPanel() {
  const [cards, setCards] = useState(
    Array.from({ length: 10 }, () => getRandomItem())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setCards((prev) =>
        prev.map((card, i) =>
          i === randomIndex ? getRandomItem() : card
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <>
    {/* Morphing Graphics Placeholder */}
    {/* <div className="relative h-[350px] w-ful rounded-xl border border-lime-400 bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] p-5"> */}
          {/* This is where the morphing graphic component will go */}
          {/* <div className="absolute inset-0 flex items-center justify-center text-lime-400 text-lg">
            [ Morphing Code + Symbols + Logos Here ]
          </div> */}
        <div className="grid grid-cols-5 md:grid-cols-5 gap-2 w-ful mx-w-7xl px-2 py-2">
        {cards.map((item, index) => (
            <div
                key={index}
                className={clsx(
                "rounded-xl p-2 transition-all duration-700",
                "hover:scale-105 hover:border-lime-400/30 hover:shadow-xl",
                "text-white flex items-center justify-center text-center min-h-[120p]"
            )}
            >
            {item.type === "logo" ? (
                <img
                src={item.src}
                alt={item.alt}
                className="h-16 w-16 object-contai transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <pre className="text-xs whitespace-pre-wrap text-lime-300">
                {item.content}
                </pre>
            )}
            </div>
        ))}
        </div>
    {/* </div> */}
    </>
  );
};
