// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { useGetCoursesQuery } from '@/features/api/apiSlice';
// import { Course } from '@/types/post';

// export default function CourseList() {
//   const { data: courses, isLoading, isError } = useGetCoursesQuery();

//   if (isLoading)
//     return (
//       <section className="flex justify-center items-center min-h-screen bg-black text-gray-400">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
//           Loading course details...
//         </div>
//       </section>
//     );

//   if (isError)
//     return (
//       <div className="text-center py-20">
//         <p className="text-rose-400 text-lg mb-4">Failed to load posts</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
//         >
//           Try Again
//         </button>
//       </div>
//     );

//   return (
//     // <div className="fle flex-col gap-2 w-full max-w-3xl mx-auto">
//     <>
//       {courses?.results?.map((course: Course) => (
//         <div key={course.id}
//           className="flex flex-row px-4 py-3 sm:px-5 sm:py-2 rounded-2xl shadow bg-zinc-900/80 border-2 border-zinc-800 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
//                      active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-1 sm:gap-3"
//         >
//           {/* Text Section */}
//         < div className="flex-1 flex flex-col justify-between">
//             {/* Language - Always on top */}
//             < p className="text-xs font-semibold tracking-tighter text-pink-400 uppercase my-1" >
//               {course.language ?? 'Programming Language'}
//             </p>

//             <Link href={`/learn/${course.slug}`}>
//               {/* Title */}
//               <h2 className="text-base sm:text-xl font-semibold text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition leading-tighter">
//                 {course.title}
//               </h2>

//               {/* Description */}
//               <p className="text-sm text-gray-300/80 line-clamp-3 sm:line-clamp-4 my-1.5 leading-relaxed">
//                 {course.description || 'No description available yet.'}
//               </p>

//               {/* CTA */}
//               <div className="flex items-center justify-between text-sm sm:text-base text-gray-500">
//                 <span className="text-lime-400 font-bold group-hover:text-white flex items-center gap-2">
//                   Start Now <FontAwesomeIcon className="py-2" icon={faArrowRight} size="sm" />
//                 </span>
//               </div>
//             </Link>
//           </div >

//             <div className="flex-shrink-0 items-center justify-center my-auto">
//               <div className="relative w-full h-[120px] sm:h-[160px] sm:w-[120px] md:h-[160px] mx-auto sm:mx-0 aspect-[5/6] sm:aspect-square overflow-hidden">
//                 <Image
//                   fill
//                   className="text-xs rounded-lg object-cover object-center group-hover:brightness-110 transition duration-300"
//                   src={course?.image ?? '/Course-Image.png'}
//                   alt={course?.alt ?? 'Language Image'}
//                   sizes="(max-width: 640px) 100vw, 120px"
//                   priority
//                 />
//               </div>
//             </div>
//         </div >
//       ))
//       }
//       {/* </div> */}
//     </>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useGetCoursesQuery } from '@/features/api/apiSlice';
import { Course } from '@/types/post';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ConfettiCelebration from '../components/ConfettiCelebration';

// LocalStorage keys
const PROGRESS_KEY = (slug: string) => `course_progress_${slug}`;
const CONFETTI_SHOWN = (slug: string) => `confetti_shown_${slug}`;

export default function CourseList() {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [confettiCourse, setConfettiCourse] = useState<string | null>(null);
  const hasMounted = useRef(false);

  // Load progress + decide if need to celebrate
  useEffect(() => {
    if (typeof window === 'undefined' || !courses?.results) return;

    const map: Record<string, number> = {};
    let celebrateSlug: string | null = null;

    courses.results.forEach((course: Course) => {
      const saved = localStorage.getItem(PROGRESS_KEY(course.slug));
      const total = course.lessons?.length || 1;

      if (saved) {
        const completed = JSON.parse(saved).length;
        const percent = Math.round((completed / total) * 100);
        map[course.slug] = percent;

        // Only celebrate if *just* hit 100% and flag is missing
        if (percent === 100 && !localStorage.getItem(CONFETTI_SHOWN(course.slug))) {
          celebrateSlug = course.slug;
        }
      } else {
        map[course.slug] = 0;
      }
    });

    setProgressMap(map);

    // Only fire once per page load
    if (celebrateSlug && !hasMounted.current) {
      localStorage.setItem(CONFETTI_SHOWN(celebrateSlug), 'true');
      setConfettiCourse(celebrateSlug);
    }

    hasMounted.current = true;
  }, [courses]);

  if (isLoading)
    return (
      <section className="flex justify-center items-center min-h-screen bg-black text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4" />
          Loading courses...
        </div>
      </section>
    );

  if (isError)
    return (
      <div className="text-center py-20">
        <p className="text-rose-400 text-lg mb-4">Failed to load courses</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <section>
      {/* Confetti triggered by course slug */}
      <ConfettiCelebration trigger={!!confettiCourse} onDone={() => setConfettiCourse(null)} />

      {/* Course List */}
      {courses?.results?.map((course: Course) => {
        const progress = progressMap[course.slug] ?? 0;
        const isComplete = progress === 100;

        return (
          <div
            key={course.id}
            className="flex flex-row px-4 py-2 sm:px-5 sm:py-3 rounded-2xl shadow bg-zinc-900/80 border-2 border-zinc-800/50 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                       active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-3 sm:gap-5 mb-4"
          >
            {/* Text */}
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-xs font-semibold tracking-tighter text-pink-400 uppercase my-1">
                {course.language ?? 'Programming Language'}
              </p>

              <Link href={`/learn/${course.slug}`} aria-label={`Link for ${course.title}`}>
                <h2 className="text-base sm:text-xl font-semibold text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition leading-tighter flex items-center gap-1">
                  {course.title}
                  {isComplete && <FontAwesomeIcon icon={faCheckCircle} className="text-lime-400" />}
                </h2>

                <p className="text-sm text-gray-300/80 line-clamp-3 sm:line-clamp-4 my-1.5 leading-relaxed">
                  {course.description || 'No description available yet.'}
                </p>

                {/* Progress Bar */}
                {progress > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-lime-400 to-lime-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center justify-between text-base mt-2.5">
                  <span className="text-lime-400 font-bold group-hover:text-white flex items-center gap-2">
                    {progress > 0 ? 'Continue' : 'Start Now'}
                    <FontAwesomeIcon className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" icon={faLongArrowRight} size="sm" />
                  </span>
                  {isComplete && (
                    <span className="text-xs text-lime-300 font-medium">Completed!</span>
                  )}
                </div>
              </Link>
            </div>

            {/* Image */}
            <div className="flex-shrink-0 items-center justify-center my-auto">
              <div className="relative w-[90px] h-[110px] sm:h-[130px] sm:w-[110px] lg:w-[120px] lg:h-[140px] mx-auto aspect-[5/6] sm:aspect-square overflow-hidden">
                <Image
                  fill
                  className="rounded-lg object-cover object-center group-hover:brightness-110 transition duration-300"
                  src={course?.image ?? '/Course-Image.png'}
                  alt={course?.alt ?? 'Course image'}
                  sizes="(max-width: 640px) 100vw, 120px"
                  priority
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}