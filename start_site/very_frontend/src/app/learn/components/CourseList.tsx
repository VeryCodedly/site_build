// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { useGetCoursesQuery } from '@/features/api/apiSlice'; // adjust if needed
// import { Course } from '@/types/post';

// export default function CourseList() {
//   // const { data: courses } = useGetCoursesQuery();
//   const { data: courses, isLoading, isError } = useGetCoursesQuery();

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-[60vh] text-gray-300">
//         Loading lessons...
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="flex justify-center items-center min-h-[60vh] text-red-400">
//         Something went wrong while loading lessons.
//       </div>
//     );

//   return (
//     <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
//       {courses?.results?.map((course: Course) => (
//         <div
//           key={course.id}
//           className="flex flex-row p-4 rounded-xl shadow bg-zinc-900 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
//                      active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-4"
//         >
//           {/* Left Section: Text */}
//           <div className="flex-1 flex flex-col justify-between">
//             {/* Language */}
//             <p className="text-xs font-semibold tracking-widest text-pink-400 uppercase mb-2">
//               {course.language ?? 'Programming Language'}
//             </p>

//             <Link href={`/learn/${course.slug}`}>
//               {/* Title */}
//               <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition">
//                 {course.title}
//               </h2>

//               {/* Description */}
//               <p className="text-sm sm:text-md text-gray-300/80 line-clamp-4 mb-3">
//                 {course.description || 'No description available yet.'}
//               </p>

//               {/* CTA */}
//               <div className="flex items-center justify-between text-md text-gray-500">
//                 {/* <span></span> */}
//                 <span className="text-sm sm:text-md font-bold text-lime-400 group-hover:text-white flex items-center gap-2">
//                   Start Now <FontAwesomeIcon className="py-2" icon={faArrowRight} size="sm" />
//                 </span>
//               </div>
//             </Link>
//           </div>

//           {/* Right Section: Image */}
//           <div className="flex-shrink-0">
//             <Image
//               className="rounded-lg object-cover aspect-square w-[80px] h-[80px] sm:w-[140px] sm:h-[160px] group-hover:brightness-110 transition duration-300"
//               src={course?.image ?? '/Course-Image.png'}
//               alt={course?.alt ?? 'Language Image'}
//               width={300}
//               height={300}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useGetCoursesQuery } from '@/features/api/apiSlice';
import { Course } from '@/types/post';

export default function CourseList() {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  if (isLoading)
    return (
      <section className="flex justify-center items-center min-h-screen bg-black text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
          Loading course details...
        </div>
      </section>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-400">
        Something went wrong while loading lessons.
      </div>
    );

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
      {courses?.results?.map((course: Course) => (
        <div
          key={course.id}
          className="flex flex-col sm:flex-row px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow bg-zinc-900 border-2 border-zinc-800 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                     active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-3 sm:gap-4"
        >
          {/* Image - Top on mobile */}
          <div className="flex-shrink-0 w-full sm:w-auto order-1 sm:order-2 mb-3 sm:mb-0">
            <div className="relative w-fll h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] mx-auto sm:mx-0 aspect-[5/6] sm:aspect-square">
              <Image
                fill
                className="rounded-lg object-cover group-hover:brightness-110 transition duration-300"
                src={course?.image ?? '/Course-Image.png'}
                alt={course?.alt ?? 'Language Image'}
                sizes="(max-width: 640px) 120px, 140px"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex-1 flex flex-col justify-between order-2 sm:order-1">
            {/* Language - Always on top */}
            <p className="text-xs font-semibold tracking-widest text-pink-400 uppercase mb-2">
              {course.language ?? 'Programming Language'}
            </p>

            <Link href={`/learn/${course.slug}`}>
              {/* Title */}
              <h2 className="text-base sm:text-xl font-semibold mb-2 text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition leading-tight">
                {course.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-300/80 line-clamp-3 sm:line-clamp-4 mb-3 leading-relaxed">
                {course.description || 'No description available yet.'}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between text-sm sm:text-md text-gray-500">
                <span className="text-lime-400 font-bold group-hover:text-white flex items-center gap-2">
                  Start Now <FontAwesomeIcon className="py-2" icon={faArrowRight} size="sm" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}