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

        // prevents double fetch
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        observer.unobserve(el); // better than disconnect?

        try {
          const res = await fetch(url);
          if (!res.ok) return;

          const json = await res.json();
          setData(json);
        } catch (err) {
          console.error(err);
        }
      },
      {
        rootMargin: "300px",
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