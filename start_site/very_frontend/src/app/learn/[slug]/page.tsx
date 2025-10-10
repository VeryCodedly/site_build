"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetCourseQuery } from "@/features/api/apiSlice";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { Lessons } from "@/types/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CoursePage() {
  const { slug } = useParams();
  const { data: course, isLoading, isError } = useGetCourseQuery(slug as string);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-screen bg-black text-gray-400">
        Loading course details...
      </section>
    );
  }

  if (isError || !course) {
    return (
      <section className="flex flex-col justify-center items-center h-screen bg-black text-gray-400">
        <p>Oops! Couldn’t load this course.</p>
        <Link
          href="/learn"
          className="mt-6 text-lime-400 hover:underline hover:font-semibold"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to courses
        </Link>
      </section>
    );
  }

  // handle if lessons are paginated
  const lessons = course.lessons ?? course.lessons ?? [];

  return (
    <section className="w-full bg-black text-white min-h-screen py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          href="/learn"
          className="inline-flex items-center text-lime-400 mb-10 hover:underline hover:font-semibold"
        >
          <FontAwesomeIcon className="mr-2" icon={faArrowLeft} size="sm" /> Back to Courses
        </Link>

        {/* Course header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-lime-300">
            {course.title}
          </h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-4xl space-y-4">
            {course.description || "No description available for this course."}
          </p>
        </div>

        {/* Lessons list */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-lime-300">
            Lessons
          </h2>

          {lessons.length === 0 ? (
            <p className="text-gray-400 italic">No lessons yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {lessons.map((lesson: Lessons, index: number) => (
                <Motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 1.03 }}
                  className="bg-zinc-900 backdrop-blur-lg rounded-2xl p-5 transition-all hover:shadow-[0_0_10px_#222222] active:shadow-[0_0_20px_rgba(164,255,130,0.1)]"
                >
                  <h3 className="text-lg font-semibold mb-2 text-lime-300">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {lesson.content_plain_text || "No description yet."}
                  </p>
                  <Link
                    href={`/learn/${slug}/${lesson.slug}`}
                    className="text-lime-400 text-sm font-medium hover:underline"
                  >
                    View Lesson <FontAwesomeIcon icon={faArrowRight} size="sm" />
                  </Link>
                </Motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
