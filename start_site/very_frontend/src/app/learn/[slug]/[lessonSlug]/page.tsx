// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import { useGetLessonQuery } from "@/features/api/apiSlice";
// import Link from "next/link";
// import { motion as Motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

// export default function LessonPage() {
//   const { slug, lessonSlug } = useParams();
//   const { data: lesson, isLoading, isError } = useGetLessonQuery({
//     courseSlug: slug as string,
//     lessonSlug: lessonSlug as string,
//   });

//   if (isLoading) {
//     return (
//       <section className="flex justify-center items-center h-screen bg-black text-gray-400">
//         Loading lesson...
//       </section>
//     );
//   }

//   if (isError || !lesson) {
//     return (
//       <section className="flex flex-col justify-center items-center h-screen bg-black text-gray-400">
//         <p>Oops! Couldn’t load this lesson.</p>
//         <Link
//           href={`/learn/${slug}`}
//           className="mt-6 text-lime-400 hover:underline hover:font-semibold"
//         >
//           ← Back to Course
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full bg-black text-white min-h-screen py-16 px-6 sm:px-10">
//       <div className="max-w-4xl mx-auto space-y-10">
//         {/* Back button */}
//         <Link
//           href={`/learn/${slug}`}
//           className="inline-flex items-center text-lime-400 mb-6 hover:underline hover:font-semibold"
//         >
//           <FontAwesomeIcon className="mr-2" icon={faArrowLeft} size="sm" /> Back to Course
//         </Link>

//         {/* Lesson title */}
//         <header>
//           <h1 className="text-4xl font-bold mb-4 text-lime-300">
//             {lesson.title}
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Level:{" "}
//             <span className="text-lime-400 font-medium">
//               {lesson.level || "Beginner"}
//             </span>{" "}
//             · Duration:{" "}
//             <span className="text-lime-400 font-medium">
//               {lesson.duration || "—"}
//             </span>
//           </p>
//         </header>

//         {/* Video player */}
//         {lesson.video_url && (
//           <Motion.div
//             className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_25px_rgba(164,255,130,0.08)]"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="aspect-video w-full">
//               <iframe
//                 src={lesson.video_url}
//                 title={lesson.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full rounded-2xl"
//               ></iframe>
//             </div>
//           </Motion.div>
//         )}

//         {/* Lesson content */}
//         <Motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="prose prose-invert max-w-none leading-relaxed text-gray-400 text-md"
//         >
//           {lesson.content_plain_text ? (
//             <pre className="whitespace-pre-wrap text-gray-300">
//               {lesson.content_plain_text}
//             </pre>
//           ) : (
//             <p>No content available for this lesson yet.</p>
//           )}
//         </Motion.div>

//         {/* Footer */}
//         <div className="pt-10 border-t border-white/10 text-sm text-gray-400">
//           <p>
//             Last updated:{" "}
//             <span className="text-gray-300">
//               {new Date(lesson.updated_at).toLocaleDateString()}
//             </span>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import { useGetLessonQuery } from "@/features/api/apiSlice";
// import { motion as Motion } from "framer-motion";
// import LessonContent from "../../components/LessonContent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLongArrowLeft, faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";

// export default function LessonPage() {
//   const { slug, lessonSlug } = useParams();

//   const { data: lesson, isLoading, isError } = useGetLessonQuery({
//     courseSlug: slug as string,
//     lessonSlug: lessonSlug as string,
//   });

//   if (isLoading) {
//     return (
//       <section className="flex justify-center items-center min-h-screen bg-black text-gray-400">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
//           Loading lesson...
//         </div>
//       </section>
//     );
//   }

//   if (isError || !lesson) {
//     return (
//       <section className="flex flex-col justify-center items-center h-screen bg-black text-gray-400">
//         <p>Oops! Couldn’t load this lesson.</p>
//         <Link href={`/learn/${slug}`} className="mt-6 text-lime-400 hover:underline">
//           <FontAwesomeIcon icon={faLongArrowLeft} /> Back to course
//         </Link>
//       </section>
//     );
//   }

