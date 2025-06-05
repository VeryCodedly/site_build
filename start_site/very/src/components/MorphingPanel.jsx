// src/components/MorphingPanel.jsx
import React from "react";
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

const stackedItems = [
  { src: react, alt: "React", top: "top-[5%]", left: "left-[10%]", z: "z-20", rotate: "rotate-[6deg]" },
  { src: javascript, alt: "JavaScript", top: "top-[20%]", left: "left-[25%]", z: "z-10", rotate: "-rotate-[4deg]" },
  { src: python, alt: "Python", top: "top-[35%]", left: "left-[5%]", z: "z-30", rotate: "rotate-[2deg]" },
  { src: tailwind, alt: "Tailwind", top: "top-[55%]", left: "left-[20%]", z: "z-10", rotate: "rotate-[8deg]" },
  { src: django, alt: "Django", top: "top-[10%]", left: "left-[60%]", z: "z-30", rotate: "-rotate-[3deg]" },
  { src: cloudflare, alt: "Cloudflare", top: "top-[40%]", left: "left-[70%]", z: "z-20", rotate: "-rotate-[5deg]" },
  { src: github, alt: "GitHub", top: "top-[60%]", left: "left-[50%]", z: "z-30", rotate: "rotate-[3deg]" },
  { src: git, alt: "Git", top: "top-[30%]", left: "left-[45%]", z: "z-10", rotate: "-rotate-[6deg]" },
  { src: html, alt: "HTML", top: "top-[70%]", left: "left-[10%]", z: "z-20", rotate: "-rotate-[1deg]" },
  { src: google, alt: "Google", top: "top-[15%]", left: "left-[80%]", z: "z-20", rotate: "rotate-[4deg]" },
  { src: java, alt: "Java", top: "top-[60%]", left: "left-[80%]", z: "z-20", rotate: "-rotate-[3deg]" },
  { src: vite, alt: "Vite", top: "top-[70%]", left: "left-[60%]", z: "z-10", rotate: "rotate-[2deg]" },
  { src: powershell, alt: "PowerShell", top: "top-[45%]", left: "left-[85%]", z: "z-10", rotate: "-rotate-[6deg]" },
  { src: npm, alt: "NPM", top: "top-[5%]", left: "left-[40%]", z: "z-10", rotate: "rotate-[5deg]" },
];

export default function MorphingPanel() {
  return (
    <>
      <div className="relative pt-10 h-[360px] rounded-3xl  bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] p-5 overflow-hidden">
          {/* This is where the morphing graphic component will go */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-lime-400/10 via-pink-400/5 to-[#000]/20 backdrop-blur-xl will-change-transform" />
          
    {/* <div className="relative w-[350px] h-[350px] max-w-7xl mx-auto my-16 bg-gradient-to-br from-[#111] to-[#1f1f1f] rounded-3xl overflow-hidden shadow-xl"> */}
      {/* Background Glow */}

      {/* Cards */}
      {stackedItems.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.top} ${item.left} ${item.z} ${item.rotate} 
            p-1 backdrop-blur-lg rounded-xl border border-white/5 
            shadow-xl transition hover:scale-105`}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-16 h-16 object-contain"
          />
        </div>
      ))}
    </div>
    </>
  )
};

