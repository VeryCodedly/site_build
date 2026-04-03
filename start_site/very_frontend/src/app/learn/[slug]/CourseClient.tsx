"use client";

import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lessons, Course } from "@/types/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLongArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const PROGRESS_KEY = (slug: string) => `course_progress_${slug}`;

const LessonCard = memo(
  ({ lesson, courseSlug }: { lesson: Lessons; courseSlug: string }) => {
    const [completed, setCompleted] = useState<string[]>([]);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const saved = localStorage.getItem(PROGRESS_KEY(courseSlug));
      if (saved) setCompleted(JSON.parse(saved));
    }, [courseSlug]);

    const isCompleted = completed.includes(lesson.slug);

    return (
      <Link href={`/learn/${courseSlug}/${lesson.slug}`} aria-label={lesson.title}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: index * 0.03 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.92 }}
          className="bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-3 border border-zinc-800
                   hover:border-zinc-500/50 hover:shadow-[0_0_6px_#222222] 
                   transition-all duration-300 relative h-full flex flex-col group"
        >
          {isCompleted && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="absolute top-3 right-3 text-lime-400 text-lg z-10"
            />
          )}
          
          {/* Lesson number and title */}
          <div className="flex items-start gap-2 mb-3">
            <span className={`
              w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs font-bold
              ${isCompleted ? 'bg-lime-400 text-black' : 'bg-lime-400/20 text-lime-400'}
            `}>
              {lesson.order}
            </span>
            <h3 className="text-sm text-gray-200 group-hover:text-lime-400 group-active:text-lime-400 transition-colors flex-1">
              {lesson.title}
            </h3>
          </div>
          
          {lesson.duration && (
            <p className="text-xs text-gray-500 mb-2 pl-9">{lesson.duration}</p>
          )}
          
          {/* Start/Review link */}
          <p className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold 
                      group-hover:text-white group-active:text-white mt-auto pl-9">
            {isCompleted ? "Review" : "Start"}
            <FontAwesomeIcon
              icon={faLongArrowRight}
              size="sm"
              className="group-active:translate-x-1 transition-transform"
            />
          </p>
        </motion.div>
      </Link>
    );
  }
);

LessonCard.displayName = "LessonCard";

interface CourseClientProps {
  course: Course;
  slug: string;
}

export default function CourseClient({ course, slug }: CourseClientProps) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      const saved = localStorage.getItem(PROGRESS_KEY(slug));
      if (saved) setCompletedLessons(JSON.parse(saved));
    }
  }, [slug]);

  const lessons: Lessons[] = Array.isArray(course.lessons) ? course.lessons : [];

  if (lessons.length === 0) {
    return (
      <section className="w-full bg-gradient-to-b from-black to-zinc-950/40 text-white min-h-screen pt-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center py-12 text-gray-400">
          <p className="text-lg italic">No lessons available yet.</p>
          <p className="mt-2 text-sm">Check back soon for updates!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-black to-zinc-950/40 text-white min-h-screen pt-10 pb-28 px-8 sm:px-8">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto mb-4 mt-1"
      >
        <Link
          href="/learn"
          aria-label="Back to Course List"
          className="inline-flex items-center gap-2 text-lime-400 hover:text-white transition-all duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="sr-only">Back to Course List</span>
        </Link>
      </motion.div>

      {/* Course Header */}
      <div className="mx-auto px-3 mb-8">
        <div className="relative w-full mb-6 overflow-hidden rounded-2xl">
          <Image
            src={course.image || '/learn-post-image.png'}
            alt={course.alt || 'Featured image'}
            width={1200}
            height={600}
            className="w-full h-[252px] sm:h-[72vh] lg:h-[74vh] object-cover rounded-2xl brightness-65 hover:brightness-90 active:brightness-90 transition-all duration-500"
            priority
            sizes="100vw"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent leading-tighter">
          {course.title}
        </h1>
        
        <p className="text-gray-300 text-base leading-relaxed">
          {course.description || "No description available for this course."}
        </p>
        
        <p className="mt-4 flex items-center gap-2 font-medium text-sm text-gray-300 border-l-4 border-lime-400/50 rounded-sm pl-5 sm:pl-5 ml-0.5">
          Prerequisites: {course.prerequisites || "None"}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-lime-400">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>
            {completedLessons.length} / {lessons.length} completed
          </span>
        </div>
      </div>

      {lessons.length > 0 && (
        <section className="py-5 px-2.5 group/bar flex flex-col md:flex-row md:items-start gap-6 md:gap-4 max-w-5xl mx-auto">
          <div className="px-1 md:px-0 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400 transition-colors" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-white leading-tight whitespace-normal max-w-[70px]"
            >
              Lessons
            </motion.h2>
          </div>

          {/* Grid of lessons */}
          <div className="px-1 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
            {lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.slug}
                lesson={{ ...lesson, order: index + 1 }}
                courseSlug={slug}
              />
            ))}
          </div>
        </section>
      )}

      {/* Progress summary */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 mt-8 text-center">
        <p className="text-xs text-gray-600">
          {completedLessons.length === lessons.length 
            ? "🎉 Congrats! You've completed all lessons. Go you!" 
            : `${lessons.length - completedLessons.length} lessons remaining`}
        </p>
      </div>
    </section>
  );
}

// "use client";

// import React, { memo, useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion as Motion } from "framer-motion";
// import { Lessons, Course } from "@/types/post";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faLongArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// const PROGRESS_KEY = (slug: string) => `course_progress_${slug}`;

