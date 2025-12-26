'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion as Motion } from 'framer-motion';
import { Post } from '@/types/post';

interface CarouselProps {
  posts: Post[]; 
  className?: string;
}

export default function Carousel({ posts = [], className = "" }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const current = posts[index];

  return (
    <section className={`py-10 px-6 mt-6 ${className}`}>
      <Link href={`/read/${current?.slug}`}>
        <p className="text-xs pr-2.5 w-full font-semibold text-right tracking-tight text-lime-400 uppercase mb-2">
          {current?.category?.name ?? 'Category'}
        </p>

        <Motion.div
          key={current.slug}
          className="relative group cursor-pointer overflow-hidden rounded-xl select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Image */}
          <Motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            {current.image ? (
              <Image
                src={current.image}
                alt={current.alt || current.title}
                width={1200}
                height={600}
                className="w-full h-98 object-cover rounded-xl shadow-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                priority
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl" />
            )}
          </Motion.div>

          {/* Gradient + Text */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent rounded-xl pointer-events-none" />
          <Motion.div
            key={`text-${current.slug}`}
            className="absolute bottom-6 left-6 right-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-3">
              {current.title}
            </h1>
            <p className="text-gray-300 text-sm line-clamp-4">
              {current.excerpt}
            </p>
          </Motion.div>
        </Motion.div>
      </Link>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-4">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? 'bg-lime-400 w-7' : 'bg-gray-600'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}