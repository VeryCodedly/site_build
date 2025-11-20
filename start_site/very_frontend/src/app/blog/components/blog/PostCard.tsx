// import Link from 'next/link';
// import { Post } from '@/types/post';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// export default function PostCard({ post }: { post: Post }) {
//   return (
//   <div className="flex flex-row p-4 rounded-xl shadow bg-zinc-900 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] 
//                   active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-4">

//     {/* Left Section: Text */}
//     <div className="flex-1 flex flex-col justify-between">
//       {/* Category */}
//       <p className="text-xs font-semibold tracking-widest text-pink-400 uppercase mb-2">
//         {post.category?.name ?? 'Tech Insight'}
//       </p>
//     <Link href={`/blog/${post.slug}`}>
//       {/* Title */}
//       <h2 className="text-md sm:text-lg font-semibold mb-2 text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition">
//         {post.title}
//       </h2>

//       {/* Excerpt */}
//       <p className="text-sm sm:text-md text-gray-300/80 line-clamp-2 mb-3">
//         {post.excerpt}
//       </p>

//       {/* Meta: Date + Read more */}
//       <div className="flex items-center justify-between text-xs text-gray-500">
//         <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
//         <span className="text-lime-400 text-sm font-bold group-hover:text-white group-active:text-white inline-flex items-center gap-1">
//           Read More <FontAwesomeIcon icon={faArrowRight} size='sm' />
//         </span>
//       </div>
//     </Link>
//     </div>

//     {/* Right Section: Image */}
//     <div className="flex-shrink-0">
//       <Image
//         className="rounded-lg object-cover aspect-square w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] group-hover:brightness-110 transition duration-300"
//         src={post.image ?? '/Post-Image.png'}
//         alt={post.alt ?? 'Post Image'}
//         width={300}
//         height={300}
//       />
//     </div>
//   </div>

//   );
// }
import Link from 'next/link';
import { Post } from '@/types/post';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-row px-4 py-2 rounded-2xl shadow bg-zinc-900 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] 
                    active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-3">

      {/* Left Section: Text */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Category */}
        <p className="text-xs font-semibold tracking-tighter text-pink-400 uppercase my-1">
          {post.category?.name ?? "Post"}
        </p>

        <Link href={`/blog/${post.slug}`} aria-label={`Link for ${post.caption}`}>
          {/* Title */}
          <h2 className="text-base sm:text-md font-semibold text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition leading-tight">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-gray-300/80 line-clamp-2 my-1.5 leading-relaxe">
            {post.excerpt}
          </p>

          {/* Meta: Date + Read more */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="sm:hidden">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span className="hidden sm:inline">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-lime-400 text-sm font-bold group-hover:text-white group-active:text-white inline-flex items-center gap-2" tabIndex={0}>
              Read More <FontAwesomeIcon icon={faLongArrowRight} size='sm' />
            </span>
          </div>
        </Link>
      </div>

      {/* Right Section: Image - Stacked on mobile */}
      {/* <div className="flex-shrink-0 w-full sm:w-auto order-1 sm:order-2 mb-1.5 sm:mb-0">
        <Image
          className="rounded-lg object-cover aspect-square w-[80vw] h-[20vh] sm:w-[120px] sm:h-[120px] mx-auto sm:mx-0 group-hover:brightness-110 transition duration-300"
          src={post.image ?? '/post-image.png'}
          alt={post.alt ?? 'Post Image'}
          width={120}
          height={120}
          priority={false}
          // tabIndex={0}
        />
      </div> */}
      <div className="flex-shrink-0 items-center justify-center my-auto">
        <div className="relative w-[80px] h-[100px] sm:w-[100px] sm:h-[120px] md:w-[120px] md:h-[120px] mx-auto">
          <Image
            src={post.image ?? '/Post-Image.png'}
            alt={post.alt ?? 'Post Image'}
            fill
            sizes="(max-width: 640px) 65vw, 120px"
            className="text-xs rounded-lg object-cover group-hover:brightness-110 transition duration-300 overflow-hidden"
            priority
            fetchPriority="high"
          />
        </div>
      </div>


    </div>
  );
}