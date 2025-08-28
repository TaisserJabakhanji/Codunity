'use client'

import Image from "next/image";
import { Course } from "../types";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


interface Props {
  course: Course;
  lang: 'ar' | 'en';
}

export default function CourseCard({ course, lang }: Props) {
  const learnMoreText = lang === 'ar' ? 'تعلم المزيد' : 'Learn More';
  

  return (
    <div className="shadow-2xl rounded-lg px-4 py-6 transition flex flex-col justify-between h-full">
      
      {/* محتوى الكارد */}
      <div className="flex flex-col gap-2">
        {course.image && (
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={200}
            className="rounded-md"
          />
        )}
        {course.title && <h2 className="text-xl font-semibold mt-2">{course.title}</h2>}
        {course.description && (
          <p className="text-[var(--muted-foreground)]">{course.description}</p>
        )}
      </div>

      {/* زر Learn More + level ثابتين بأسفل الكارد */}
      <div className="mt-4 flex flex-col gap-2">
        <button className="cursor-pointer flex flex-row items-center gap-2 w-[70%] py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md shadow-2xl hover:scale-105 transition justify-center">
          {learnMoreText}
          <MdKeyboardDoubleArrowRight
            size={20}
            className={`transition-transform duration-500 ${
            lang === 'ar' ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <span className="mt-2 max-w-[45%] inline-block text-sm bg-[var(--accent)] text-[var(--accent-foreground)] px-2 py-1 rounded text-center">
          {course.level}
        </span>
      </div>
    </div>
  );
}
