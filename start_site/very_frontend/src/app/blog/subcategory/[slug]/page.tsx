'use client';

import { useGetPostsBySubcategoryQuery, useGetSubcategoriesQuery } from '@/features/api/apiSlice';
import PostCard from '../../components/blog/PostCard';
import Link from 'next/link';
import { motion as Motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Post } from '@/types/post';
import MiniPostCard from '../../components/blog/MiniPostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileAlt } from '@fortawesome/free-solid-svg-icons';


export default function SubcategoryPage() {
  const { slug } = useParams();
  const { data: posts = [], isLoading, isError } = useGetPostsBySubcategoryQuery(slug as string);
  const { data: subs = [] } = useGetSubcategoriesQuery();

  const slugString = slug as string;
  const sub = subs.find((s) => s.slug === slugString);
  // const cat = sub?.category || 'Blog';
  const about = sub?.about || '';
  const name = sub?.name || 'Subcategory';

  if (isLoading)
    return
  <section className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-zinc-900 text-gray-400">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
      Loading post...
    </div>
  </section>;

  if (isError)
    return (
      <div className="text-center py-20">
        <p className="text-rose-400 text-lg mb-4">Failed to load posts</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
        >
          Try Again
        </button>
      </div>
    );

  // Latest 4 from current subcategory
  function LatestStories({ slug }: { slug: string }) {
    const { data: posts = [] } = useGetPostsBySubcategoryQuery(slug);
    const latest = posts.slice(0, 5);

    if (latest.length === 0) return <p className="text-gray-500">No stories yet.</p>;

    return (
      <div className="grid gap-4">
        {latest.map((post: Post) => (
          <MiniPostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  // Trending 5 from "trending-now"
  function TrendingStories() {
    const { data: posts = [] } = useGetPostsBySubcategoryQuery('trending-now');
    const trending = posts.slice(1, 5); // Skip first to avoid duplication with main post

    if (trending.length === 0) return <p className="text-gray-500">Quiet for now.</p>;

    return (
      <div className="grid gap-4">
        {trending.map((post: Post) => (
          <MiniPostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <>
      {posts.length === 0 && (
        <div className="empty-state py-18 px-6 text-center bg-transparent backdrop-blur-sm rounded-xl shadow-2xl">
          <div className="max-w-md mx-auto">

            <FontAwesomeIcon className="text-white/50" icon={faFileAlt} size="10x" />
            {/* Headline */}
            <h3 className="text-xl font-semibold text-white my-6">
              No posts yet
            </h3>

            {/* Message */}
            <p className="text-gray-300 leading-relaxed mb-6">
              This space is quiet for now, but great things are on the way.
              <span className="block mt-2 text-lime-400/80 font-medium">
                Check back soon to see what’s new.
              </span>
            </p>

            {/* CTA */}
            <p className="text-sm text-zinc-500 italic">
              Fresh content is being created. Stay tuned.
            </p>

          </div>
        </div>
      )}

      {posts.length > 0 && (
        <>
          <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link href="/blog" className="inline-flex items-center pt-8 pl-6 gap-2 text-lime-400 hover:text-white underline underline-offset-2 transition-all duration-200 text-sm sm:text-base">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              <span className="sr-only">Go Home</span>
            </Link>
          </Motion.div>
          <section className="min-h-screen max-w-[85%] mx-auto bg-black text-white pt-6 pb-14">
            <div className="max-w-6xl mx-auto">
              {/* <nav className="w-fit text-xs mb-10 md:text-xs"> */}

              {/* <span className="mx-1 text-gray-400">/</span>
              <span className="mx-1 text-lime-600">{cat}</span>
              <span className="mx-1 text-gray-400">/</span>
              <span className="text-lime-400 capitalize">{slugString}</span> */}
              {/* </nav> */}

              <h1 className="text-3xl sm:text-4xl font-semibold text-center uppercase">
                {name}
              </h1>

              <div className="text-sm sm:text-md lg:text-base w-[96%] my-8 mx-auto">
                <Motion.p
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative text-left ax-w-3xl mx-auto my-auto tracking-wide font-light border-l-4 border-lime-400/80 rounded-lg pl-4 sm:pl-6">
                  <span className="whitespace-pre-wrap block italic before:content-['“'] before:text-lime-400 after:content-['”'] after:text-lime-400 text-zinc-400/90">
                    {about}
                  </span>
                  {/* <span className="block w-16 h-[2px] mx-auto my-8  rounded-full"></span> */}
                </Motion.p>
              </div>

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"> */}
              <div className="space-y-2.5 w-full sm:w-[90%] mx-auto px-4 lg:px-8 py-10 border-y border-zinc-800 rounded-xl">
                {posts.map((p, index) =>
                  <Motion.div
                    key={index}
                    className="bg-zinc-900/80 rounded-xl p-3.5 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
                                hover:rotateX-3 hover:rotateY-3 active:-translate-y-2 active:rotateX-3 active:rotateY-3" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <PostCard key={p.id} post={p} />
                  </Motion.div>
                )}
              </div>
            </div>

            {/* SPLIT SECTION */}
            <section className="mt-14">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 py-10">

                {/* LEFT: LATEST IN SUB */}
                <Motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-8 bg-lime-400 rounded-full" />
                    Latest in {name}
                  </h2>
                  <LatestStories slug={slugString} />
                </Motion.div>

                {/* RIGHT: TRENDING NOW */}
                <Motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-8 bg-pink-400 rounded-full" />
                    Trending Now
                  </h2>
                  <TrendingStories />
                </Motion.div>
              </div>
            </section>

            {/* </div> */}
          </section>
        </>
      )}
    </>
  );
}