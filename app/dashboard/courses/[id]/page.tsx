"use client";

import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar/courses.json";
import en from "@/locales/en/courses.json";
import arData from "@/locales/ar/coursesData.json";
import enData from "@/locales/en/coursesData.json";
import arLessons from "@/locales/ar/lessons.json";
import enLessons from "@/locales/en/lessons.json";
import Image from "next/image";
import Link from "next/link";

export default function CoursePage() {
  const { id } = useParams(); // id الكورس
  const { lang } = useLanguage();

  const t = lang === "ar" ? ar : en;
  const courses = lang === "ar" ? arData : enData;
  const lessons = lang === "ar" ? arLessons : enLessons;

  const course = courses.find((c) => c.id === Number(id));
  const courseLessons = lessons.filter((l) => l.courseId === Number(id));

  if (!course) {
    return (
      <div className="p-6 text-center text-red-500">
        {t.courseNotFound}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* صورة الكورس */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow">
        <Image
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      </div>

      {/* العنوان والوصف */}
      <h1 className="text-2xl font-bold mt-6">{course.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {course.description}
      </p>

      {/* Progress */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1 text-right">
          {course.progress}% {t.completed}
        </p>
      </div>

      {/* الدروس */}
      <h2 className="text-xl font-semibold mt-8 mb-4">{t.lessons}</h2>
      <ul className="space-y-3">
        {courseLessons.map((lesson) => (
          <li
            key={lesson.id}
            className="p-4 bg-[var(--muted)] dark:bg-[var(--muted-dark)] rounded-lg shadow hover:scale-[1.02] transition"
          >
            <h3 className="font-bold text-lg">{lesson.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{lesson.description}</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              {t.startLesson}
            </button>
          </li>
        ))}
      </ul>

      {/* زر رجوع */}
      <div className="mt-8">
        <Link href="/dashboard/courses">
            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg transition">
                {t.back}
            </button>
        </Link>
      </div>
    </div>
  );
}
