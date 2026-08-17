import { useState, useRef, useEffect } from "react";

export function useSectionLoader<T>(url: string) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<T | null>(null);

  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        if (hasLoadedRef.current) return;

        observer.unobserve(el); // better than disconnect?

        try {
          const res = await fetch(url, {
            cache: "force-cache",
          });

          if (!res.ok) return;

          const json = await res.json();
          hasLoadedRef.current = true;
          setData(json);
        } catch (err) {
          console.error(err);
          hasLoadedRef.current = false;  // Added another attempt if request failed
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [url]);

  return {
    ref,
    data,
    loaded: !!data,
  };
}