"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import MediaItem from "../components/MediaItem";
import { MediaCard } from "@/types/know";


interface Props {
  initialQuery: string;
}

interface SearchResponse {
  results: MediaCard[];
  count?: number;
}

export default function KnowSearchClient({ initialQuery }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<MediaCard[]>([]);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(Boolean(initialQuery));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!initialQuery) {
      setResults([]);
      setSearched(false);
      return;
    }

    const controller = new AbortController();

    async function search() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/know/search/?q=${encodeURIComponent(
            initialQuery
          )}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data: SearchResponse = await res.json();

        setResults(data.results ?? []);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error(err);

        setError(true);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    search();
    return () => controller.abort();
  }, [initialQuery]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/know/search");
      return;
    }

    router.push(
      `/know/search?q=${encodeURIComponent(trimmed)}`
    );
  }

  return (
    <main className="relative w-full bg-gradient-to-b from-black to-zinc-950/30 text-white min-h-screen py-7 overflow-hidden">
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="ml-6"
      >
        <Link
          href="/know"
          className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300 text-sm sm:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="sr-only">Back to Know</span>
        </Link>
      </Motion.div>

      <section className="relative max-w-[97%] mx-auto pt-12 px-6 sm:px-8 pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-1.5 h-5 bg-lime-400 rounded-sm" />
            <Motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400/85">
              Media
            </Motion.span>
          </div>

          <h1 className="hero max-w-2xl text-5xl sm:text-6xl md:text-7xl font-black tracking-tigh leading-[0.90]">
            <span className="text[4.65rem] sm:text-[4.65rem] md:text-[4.75rem]">w</span>hat would you like to
            <span className="text-lime-400">
              {" "}know?
            </span>
          </h1>

          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-sm text-gray-400/85 max-w-2xl leading-relaxed"
          >
              Search across VeryCodedly&apos;s media library for videos, podcasts, interviews, everything.
          </Motion.p>
        </div>

        <form onSubmit={handleSubmit} className="group mt-6 max-w-full sm:max-w-2xl">
          <div className="relative flex items-center">
            <input
              // type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try AI, react, code, tech news..."
              className="w-full text-sm rounded-3xl bg-white/6 px-8 py-5 pr-14 overflow-hidden border-b-2 border-b-white/12 focus:border-b-2
                        resize-none outline-none focus:border-b-lime-400/70 transition leading-5 text-gray-200 placeholder:text-gray-600"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-4 rounded-lg text-sm text-pink-400/60 group-hover:text-pink-400/80 group-active:text-pink-400/80 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="sr-only">Search button</span>
            </button>
          </div>
        </form>

        <section className="mt-18 sm:mt-18">
          {!searched && (
            <div className="pt-10 pb-4 text-center text-gray-600">
              Search the library to find something worth knowing.
            </div>
          )}

          {searched && loading && (
            <div className="py-20 text-center text-gray-500">
              Searching...
            </div>
          )}

          {searched && !loading && error && (
            <div className="py-20 text-center">
              <p className="text-gray-400">
                Something went wrong while searching.
              </p>
              <button
                onClick={() => router.refresh()}
                className="mt-4 text-lime-400 hover:text-lime-300 text-sm"
              >
                Try again
              </button>
            </div>
          )}

          {searched && !loading && !error && results.length > 0 && (
            <>
              <div className="flex items-end justify-between mb-8 px-2">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                    RESULTS
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold">
                    {results.length}{" "}
                    {results.length === 1 ? "hit" : "hits"}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((media) => (
                  <Motion.div
                    key={media.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <MediaItem media={media} />
                  </Motion.div>
                ))}
              </div>
            </>
          )}

          {searched && !loading && !error &&
            results.length === 0 && (
              <div className="py-16 mt-12 text-center">
                <p className="text-xl sm:text-2xl font-semibold text-white/80 tracking-tight">
                  Whelp. Nothing on that.
                </p>
                <p className="mt-3 text-gray-500">
                  Try another keyword?
                </p>
              </div>
            )}
        </section>
      </section>
    </main>
  );
}