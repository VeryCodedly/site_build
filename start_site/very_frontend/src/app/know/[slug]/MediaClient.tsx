"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import WatchLinks from "../components/WatchLinks";
import Transcript from "../components/Transcript";
import RelatedMedia from "../components/RelatedMedia";
import { MediaCard } from "@/types/know";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendar, faStopwatch, faCopy } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


interface Props {
  media: MediaCard;
}

export default function MediaClient({ media }: Props) {
  return (
    <main className="relative w-full bg-gradient-to-b from-black to-zinc-950/30 text-white min-h-screen py-10 px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="my-3"
      >
        <Link
          href="/know"
          className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300 text-sm sm:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="sr-only">Back to Know</span>
        </Link>
      </motion.div>
      <section className="max-w-4xl mx-auto min-h-screen bg-black text-white pb-8">
        <div className="relative w-full group overflow-hidden select-none">
          <Image
            src={media.thumbnail}
            alt={media.title}
            width={1920}
            height={1080}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
            priority
            className="w-full h-[50vh] sm:h-[60vh] lg:h-[65vh] object-cover brightness-75 hover:brightness-100 transition-all duration-500"
          />
          <p className="absolute bottom-4 left-4 text-white/40 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs">
            {media.media_format?.title || 'Video'}
          </p>
        </div>

        <div className="mt-6 mb-6">
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4.5 mb-4 text-sm text-gray-400">
            {media.series && (
              <Link href={`/know/series/${media.series.slug}`}
                className="bg-lime-400/10 text-lime-400 active:text-lime-200 hover:scale-105 active:scale-95 transition duration-200 px-3 py-1 rounded-full text-sm font-medium tracking-tighter"
              >
                {media.series.title}
              </Link>
            )}

            <Link href={`/know/topic/${media.topic.slug}`}
              className="bg-pink-400/10 text-pink-400 active:text-pink-200 hover:scale-105 active:scale-95 transition duration-200 px-3 py-1 rounded-full text-sm font-medium tracking-tighter"
            >
              {media.topic.title}
            </Link>

            <span className="flex items-center gap-1.5 text-xs md:text-sm ">
              <FontAwesomeIcon icon={faCalendar} />
              {new Date(media.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
              })}
            </span>
            {media.duration && (
              <span className="flex items-center gap-1.5 text-xs md:text-sm text-gray-300">
                <FontAwesomeIcon icon={faStopwatch} />
                {media.duration}
              </span>
            )}

            <div className="inline-block">
              <span className="flex gap-3.5">
                <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(media.title)}&url=https://verycodedly.com/know/${media.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 transition duration-400 active:text-lime-400 hover:scale-110 active:scale-60 text-lg" title="Share on Twitter">
                  <FontAwesomeIcon icon={faTwitter} size="1x" />
                </Link>
                <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=https://verycodedly.com/know/${media.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 transition duration-400 active:text-lime-400 hover:scale-110 active:scale-60 text-lg" title="Share on LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
                </Link>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=https://verycodedly.com/know/${media.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 transition duration-400 active:text-lime-400 hover:scale-110 active:scale-60 text-lg" title="Share on Facebook">
                  <FontAwesomeIcon icon={faFacebook} size="1x" />
                </Link>
                <Link href={`https://wa.me/?text=${encodeURIComponent(media.title + " — https://verycodedly.com/know/" + media.slug)}`} target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 transition duration-400 active:text-lime-400 hover:scale-110 active:scale-60 text-lg" title="Share on WhatsApp">
                  <FontAwesomeIcon icon={faWhatsapp} size="1x" />
                </Link>
                <button onClick={() => navigator.clipboard.writeText(`https://verycodedly.com/know/${media.slug}`)} className="hover:text-lime-400 transition duration-400 active:text-lime-500 hover:scale-110 active:scale-60 text-lg" title="Copy link">
                  <FontAwesomeIcon icon={faCopy} size="1x" />
                </button>
              </span>
            </div>
          </div>

          <h1 className="mt-8 ml-1 text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent leading-tighter">
            {media.title}
          </h1>

          {media.description && (
            <p className="ml-1 text-gray-300/80 text-sm sm:text-base tracking-wide italic border-l-4 border-lime-400/50 rounded-sm pl-4 mt-4">
              {media.description}
            </p>
          )}
        </div>

        {media.tags && media.tags.length > 0 && (
          <div className="my-8 mb-16">
            <div className="flex flex-wrap gap-2">
              {media.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300/10 hover:bg-lime-400/10 text-gray-300/90 hover:text-lime-300 px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <WatchLinks media={media} />

        {media.transcript && <Transcript transcript={media.transcript} />}

        {media.related.length > 0 && (
          <RelatedMedia title="Related Media" media={media.related} />
        )}

        {media.series && media.series_media.length > 0 && (
          <RelatedMedia title="In This Series" media={media.series_media} />
        )}
      </section >
    </main>
  );
}
