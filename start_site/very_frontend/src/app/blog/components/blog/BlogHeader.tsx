"use client";

import { useState, useEffect } from "react";

export default function BlogHeader() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Fake states for the "window buttons"
  const [collapsed, setCollapsed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down → hide
      } else {
        setShow(true); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
        ${show ? "translate-y-0" : "-translate-y-full"} backdrop-blur-sm
        bg-gradient-to-b from-black/70 to-green-900/90 text-gray-100
        border-b border-gray-600 shadow-[0_4px_12px_rgba(0,0,0,0.9)]`}>

  <div className="flex justify-between items-center h-8 px-4">
    {/* Left: terminal circles */}
    
    {/* Center: site name */}
    <span className="text-md font-semibold tracking-wide">&gt;_ VeryCodedly</span>

    {/* Right: placeholder */}
    <div className="w-12" />
    <div className="flex items-center gap-2">
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="w-3.5 h-3.5 rounded-full bg-[#FF6B6B] hover:brightness-110 transition
        focus:ring-2 focus:outline-none focus:ring-offset-1 focus:ring-[#FF6B6B]/90"
        title="Close (Collapse Sidebar)"
      />
      <button
        onClick={() => setMinimized((prev) => !prev)}
        className="w-3.5 h-3.5 rounded-full bg-chartreuse hover:brightness-110 transition
        focus:ring-2 focus:outline-none focus:ring-offset-1 focus:ring-chartreuse-200"
        title="Minimize (Shrink Blog)"
      />
      <button
        onClick={() => setMaximized((prev) => !prev)}
        className="w-3.5 h-3.5 rounded-full bg-cyan-400 hover:brightness-110 transition
        focus:ring-2 focus:outline-none focus:ring-offset-1 focus:ring-cyan-200"
        title="Maximize (Expand Blog)"
      />
    </div>

  </div>
</header>


      {/* BLOG WRAPPER */}
      <main
        className={`
          transition-all duration-500 mt-16
          ${collapsed ? "ml-0" : "ml-64"} 
          ${minimized ? "scale-75 opacity-60" : "scale-100 opacity-100"}
          ${maximized ? "ml-0 w-full" : ""}
        `}
      >
        {/* Example blog content */}
        <div className="p-6 bg-gray-900 text-green-300 font-mono rounded-lg shadow-lg">
          <p>&gt;_ Blog</p>
          <p>$ ls posts</p>
        </div>
      </main>
    </>
  );
}
