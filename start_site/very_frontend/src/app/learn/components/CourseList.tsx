import CourseListClient from "./CourseListClient";
import { cache } from "react";
import { Lessons } from "@/types/post";


type CourseResponse = {
  results: Array<{
    id: number;
    slug: string;
    title: string;
    description: string;
    language: string;
    image: string;
    alt: string;
    lessons?: Lessons[];
  }>;
};

const getCachedCourses = cache(async (): Promise<CourseResponse | null> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not set");
      return null;
    }

    const url = `${apiUrl}/courses/`;
    // console.log(`Fetching courses from: ${url}`);

    const res = await fetch(url, {
      next: { revalidate: 60 },
      cache: "force-cache",
      headers: { "Content-Type": "application/json" },
    });

    // if (!res.ok) {
    //   console.error(`Backend returned ${res.status} for ${url}`);
    //   return null;
    // }

    const data = await res.json();
    return data as CourseResponse;
  } catch (error) {
    console.error("Courses fetch error:", error);
    return null;
  }
});

export default async function CourseList() {
  const coursesData = await getCachedCourses();

  if (!coursesData || !coursesData.results || coursesData.results.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400 px-4">
        <p className="text-xl">No courses available yet.</p>
        <p className="mt-4">Check back soon!</p>
      </section>
    );
  }

  return <CourseListClient courses={coursesData.results} />;
}

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
