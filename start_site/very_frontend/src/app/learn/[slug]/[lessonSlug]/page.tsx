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
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";

// export default function LessonPage() {
//   const { slug, lessonSlug } = useParams(); // course slug + lesson slug
//   const { data: lesson, isLoading, isError } = useGetLessonQuery({
//           courseSlug: slug as string,
//           lessonSlug: lessonSlug as string,
//         });

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
//         <Link href={`/learn/${slug}`} className="mt-6 text-lime-400 hover:underline">
//           <FontAwesomeIcon icon={faArrowLeft} /> Back to course
//         </Link>
//       </section>
//     );
//   }

//   return (
//     <section className="relative w-full min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
       

//         {/* New JSON-based content renderer */}
//         {lesson.content_JSON && (
//           <Motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             <LessonContent content={lesson.content_JSON} />
//           </Motion.div>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetLessonQuery } from "@/features/api/apiSlice";
import { motion as Motion } from "framer-motion";
import LessonContent from "../../components/LessonContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function LessonPage() {
  const { slug, lessonSlug } = useParams();

  const { data: lesson, isLoading, isError } = useGetLessonQuery({
    courseSlug: slug as string,
    lessonSlug: lessonSlug as string,
  });

  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-screen bg-black text-gray-400">
        Loading lesson...
      </section>
    );
  }

  if (isError || !lesson) {
    return (
      <section className="flex flex-col justify-center items-center h-screen bg-black text-gray-400">
        <p>Oops! Couldn’t load this lesson.</p>
        <Link href={`/learn/${slug}`} className="mt-6 text-lime-400 hover:underline">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to course
        </Link>
      </section>
    );
  }

  // 🔍 Debugging output
  // console.group("Lesson Debug Info");
  // console.log("Lesson data:", lesson);
  // console.log("Lesson content_JSON type:", typeof lesson.content_JSON);
  // console.log("Lesson content_JSON value:", lesson.content_JSON);
  // console.groupEnd();

console.log("🧾 Full lesson object:", JSON.stringify(lesson, null, 2));
console.log("🔑 Keys in lesson:", lesson ? Object.keys(lesson) : "no lesson");
console.log("📦 lesson.content_JSON:", lesson?.content_JSON);

  return (
    <section className="relative w-full min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-lime-300">
          {lesson.title}
        </h1>

        {/* 🧠 Add a visible block showing JSON status */}
        <div className="mb-6 p-4 border border-white/10 rounded-lg bg-zinc-900/40 text-gray-400 text-sm">
          <p><strong>Debug Info</strong></p>
          <p>Type: <span className="text-lime-400">{typeof lesson.content_JSON}</span></p>
          <p>
            Value:{" "}
            <code className="text-pink-400 break-all">
              {lesson.content_JSON ? JSON.stringify(lesson.content_JSON).slice(0, 300) : "null or empty"}
            </code>
          </p>
        </div>

        {lesson.content_JSON ? (
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <LessonContent content={lesson.content_JSON} />
          </Motion.div>
        ) : (
          <p className="text-red-400">
            ⚠️ No content_JSON found in lesson object.
          </p>
        )}
      </div>
    </section>
  );
}
