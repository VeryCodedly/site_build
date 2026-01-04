'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollKey = `scrollPos_${pathname}`;

    // Save current scroll position
    const saveScroll = () => {
      sessionStorage.setItem(scrollKey, window.scrollY.toString());
    };

    // Handle back/forward navigation
    const handlePopState = () => {
      requestAnimationFrame(() => {
        const saved = sessionStorage.getItem(scrollKey);
        if (saved && parseInt(saved, 10) > 100) {
          window.scrollTo(0, parseInt(saved, 10));
        } else {
          window.scrollTo(0, 0); // Forward or fresh visit → top
        }
      });
    };

    // Save on page unload/refresh/close
    window.addEventListener('beforeunload', saveScroll);

    // Handle back/forward
    window.addEventListener('popstate', handlePopState);

    // On initial mount (direct visit or refresh): restore if meaningful scroll saved
    requestAnimationFrame(() => {
      const saved = sessionStorage.getItem(scrollKey);
      if (saved && parseInt(saved, 10) > 100) {
        window.scrollTo(0, parseInt(saved, 10));
      } else {
        window.scrollTo(0, 0);
      }
    });

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', saveScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  return null;
}

// 'use client';

// import { useEffect } from 'react';

// export default function ScrollRestoration() {
//   useEffect(() => {
//     // Restore scroll position on mount (after refresh or navigation)
//     const savedScroll = sessionStorage.getItem(`scrollPos_${window.location.pathname}`);
//     if (savedScroll) {
//         window.scrollTo(0, parseInt(savedScroll, 10));
//     }

//     // Save scroll position before unload/refresh/navigation
//     const saveScrollPosition = () => {
//       sessionStorage.setItem(`scrollPos_${window.location.pathname}`, window.scrollY.toString());
//     };

//     // Save on beforeunload (refresh, close tab, etc.)
//     window.addEventListener('beforeunload', saveScrollPosition);

//     // save on Next.js route change (client-side navigation)
//     // handle this via popstate listener for simplicity
//     window.addEventListener('popstate', saveScrollPosition);

//     return () => {
//       window.removeEventListener('beforeunload', saveScrollPosition);
//       window.removeEventListener('popstate', saveScrollPosition);
//       // Final save on unmount
//       saveScrollPosition();
//     };
//   }, []);

//   // This component renders nothing
//   return null;
// }