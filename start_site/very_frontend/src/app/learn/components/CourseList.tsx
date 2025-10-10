'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useGetCoursesQuery } from '@/features/api/apiSlice'; // adjust if needed
import { Course } from '@/types/post';

export default function CourseList() {
  // const { data: courses } = useGetCoursesQuery();
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-300">
        Loading lessons...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-400">
        Something went wrong while loading lessons.
      </div>
    );

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {courses?.results?.map((course: Course) => (
        <div
          key={course.id}
          className="flex flex-row p-4 rounded-xl shadow bg-zinc-900 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                     active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-4"
        >
          {/* Left Section: Text */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Language */}
            <p className="text-xs font-semibold tracking-widest text-pink-400 uppercase mb-2">
              {course.language ?? 'Programming Language'}
            </p>

            <Link href={`/learn/${course.slug}`}>
              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition">
                {course.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 line-clamp-4 mb-3">
                {course.description || 'No description available yet.'}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between text-md text-gray-500">
                {/* <span></span> */}
                <span className="text-lime-400 inline-flex items-center gap-3">
                  Start Learning <FontAwesomeIcon className="r-2" icon={faArrowRight} size="sm" />
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section: Image */}
          <div className="flex-shrink-0">
            <Image
              className="rounded-lg object-cover aspect-square w-[140px] h-[160px] group-hover:brightness-110 transition duration-300"
              src={course?.image ?? '/Course-Image.png'}
              alt={course?.alt ?? 'Language Image'}
              width={300}
              height={300}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