// // console.log("🧾 Full lesson object:", JSON.stringify(lesson, null, 2));
// // console.log("🔑 Keys in lesson:", lesson ? Object.keys(lesson) : "no lesson");
// // console.log("📦 lesson.content_JSON:", lesson?.content_JSON);

//   return (
//     <section className="relative w-full min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
//       <Link href={`/learn/${slug}`} className="text-lime-400 hover:text-white active:text-white">
//           <FontAwesomeIcon className="mb-6" icon={faLongArrowLeft} size="lg" />
//           {/* <span className="">Back to course</span> */}
//       </Link>
//       <div className="max-w-5xl mx-auto">
//         {/* <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-lime-300">
//           {lesson.title}
//         </h1> */}

//         {lesson.content_JSON ? (
//           <Motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             <LessonContent content={lesson.content_JSON} />
//           </Motion.div>
//         ) : (
//           <p className="text-red-400">
//             ⚠️ No content_JSON found in lesson object.
//           </p>
//         )}
//       </div>

//       {/* --- NEXT / PREVIOUS LESSON NAVIGATION --- */}
//         <div className="flex justify-center gap-6 mt-12">
//           {lesson.previous_lesson ? (
//             <Link
//               href={`/learn/${slug}/${lesson.previous_lesson.slug}`}
//               className="gap-2 bg-lime-400 text-black px-2.5 py-0.5 rounded-full cursor-pointer border-3 border-gray-500/100 hover:bg-white active:bg-white hover:text-black
//         active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
//             >
//             <FontAwesomeIcon icon={faLongArrowLeft} size="lg" />
//             </Link>
//           ) : <div />}

//           {lesson.next_lesson && (
//             <Link
//               href={`/learn/${slug}/${lesson.next_lesson.slug}`}
//               className="gap-2 bg-lime-400 text-black px-2.5 py-0.5 rounded-full cursor-pointer border-3 border-gray-500/100 hover:bg-white active:bg-white hover:text-black
//         active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
//             >
//             <FontAwesomeIcon icon={faLongArrowRight} size="lg" />
//             </Link>
//           )}
//         </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useGetLessonQuery } from "@/features/api/apiSlice";
import { motion as Motion } from "framer-motion";
import { Lessons } from "@/types/post";
import LessonContent from "../../components/LessonContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft, faLongArrowRight, faChevronRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


interface Block {
  type: string;
  content: string;
}

const PROGRESS_KEY = (slug: string) => `course_progress_${slug}`;

