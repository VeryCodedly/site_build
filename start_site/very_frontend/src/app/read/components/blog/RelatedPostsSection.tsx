// components/blog/RelatedPostsSection.tsx
'use client';

import { motion } from 'framer-motion';
import MiniPostCard from './MiniPostCard';
import { Post } from '@/types/post';

interface Props {
  posts?: Post[];
  trending?: Post[];
  subcategoryName?: string;
  // Fallback for single post page (only name)
  name?: string;
}

export default function RelatedPostsSection({
  posts = [],
  trending = [],
  subcategoryName,
  name: fallbackName, // from single post
}: Props) {
  // Use subcategoryName if available, otherwise fallbackName, otherwise "Posts"
  const displayName = subcategoryName || fallbackName || 'Posts';

  const latest = posts.slice(0, 5);
  const trendingSlice = trending.slice(1, 6);

  return (
    <section className="mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 md:gap-8 py-10 px-2.5 sm:px-0">

        {/* Latest */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl lg:text-2xl tracking-tight font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs" />
            Latest in {displayName}
          </h2>
          {latest.length > 0 ? (
            <div className="grid gap-4">
              {latest.map(post => <MiniPostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </motion.div>

        {/* Trending */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl lg:text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-pink-400 rounded-xs" />
            Right Now in Tech
          </h2>
          {trendingSlice.length > 0 ? (
            <div className="grid gap-4">
              {trendingSlice.map(post => <MiniPostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <p className="text-gray-500">Quiet for now.</p>
          )}
        </motion.div>
        
      </div>
    </section>
  );
}