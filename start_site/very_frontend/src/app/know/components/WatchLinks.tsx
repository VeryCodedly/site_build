"use client";

import { MediaCard } from "@/types/know";
import Link from "next/link";
import Image from "next/image";

interface Props {
  media: MediaCard;
}

export default function WatchLinks({ media }: Props) {
  const links = [
    { name: "YouTube", url: media.youtube_url, icon: "/socials/youtube.png" },
    { name: "Instagram", url: media.instagram_url, icon: "/socials/instagram.png" },
    { name: "TikTok", url: media.tiktok_url, icon: "/socials/tiktok.png" },
    { name: "Twitter", url: media.twitter_url, icon: "/socials/twitter.png" },
    { name: "Facebook", url: media.facebook_url, icon: "/socials/facebook.png" },
    { name: "LinkedIn", url: media.linkedin_url, icon: "/socials/linkedin.png" },
    { name: "Spotify", url: media.spotify_url, icon: "/socials/spotify.png" },
    { name: "Apple Podcasts", url: media.apple_url, icon: "/socials/apple-podcasts.png" },
  ].filter((link) => link.url);

  if (links.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto my-18">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-3 h-3 bg-lime-400 rounded-full" />
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Available on</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {links.map(({ name, url, icon }) => (
          <Link
            key={name}
            href={url!}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-3xl border border-gray-800/40 bg-white/[0.02] px-4 py-2.5 transition-all duration-200 active:scale-90 hover:border-gray-600/60 hover:bg-white/[0.04] active:border-gray-600/60 active:bg-white/[0.04]"
            onClick={() => {
              fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/know/media/${media.slug}/view/`,
                { method: "POST" }
              ).catch(() => {});
            }}
          >
            <div className="relative w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0">
              <Image
                src={icon}
                alt={name}
                // fill
                // sizes=""
                width={48}
                height={48}
                className="object-contain transition-transform duration-200 group-hover:scale-125"
              />
            </div>
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white group-active:text-white transition-colors duration-200">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
