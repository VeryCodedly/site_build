"use client";

import Image from "next/image";
import Link from "next/link";
import { MediaCard } from "@/types/know";

interface Props {
  media: MediaCard;
}

export default function MediaItem({ media }: Props) {
  const format =
    typeof media.media_format === "object"
      ? media.media_format?.title
      : media.media_format;

  const topic =
    typeof media.topic === "object"
      ? media.topic?.title
      : media.topic;

  return (
    <Link href={`/know/${media.slug}`} className="group block h-full">
      <div className=" h-full flex flex-col rounded-2xl overflow-hidden bg-zinc-900/35 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] active:-translate-y-[10px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between">
          {topic && (
            <div className="left-1 px-2 rounded-full tracking-tighter">
              <span className="text-[10px] font-semibold uppercase tracking-tighter text-pink-400">
                {topic}
              </span>
            </div>
          )}

          {media.duration && (
            <div className="right-1 px-2 tracking-tighter">
              <span className="text-[10px] text-gray-400/70">
                {media.duration}
              </span>
            </div>
          )}
        </div>
        <div className="relative aspect-video overflow-hidden bg-zinc-600/60">
          {media.thumbnail ? (
            <Image
              src={media.thumbnail}
              alt={media.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60">
              <span className="text-xs tracking-widest text-zinc-700">VeryCodedly</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-3 py-1 flex items-center justify-between">
            {format && (
              <span className="text-[10px] font-medium uppercase tracking-tighter text-gray-400/40">
                {format}
              </span>
            )}
            {media.published_at && (
              <time className="text-[10px] text-gray-600/80 tracking-tighter">
                {new Date(media.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </div>

        <div className="px-3 py-3">
          <h3 className="capitalize text-sm font-semibold text-gray-100 group-hover:text-lime-400 group-active:text-lime-300 transition leading-snug line-clamp-2">
            {media.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
