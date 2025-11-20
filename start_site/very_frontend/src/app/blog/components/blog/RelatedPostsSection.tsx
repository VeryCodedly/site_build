// components/blog/RelatedPostsSection.tsx
'use client';

import { useGetPostsBySubcategoryQuery, useGetSubcategoriesQuery } from '@/features/api/apiSlice';
import { motion as Motion } from 'framer-motion';
import MiniPostCard from './MiniPostCard';
import { Post } from '@/types/post';

interface RelatedPostsSectionProps {
    subSlug: string;
}

export default function RelatedPostsSection({ subSlug }: RelatedPostsSectionProps) {
    // Latest 
    const { data: latestPosts = [] } = useGetPostsBySubcategoryQuery(subSlug);
    const latest = latestPosts.slice(0, 5);
  
    const { data: subs = [] } = useGetSubcategoriesQuery();
    const sub = subs.find((s) => s.slug === subSlug);
    const name = sub?.name || 'Subcategory';

    // Trending (global)
    const { data: trendingPosts = [] } = useGetPostsBySubcategoryQuery('trending-now');
    const trending = trendingPosts.slice(1, 5); // Skip first to avoid duplication with main post

    return (
        <section className="mt-14">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 py-10 lg:px-14">

                {/* LEFT: LATEST IN SUB */}
                <Motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-lime-400 rounded-full" />
                        Latest in {name}
                    </h2>
                    {latest.length > 0 ? (
                        <div className="grid gap-4">
                            {latest.map((post: Post) => (
                                <MiniPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No posts yet.</p>
                    )}
                </Motion.div>

                {/* RIGHT: TRENDING NOW */}
                <Motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-pink-400 rounded-full" />
                        Trending Now
                    </h2>
                    {trending.length > 0 ? (
                        <div className="grid gap-4">
                            {trending.map((post: Post) => (
                                <MiniPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Quiet for now.</p>
                    )}
                </Motion.div>
            </div>
        </section>
    );
}