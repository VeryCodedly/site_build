"use client";

import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { useSectionLoader } from "@/hooks/useSectionLoader";
import MediaItem from "@/app/know/components/MediaItem";
import { MediaCard, KnowMainData, KnowMoreData } from "@/types/know";
import KnowHero from "./components/KnowHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";


interface Props {
  initialData: {
    featured: MediaCard[];
    latest: MediaCard[];
  };
}

export default function KnowClient({ initialData }: Props) {
  const { featured = [], latest = [] } = initialData || {};

  const { ref: mainFormatsRef, data: mainData } = useSectionLoader<KnowMainData>(
    `${process.env.NEXT_PUBLIC_API_URL}/know/know-formats/`
  );

  const { videos = [], shorts = [], skits = [], episodes = [] } = mainData || {};

  const { ref: moreFormatsRef, data: moreData } = useSectionLoader<KnowMoreData>(
    `${process.env.NEXT_PUBLIC_API_URL}/know/know-formats/`
  );

  const { podcasts = [], interviews = [], livestreams = [], talks = [] } = moreData || {};

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <KnowHero />

      <Motion.h2
        className="mt-18 text-4xl md:text-5xl font-bold mb-6 px-8 md:px-8 text-center text-white/90"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Media  from <span className="text-lime-400">VeryCodedly</span>
      </Motion.h2>
      <p className="text-sm sm:text-base text-gray-400 max-w-56 sm:max-w-xl mx-auto text-center">
        Press play.
      </p>

      <main id="know" className="relative max-w-6xl mx-auto py-12 px-5 sm:px-6">
        {/* Featured */}
        {featured.length > 0 && (
          <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
            <div className="flex items-center gap-2 min-w-[80px]">
              <span className="w-1.5 h-8 bg-pink-400 rounded-xs group-hover/bar:bg-lime-400 group-active/bar:bg-lime-400" />
              <Motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl text-white leading-tight tracking-tighter"
              >
                Featured
              </Motion.h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
              {featured.map((media) => (
                <div key={media.slug}>
                  <MediaItem media={media} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Latest */}
        {latest.length > 0 ? (
          <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
            <div className="flex items-center gap-2 min-w-[80px]">
              <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
              <Motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl text-white leading-tight tracking-tighter"
              >
                Latest
              </Motion.h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
              {latest.map((media) => (
                <div key={media.slug}>
                  <MediaItem media={media} />
                </div>
              ))}
            </div>
          </section>
         ) : (
          <section className="mt-10 rounded-3xl border border-dashed border-zinc-900 py-8 px-3 text-center">
            <p className="text-3xl text-slate-400 mb-4 opacity-50"><FontAwesomeIcon icon={faPlay} /></p>
            <h3 className="text-2xl font-semibold text-white opacity-80">
              You&apos;re early.
            </h3>
            <p className="text-gray-500 my-2 max-w-md mx-auto leading-7 tracking-tight">
              Nothing here for now, check back soon!
            </p>
          </section>
        )}

        {/* Main formats */}
        <section ref={mainFormatsRef}>
          {mainData && (
            <>
              {videos.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight"
                    >
                      Video
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {videos.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {skits.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight"
                    >
                      Skits
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {skits.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {shorts.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight"
                    >
                      Shorts
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {shorts.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {episodes.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-3 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight tracking-tighter"
                    >
                      Episodes
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {episodes.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </section>

        {/* More formats */}
        <section ref={moreFormatsRef}>
          {moreData && (
            <>
              {podcasts.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight tracking-tighter"
                    >
                      Podcasts
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {podcasts.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {interviews.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight tracking-tighter"
                    >
                      Interviews
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {interviews.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {livestreams.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight tracking-tighter"
                    >
                      Livestreams
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {livestreams.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {talks.length > 0 && (
                <section className="my-14 px-2 flex flex-col md:flex-row md:items-start gap-6 md:gap-4 group/bar">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                    <Motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl text-white leading-tight"
                    >
                      Talks
                    </Motion.h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
                    {talks.map((media) => (
                      <div key={media.slug}>
                        <MediaItem media={media} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="py-30 px-2 pb-18 text-center">
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-2xl font-bold text-white/90 tracking-tighter">
              Wanna keep the convo going?
            </h4>
            <p className="text-sm text-gray-400/80 mt-1">
              We&apos;re waiting, join us.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Link
              href="/connect"
              className="font-bold sm:font-bold border-3 border-gray-500/100 bg-lime-400 text-black px-8 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
            >
              Connect
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
