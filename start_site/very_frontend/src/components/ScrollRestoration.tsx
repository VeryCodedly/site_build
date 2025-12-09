'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function useScrollRestoration() {
  const pathname = usePathname();
  const scrollPositions = useRef(new Map<string, number>());

  useEffect(() => {
    // Disable Next's auto-scroll to top on route changes
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Key by pathname for multi-page support
    const key = `scroll:${pathname}`;

    // Restore on mount (after hydration)
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const pos = parseInt(saved, 10);
      if (pos > 0) {  // Skip if already at top
        requestAnimationFrame(() => {
          window.scrollTo(0, pos);  // Use RAF to wait for paint
        });
      }
    }

    // Save on scroll (throttled to avoid spam)
    let ticking = false;
    const saveScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollPositions.current.set(key, window.scrollY);
          sessionStorage.setItem(key, window.scrollY.toString());
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', saveScroll, { passive: true });

    // Save on unload/route change
    const handleUnload = () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('scroll', saveScroll);
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();  // Save on unmount too
    };
  }, [pathname]);
}
