"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Lessons } from "@/types/post";
import ConfettiCelebration from "../components/ConfettiCelebration";

type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  language?: string;
  image?: string;
  alt?: string;
  lessons?: Lessons[];
};

const PROGRESS_KEY = (slug: string) => `course_progress_${slug}`;
const CONFETTI_SHOWN = (slug: string) => `confetti_shown_${slug}`;

interface CourseListClientProps {
  courses: Course[];
}

export default function CourseListClient({ courses }: CourseListClientProps) {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [confettiCourse, setConfettiCourse] = useState<string | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const map: Record<string, number> = {};
    let celebrateSlug: string | null = null;

    courses.forEach((course) => {
      const saved = localStorage.getItem(PROGRESS_KEY(course.slug));
      const total = course.lessons?.length || 1;

      if (saved) {
        const completed = JSON.parse(saved).length;
        const percent = Math.round((completed / total) * 100);
        map[course.slug] = percent;

        if (percent === 100 && !localStorage.getItem(CONFETTI_SHOWN(course.slug))) {
          celebrateSlug = course.slug;
        }
      } else {
        map[course.slug] = 0;
      }
    });

    setProgressMap(map);

    if (celebrateSlug && !hasMounted.current) {
      localStorage.setItem(CONFETTI_SHOWN(celebrateSlug), "true");
      setConfettiCourse(celebrateSlug);
    }

    hasMounted.current = true;
  }, [courses]);

  return (
    <section>
      <ConfettiCelebration trigger={!!confettiCourse} onDone={() => setConfettiCourse(null)} />

      {courses.map((course) => {
        const progress = progressMap[course.slug] ?? 0;
        const isComplete = progress === 100;

        return (
          <div
            key={course.id}
            className="flex flex-row px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow bg-zinc-900/50 border-2 border-zinc-900 group hover:-translate-y-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] active:-translate-y-[5px] active:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition transform duration-300 gap-4 sm:gap-5 mb-3"
          >
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-xs font-semibold tracking-tighter text-pink-400 uppercase my-1">
                {course.language ?? "Programming Language"}
              </p>

              <Link href={`/learn/${course.slug}`} aria-label={`Link for ${course.title}`}>
                <h2 className="text-base sm:text-lg justify-between font-semibold text-gray-100 group-hover:text-lime-400 group-active:text-lime-400 transition leading-tighter flex items-center gap-1">
                  <span className="line-clamp-2 sm:line-clamp-none tracking-tight">{course.title}</span>
                  {isComplete && <FontAwesomeIcon icon={faCheckCircle} className="text-lime-400" />}
                </h2>

                <p className="text-sm text-gray-300 line-clamp-3 sm:line-clamp-4 my-1.5 leading-relaxed">
                  {course.description || "No description available yet."}
                </p>

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
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-base mt-2.5">
                  <span className="text-lime-400 font-semibold group-hover:text-white flex items-center gap-2">
                    {progress > 0 ? "Continue" : "Start Now"}
                    <FontAwesomeIcon
                      className="group-hover:translate-x-1 items-center group-active:translate-x-1 transition-transform"
                      icon={faLongArrowRight}
                      size="sm"
                    />
                  </span>
                  {isComplete && <span className="text-xs text-lime-300 font-medium">Completed!</span>}
                </div>
              </Link>
            </div>

            <div className="flex-shrink-0 items-center justify-center my-auto">
              <div className="relative w-[90px] h-[110px] sm:h-[130px] sm:w-[110px] lg:w-[120px] lg:h-[140px] mx-auto aspect-[5/6] sm:aspect-square overflow-hidden">
                <Image
                  fill
                  className="rounded-lg object-cover object-center group-hover:brightness-110 transition duration-300"
                  src={course?.image ?? "/Course-Image.png"}
                  alt={course?.alt ?? "Course image"}
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