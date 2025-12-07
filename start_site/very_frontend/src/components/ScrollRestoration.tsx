// app/components/ScrollRestorer.tsx  ← rename it so you know it's the good one
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasRestored = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hasRestored.current) return;

    const key = `scrollPos:${pathname}${searchParams.toString()}`;

    // Only restore once per page load
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const scrollY = parseInt(saved, 10);

      // Wait for fonts + images + layout to settle
      const tryRestore = () => {
        if (document.readyState === "complete") {
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
            hasRestored.current = true;
          });
        } else {
          setTimeout(tryRestore, 50);
        }
      };

      tryRestore();
    }
  }, [pathname, searchParams]);

  // Save scroll position — but only when user actually scrolls
  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeout: NodeJS.Timeout;

    const save = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const key = `scrollPos:${pathname}${searchParams.toString()}`;
        sessionStorage.setItem(key, window.scrollY.toString());
      }, 100); // debounce
    };

    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("beforeunload", save);
    window.addEventListener("pagehide", save);

    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pagehide", save);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  return null;
}