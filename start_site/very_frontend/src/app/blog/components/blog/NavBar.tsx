"use client";

import { useState } from "react";
import { Search } from "lucide-react";
// import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const [lang, setLang] = useState("EN");

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <h1 className="font-bold text-xl">Very Codedly</h1>

      {/* Center Search */}
      <div className="relative w-1/2 max-w-md">
        <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-lime-400 outline-none"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm"
        >
          <option>EN</option>
          <option>FR</option>
          <option>ES</option>
        </select>

        {/* Theme Toggle */}
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}