// const LessonCard = memo(
//   ({ lesson, courseSlug, index }: { lesson: Lessons; courseSlug: string; index: number }) => {
//     const [completed, setCompleted] = useState<string[]>([]);

//     useEffect(() => {
//       if (typeof window === "undefined") return;
//       const saved = localStorage.getItem(PROGRESS_KEY(courseSlug));
//       if (saved) setCompleted(JSON.parse(saved));
//     }, [courseSlug]);

//     const isCompleted = completed.includes(lesson.slug);

//     return (
//       <Link href={`/learn/${courseSlug}/${lesson.slug}`} aria-label={lesson.title}>
//         <Motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.03 }}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-zinc-900
//                    hover:border-gray-600/30 hover:shadow-[0_0_6px_#222222] ease-in-out
//                    active:border-gray-600/30 active:shadow-[0_0_6px_#222222] transition-all duration-300 group relative"
//         >
//           {isCompleted && (
//             <FontAwesomeIcon
//               icon={faCheckCircle}
//               className="absolute top-3 right-2 sm:right-3 text-lime-400 text-lg"
//             />
//           )}
//           <h3 className="text-base mb-2 text-gray-200 group-hover:text-lime-400 group-active:text-lime-400 transition-colors">
//             <span className="pr-1 text-sm font-semibold">{lesson.order}.</span>
//             {lesson.title}
//           </h3>
//           <p className="inline-flex items-center gap-2 text-lime-400 text-sm font-bold group-hover:text-white group-active:text-white hover:underline active:underline transition-all duration-200">
//             {isCompleted ? "Review" : "Start"} Lesson
//             <FontAwesomeIcon
//               icon={faLongArrowRight}
//               size="sm"
//               className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform"
//             />
//           </p>
//         </Motion.div>
//       </Link>
//     );
//   }
// );

// LessonCard.displayName = "LessonCard";

// interface CourseClientProps {
//   course: Course;
//   slug: string;
// }

// export default function CourseClient({ course, slug }: CourseClientProps) {
//   const [completedLessons, setCompletedLessons] = useState<string[]>([]);

//   useEffect(() => {
//     if (typeof window === "undefined" || !slug) return;
//     const saved = localStorage.getItem(PROGRESS_KEY(slug));
//     if (saved) setCompletedLessons(JSON.parse(saved));
//   }, [slug]);

//   const lessons: Lessons[] = Array.isArray(course.lessons) ? course.lessons : [];

//   return (
//     <section className="w-full bg-gradient-to-b from-black to-zinc-950 text-white min-h-screen pt-10 pb-24 px-6">
//       <Motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <Link
//           href="/learn"
//           aria-label="Back to Course List"
//           className="inline-flex items-center gap-2 text-lime-400 mb-7 ml-2 hover:text-white active:text-white active:scale-60 text-sm sm:text-base transition-all duration-300"
//         >
//           <FontAwesomeIcon className="" icon={faArrowLeft} size="lg" />
//           <span className="sr-only">Back to Course List</span>
//         </Link>
//       </Motion.div>

//       <div className="max-w-5xl mx-auto px-3 sm:px-8">
//         {/* Featured Image */}
//       <div
//         // initial={{ opacity: 0, y: 20 }}
//         // animate={{ opacity: 1, y: 0 }}
//         // transition={{ duration: 0.5 }}
//         className="relative w-full group mb-6 sm:mb-8 overflow-hidden rounded-2xl select-none"
//       >
//         <Image
//           src={course.image || '/learn-post-image.png'}
//           alt={course.alt || 'Featured image'}
//           width={1200}
//           height={600}
//           rel="preload"
//           className="w-full h-[252px] sm:h-[72vh] lg:h-[74vh] object-cover rounded-2xl brightness-65 hover:brightness-90 active:brightness-90 transition-all duration-500"
//           priority
//           sizes="100vw"
//           tabIndex={0}
//         />
//         <p className="absolute bottom-0 sm:bottom-3 left-0 sm:left-3 right-4 w-fit text-gray-50/50 group-hover:opacity-0 group-active:opacity-0 bg-black/15 backdrop-blur-sm md:backdrop-blur-md rounded-lg px-2 py-1.5 text-xs md:text-sm">
//           {course.language || 'Featured Image'}
//         </p>
//       </div>
      
//         <div className="mb-8 sm:mb-10"
//         >
//           <h1 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent">
//             {course.title}
//           </h1>
//           <p className="text-gray-300 text-base leading-relaxed max-w-4xl">
//             {course.description || "No description available for this course."}
//           </p>
//           <p className="mt-4 flex items-center gap-2 font-extrabold text-base text-gray-300">
//             Prerequisites: {course.prerequisites}
//           </p>

//           <div className="mt-4 flex items-center gap-2 text-sm text-lime-300">
//             <FontAwesomeIcon icon={faCheckCircle} />
//             <span>
//               {completedLessons.length} / {lessons.length} completed
//             </span>
//           </div>
//         </div>

//         <Motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-lime-300">
//             Lessons ({lessons.length})
//           </h2>

//           {lessons.length === 0 ? (
//             <div className="text-center py-12 text-gray-400">
//               <p className="text-lg italic">No lessons available yet.</p>
//               <p className="mt-2 text-sm">Check back soon for updates!</p>
//             </div>
//           ) : (
//             <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
//               {lessons.map((lesson, index) => (
//                 <LessonCard
//                   key={lesson.slug}
//                   lesson={lesson}
//                   courseSlug={slug}
//                   index={index}
//                 />
//               ))}
//             </div>
//           )}
//         </Motion.div>
//       </div>
//     </section>
//   );
// }