export default function LessonPage() {
  const { slug, lessonSlug } = useParams() as { slug: string; lessonSlug: string };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: lesson, isLoading, isError } = useGetLessonQuery({
    courseSlug: slug,
    lessonSlug: lessonSlug,
  });

  const [completed, setCompleted] = useState<string[]>([]);
  const isCompleted = completed.includes(lessonSlug);

  // Load progress
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(PROGRESS_KEY(slug));
    if (saved) setCompleted(JSON.parse(saved));
  }, [slug]);

  // Save progress
  const markComplete = () => {
    if (isCompleted) return;
    const updated = [...completed, lessonSlug];
    setCompleted(updated);
    localStorage.setItem(PROGRESS_KEY(slug), JSON.stringify(updated));
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = menuRef.current;
      const button = buttonRef.current;
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-black text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
        </div>
      </section>
    );
  }

  if (isError || !lesson) {
    return (
      <section className="flex flex-col justify-center items-center h-screen bg-black text-gray-400">
        <p>Oops! Couldn’t load this lesson.</p>
        <Link href={`/learn/${slug}`} className="mt-6 text-lime-400 hover:underline">
          <FontAwesomeIcon icon={faLongArrowLeft} /> Back to course
        </Link>
      </section>
    );
  }

  // const handleHeadingClick = (index: number) => {
  //   const element = document.getElementById(`heading-${index}`);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //     setIsMenuOpen(false);
  //   }
  // };

  return (
    <section className="relative w-full min-h-screen bg-black text-white pt-8 sm:pt-12 pb-24 px-6">
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/learn/${slug}`} className="text-lime-400 hover:text-white active:text-white">
          <FontAwesomeIcon className="mb-5 sm:mb-4" icon={faLongArrowLeft} size="lg" />
          <span className="sr-only">Back to Lessons</span>
        </Link>
      </Motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Toggle Menu Button */}
        <button
          ref={buttonRef}
          onMouseEnter={() => setIsMenuOpen(!isMenuOpen)}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed p-2 left-0 top-1/2 -translate-y-1/2 z-[60] w-6 h-7 sm:w-6 sm:h-7 flex items-center justify-center 
                  rounded-r-xl bg-transparent text-white hover:bg-white/8 active:bg-white/8 
                  backdrop-blur-md border-l-0 transition-all duration-300 focus:outline-none 
                  focus:ring-2 focus:ring-offset-1 focus:ring-pink-300/70 shadow-[0_0_5px_3px_rgba(55,55,55,0.8)] 
                  hover:shadow-[0_0_7px_3px_rgba(255,255,255,0.10)] active:shadow-[0_0_7px_3px_rgba(255,255,255,0.10)]"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faChevronRight} size="sm" className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`} />
        </button>

        {/* Floating Menu */}
        <div
          ref={menuRef}
          className={`fixed pl-4 sm:pl-5 top-1/2 left-0 transform -translate-y-1/2 bg-black/20 hover:backdrop-blur-lg 
            shadow-lg rounded-r-3xl overflow-hidden border border-white/20 transition-all duration-300 
            ${isMenuOpen ? "w-60 sm:w-70 opacity-100 backdrop-blur-lg" : "opacity-0 w-8 h-10"} z-50`}
        >
          <ul className="flex flex-col gap-1 p-2 text-gray-200">
            <h2 className="text-md text-white font-semibold pt-3">Page</h2>
            {Array.isArray((lesson as Lessons)?.content_JSON?.blocks)
              ? ((lesson as Lessons).content_JSON.blocks as Block[])
                .filter((block) => block.type === "heading")
                .map((block, index) => (
                  <li key={index} className="relative group">
                    <span
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/8 transition-all duration-200"
                    >
                      <span className="text-sm"> {/* href={`#heading-${index}`} onClick={() => handleHeadingClick(index)} */}
                        - {block.content}
                      </span>
                    </span>
                  </li>
                ))
              : null}
          </ul>
        </div>

        {/* Main Content with Heading IDs */}
        <div className="ml-0"> {/* lg:ml-64 */}
          {lesson.content_JSON ? (
            <LessonContent content={lesson.content_JSON} />
          ) : (
            <p className="text-red-400">
              ⚠️ No content_JSON found in lesson object.
            </p>
          )}

          {/* Mark Complete Button */}
          <div className="flex justify-center mt-16">
            <button
              aria-label="Mark complete button"
              onClick={markComplete}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-base transition-all duration-200
                ${isCompleted
                  ? 'bg-lime-900/50 text-lime-300 cursor-default'
                  : 'bg-lime-400 text-black hover:bg-white active:bg-white shadow-lg active:scale-90'
                }`}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>

          {/* Next / Previous Lesson Navigation */}
          <div className={`flex mt-16 mx-auto max-w-xs px-4 sm:px-0
            ${lesson.previous_lesson && lesson.next_lesson ? 'justify-between' : 'justify-center'}
            `}>
            {lesson.previous_lesson ? (
              <Link
                href={`/learn/${slug}/${lesson.previous_lesson.slug}`}
                className="gap-2 bg-lime-400 text-black px-2.5 py-0.5 rounded-full cursor-pointer border-3 border-gray-500/100 hover:bg-white active:bg-white hover:text-black active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
                aria-label="Toggle pages previous"
              >
                <FontAwesomeIcon icon={faLongArrowLeft} size="lg" />
              </Link>
            ) : (
              <div />
            )}

            {lesson.next_lesson ? (
              <Link
                href={`/learn/${slug}/${lesson.next_lesson.slug}`}
                className="gap-2 bg-lime-400 text-black px-2.5 py-0.5 rounded-full cursor-pointer border-3 border-zinc-500/100 hover:bg-white active:bg-white hover:text-black active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
                aria-label="Toggle pages next"
              >
                <FontAwesomeIcon icon={faLongArrowRight} size="lg" />
              </Link>
            ) : (
              <div />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}