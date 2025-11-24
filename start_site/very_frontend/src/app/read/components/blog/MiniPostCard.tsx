// components/blog/PostCardMini.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

export default function MiniPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/read/${post.slug}`} className="flex gap-3 group" aria-label={`Link for ${post.caption}`}>
      {post.image && (
        <div className="relative w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] flex-shrink-0">
          <Image
            src={post.image}
            alt={post.alt || "post-image"}
            fill
            sizes="80px"
            className="text-xs rounded-lg object-cover object-center"
            priority
            aria-label={`${post.caption} link`}
          />
        </div>

      )}
      <div>
        <h3 className="text-sm lg:text-base text-white group-hover:text-lime-400 group-active:text-lime-400 line-clamp-">
          {post.title}
        </h3>
        <p className="text-xs text-gray-400/80 mt-1">
          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </Link>
  );
}