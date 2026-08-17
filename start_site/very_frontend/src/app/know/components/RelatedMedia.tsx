
"use client";

import Image from "next/image";
import Link from "next/link";
import { MediaCard } from "@/types/know";

interface Props {
  media: MediaCard[];
  title: string;
}

export default function RelatedMedia({ media, title }: Props) {
  if (media.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto mt-12">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-3 h-3 bg-lime-400 rounded-full" />
        <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {media.map((item) => (
          <Link
            key={item.slug}
            href={`/know/${item.slug}`}
            className="group"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900/50">
              <Image
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.duration && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-gray-400 font-mono">
                  {item.duration}
                </span>
              )}
            </div>

            <h3 className="mt-3 text-sm font-medium text-gray-100 group-hover:text-lime-400 group-active:text-lime-300 transition-colors duration-200 line-clamp-2">
              {item.title}
            </h3>

            {item.topic && (
              <p className="mt-0.5 text-[10px] text-gray-500 uppercase tracking-wider">
                {typeof item.topic === 'object' ? item.topic.title : item.topic}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
