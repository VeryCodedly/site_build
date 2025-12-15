"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion as Motion } from "framer-motion";
import { Lessons } from "@/types/post";
import LessonContent from "../../components/LessonContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLongArrowLeft, faLongArrowRight, faChevronRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Block {
  type: string;
  content: string;
}

interface LessonClientProps {
  lesson: Lessons;
  courseSlug: string;
}

const PROGRESS_KEY = (slug: string) => `course_progress_${slug}`;

export default function LessonClient({ lesson, courseSlug }: LessonClientProps) {
  const { lessonSlug } = useParams() as { lessonSlug: string };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [completed, setCompleted] = useState<string[]>([]);
  const isCompleted = completed.includes(lessonSlug);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(PROGRESS_KEY(courseSlug));
    if (saved) setCompleted(JSON.parse(saved));
  }, [courseSlug]);

  const markComplete = () => {
    if (isCompleted) return;
    const updated = [...completed, lessonSlug];
    setCompleted(updated);
    localStorage.setItem(PROGRESS_KEY(courseSlug), JSON.stringify(updated));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <section className="relative w-full min-h-screen bg-black text-white pt-8 sm:pt-12 pb-24 px-4">
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href={`/learn/${courseSlug}`}
          aria-label="Back to Lessons"
          className="inline-flex items-center gap-2 text-lime-400 mb-8 ml-8 hover:text-white active:text-white active:scale-60 text-sm sm:text-base transition-all duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="sr-only">Back to Lessons</span>
        </Link>
      </Motion.div>

      <div className="max-w-5xl mx-auto">
        <button
          ref={buttonRef}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed p-2 left-0 top-1/2 -translate-y-1/2 z-[60] w-6 h-7 sm:w-6 sm:h-7 flex items-center justify-center rounded-r-xl bg-transparent text-white hover:bg-white/8 active:bg-white/8 backdrop-blur-md border-l-0 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-pink-300/70 shadow-[0_0_5px_3px_rgba(55,55,55,0.08)] hover:shadow-[0_0_7px_3px_rgba(255,255,255,0.1)] active:shadow-[0_0_7px_3px_rgba(255,255,255,0.1)]"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="sm"
            className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
          />
        </button>

        <div
          ref={menuRef}
          className={`fixed pl-4 sm:pl-5 top-1/2 left-0 transform -translate-y-1/2 bg-black/20 hover:backdrop-blur-lg shadow-lg rounded-r-3xl overflow-hidden border border-white/20 transition-all duration-200 ease-in-out ${
            isMenuOpen
              ? "w-60 sm:w-70 opacity-100 backdrop-blur-lg"
              : "opacity-0 w-8 h-10 pointer-events-none"
          } z-50`}
        >
          <ul className="flex flex-col gap-1 p-2 pb-3 text-gray-200">
            <h2 className="text-md text-white font-semibold pt-3">Page</h2>
            {Array.isArray(lesson?.content_JSON?.blocks)
              ? (lesson.content_JSON.blocks as Block[])
                  .filter((block) => block.type === "heading")
                  .map((block, index) => (
                    <li key={index}>
                      <span className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/8 transition-all duration-200 text-sm">
                        - {block.content}
                      </span>
                    </li>
                  ))
              : null}
          </ul>
        </div>

        <div className="ml-0">
          {lesson.content_JSON ? (
            <LessonContent content={lesson.content_JSON} />
          ) : (
            <p className="text-red-400">⚠️ No content_JSON found in lesson object.</p>
          )}

          <div className="flex justify-center mt-16">
            <button
              onClick={markComplete}
              disabled={isCompleted}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-base transition-all duration-200 ${
                isCompleted
                  ? "bg-lime-900/50 text-lime-300 cursor-default"
                  : "bg-lime-400 text-black hover:bg-white active:bg-white shadow-lg active:scale-90"
              }`}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              {isCompleted ? "Completed" : "Mark as Complete"}
            </button>
          </div>

          <div
            className={`flex mt-16 mx-auto max-w-xs px-4 sm:px-0 ${
              lesson.previous_lesson && lesson.next_lesson ? "justify-between" : "justify-center"
            }`}
          >
            {lesson.previous_lesson && (
              <Link
                href={`/learn/${courseSlug}/${lesson.previous_lesson.slug}`}
                className="gap-2 bg-lime-400 text-black px-2.5 py-0.5 rounded-full cursor-pointer border-3 border-gray-500/100 hover:bg-white active:bg-white shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faLongArrowLeft} size="lg" />
              </Link>
            )}
            {lesson.next_lesson && (
              <Link
                href={`/learn/${courseSlug}/${lesson.next_lesson.slug}`}
                className="gap-2 bg-lime-400 text-black px-2.5 py-0.5 rounded-full cursor-pointer border-3 border-zinc-500/100 hover:bg-white active:bg-white shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faLongArrowRight} size="lg" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}