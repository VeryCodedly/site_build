'use client';

import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    // Restore scroll position on mount (after refresh or navigation)
    const savedScroll = sessionStorage.getItem(`scrollPos_${window.location.pathname}`);
    if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll, 10));
    }

    // Save scroll position before unload/refresh/navigation
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scrollPos_${window.location.pathname}`, window.scrollY.toString());
    };

    // Save on beforeunload (refresh, close tab, etc.)
    window.addEventListener('beforeunload', saveScrollPosition);

    // save on Next.js route change (client-side navigation)
    // handle this via popstate listener for simplicity
    window.addEventListener('popstate', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('popstate', saveScrollPosition);
      // Final save on unmount
      saveScrollPosition();
    };
  }, []);

  // This component renders nothing
  return null;
}