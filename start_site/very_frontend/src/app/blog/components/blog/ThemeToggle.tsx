"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;

    if (saved) {
      setTheme(saved);
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
      } else if (saved === "light") {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // system default
      setTheme("system");
    }
  }, []);

  const toggleTheme = () => {
    let newTheme: "light" | "dark" | "system";

    if (theme === "light") newTheme = "dark";
    else if (theme === "dark") newTheme = "system";
    else newTheme = "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // system → remove manual override
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 cursor-pointer"
    >
      {theme === "light" && "🌙"}
      {theme === "dark" && "☀️"}
      {theme === "system" && "💻"}
    </button>
  );
}
