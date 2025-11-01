
// // Generate metadata (SEO)
// // export async function generateMetadata({ params }: Props): Promise<Metadata> {
// //   const slug = params.slug;
// //   return {
// //     title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Posts | VeryCodedly`,
// //     description: `All posts in the ${slug} subcategory`,
// //   };
// // }

'use client';

import { notFound } from 'next/navigation';
import { useGetPostsBySubcategoryQuery, useGetSubcategoriesQuery } from '@/features/api/apiSlice';
import PostCard from '../../components/blog/PostCard';
import FloatingMenu from '../../components/blog/FloatingMenu';
import Link from 'next/link';
import { motion as Motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import MorphingPanel from '@/components/MorphingPanel';


export default function SubcategoryPage() {
  const { slug } = useParams();
  const { data: posts = [], isLoading, isError } = useGetPostsBySubcategoryQuery(slug as string);
  const { data: subs = [] } = useGetSubcategoriesQuery();

  const slugString = slug as string;
  const sub = subs.find((s) => s.slug === slugString);
  const about = sub?.about || '';

  if (isLoading)
    return
  <section className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-zinc-900 text-gray-400">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
      Loading post...
    </div>
  </section>;

  if (isError) notFound();

  return (
    <>
      {posts.length === 0 && (
        <div className="empty-state py-18 px-6 text-center bg-transparent backdrop-blur-sm rounded-xl shadow-2xl">
          <div className="max-w-md mx-auto">

            <MorphingPanel />
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
      <FloatingMenu />
      {posts.length >= 1 && (
        <section className="min-h-screen bg-black text-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <nav className="text-xs mb-12 md:mb-8 lg:mb-4 md:text-sm">
              <Link href="/blog" className="text-gray-400 hover:text-lime-400">Blog</Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-lime-400 capitalize">{slugString}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center capitalize">
              {slugString.replace(/-/g, ' ')}
            </h1>

            <div className="text-xs sm:text-base px-1">
              <p className="relative text-gray-200 text-left mb-18 max-w-3xl mx-auto leading-relaxed font-light border-l-4 border-lime-500/80 pl-4 sm:pl-8">
                <span className="whitespace-pre-wrap block italic before:content-['“'] before:text-lime-400 after:content-['”'] after:text-lime-400 text-white/70">
                  {about}
                </span>
                {/* <span className="block w-16 h-[2px] mx-auto my-8  rounded-full"></span> */}
              </p>

            </div>

            <div className="space-y-6 w-[70%] mx-auto">
              {posts.map((p, index) =>
                <Motion.div
                  key={index}
                  // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                  className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
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
        </section>
      )}
    </>
  );
}