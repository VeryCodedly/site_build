// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import { useGetCourseQuery } from "@/features/api/apiSlice";
// import Link from "next/link";
// import { motion as Motion } from "framer-motion";
// import { Lessons } from "@/types/post";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// export default function CoursePage() {
//   const { slug } = useParams();
//   const { data: course, isLoading, isError } = useGetCourseQuery(slug as string);

//   if (isLoading) {
//     return (
//       <section className="flex justify-center items-center h-screen bg-black text-gray-400">
//         Loading course details...
//       </section>
//     );
//   }

//   if (isError || !course) {
//     return (
//       <section className="flex flex-col justify-center items-center h-screen bg-black text-gray-400">
//         <p>Oops! Couldn’t load this course.</p>
//         <Link
//           href="/learn"
//           className="mt-6 text-lime-400 hover:underline hover:font-semibold"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} /> Back to courses
//         </Link>
//       </section>
//     );
//   }

//   // handle if lessons are paginated
//   const lessons = course.lessons ?? course.lessons ?? [];

//   return (
//     <section className="w-full bg-black text-white min-h-screen py-12 px-6 sm:px-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Back button */}
//         <Link
//           href="/learn"
//           className="inline-flex items-center text-lime-400 mb-5 hover:underline hover:font-semibold"
//         >
//           <FontAwesomeIcon className="mr-2" icon={faArrowLeft} size="sm" />
//         </Link>

//         {/* Course header */}
//         <div className="mb-10">
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-lime-300">
//             {course.title}
//           </h1>
//           <p className="text-gray-300 text-base leading-relaxed max-w-4xl space-y-4">
//             {course.description || "No description available for this course."}
//           </p>
//         </div>

//         {/* Lessons list */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6 text-lime-300">
//             Lessons
//           </h2>

//           {lessons.length === 0 ? (
//             <p className="text-gray-400 italic">No lessons yet.</p>
//           ) : (
//             <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
//               {lessons.map((lesson: Lessons, index: number) => (
//                 <Motion.div
//                   key={lesson.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.01 }}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 1.03 }}
//                   className="bg-zinc-900 rounded-2xl p-5 transition-all hover:shadow-[0_0_10px_#222222] active:shadow-[0_0_20px_rgba(164,255,130,0.1)]"
//                 >
//                   <h3 className="text-lg font-semibold mb-2 text-lime-300">
//                     {lesson.title}
//                   </h3>
//                   {/* <p className="text-gray-300/80 text-sm mb-3 line-clamp-2">
//                     {lesson.content_plain_text || "No description yet."}
//                   </p> */}
//                   <Link
//                     href={`/learn/${slug}/${lesson.slug}`}
//                     className="text-lime-400 text-sm font-medium hover:underline"
//                   >
//                     View Lesson <FontAwesomeIcon icon={faArrowRight} size="sm" />
//                   </Link>
//                 </Motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { memo } from "react";
import { useParams } from "next/navigation";
import { useGetCourseQuery } from "@/features/api/apiSlice";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { Lessons } from "@/types/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Memoized Lesson Card Component
const LessonCard = memo(({ lesson, slug, index }: { 
  lesson: Lessons; 
  slug: string; 
  index: number 
}) => (
  <Motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-zinc-700/50 
               hover:border-lime-400/30 hover:shadow-[0_0_10px_rgba(164,255,130,0.1)] 
               transition-all duration-300 group"
  >
    <h3 className="text-base sm:text-md mb-2 text-gray-200 group-hover:text-lime-300 transition-colors">
      <span className="pr-1 text-sm font-semibold">{lesson.order}.</span>{lesson.title}
    </h3>
    <Link
      href={`/learn/${slug}/${lesson.slug}`}
      className="inline-flex items-center gap-1 text-lime-400 text-sm font-medium 
                 hover:text-white active:text-white hover:underline transition-all duration-200"
    >
      View Lesson 
      <FontAwesomeIcon icon={faArrowRight} size="sm" className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </Motion.div>
));

LessonCard.displayName = "LessonCard";

export default function CoursePage() {
  const { slug } = useParams();
  const { data: course, isLoading, isError } = useGetCourseQuery(slug as string);

  // Early return for loading/error states
  if (isLoading) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-black text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
          Loading course details...
        </div>
      </section>
    );
  }

  if (isError || !course) {
    return (
      <section className="flex flex-col justify-center items-center min-h-screen bg-black text-gray-400 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-white/80">Course Not Found</h2>
          <p>Oops! Could not load this course.</p>
          <Link
            href="/learn"
            className="mt-6 inline-flex items-center gap-2 text-lime-400 hover:text-white 
                     underline underline-offset-2 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
            Back to courses
          </Link>
        </div>
      </section>
    );
  }

  // Single source of truth for lessons - handles both cases
  const lessons: Lessons[] = Array.isArray(course.lessons) ? course.lessons : [];

  return (
    <section className="w-full bg-gradient-to-b from-black to-zinc-950 text-white min-h-screen py-8 sm:py-12 px-4">
      {/* Back button */}
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-lime-400 mb-7 hover:text-white active:text-white 
                     underline underline-offset-2 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            {/* Back to courses */}
          </Link>
        </Motion.div>

      <div className="max-w-4xl mx-auto px-3 sm:px-8">
        {/* Course header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
            {course.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-4xl">
            {course.description || "No description available for this course."}
          </p>
        </Motion.div>

        {/* Lessons section */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-lime-300">
            Lessons ({lessons.length})
          </h2>

          {lessons.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg italic">No lessons available yet.</p>
              <p className="mt-2 text-sm">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              {lessons.map((lesson, index) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  slug={slug as string} 
                  index={index} 
                />
              ))}
            </div>
          )}
        </Motion.div>
      </div>
    </section>
  );
}