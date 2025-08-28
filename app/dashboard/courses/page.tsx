"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar/courses.json";
import en from "@/locales/en/courses.json";
import arData from "@/locales/ar/coursesData.json";
import enData from "@/locales/en/coursesData.json";
import Image from "next/image";

export default function MyCoursesPage() {
  const router = useRouter();
  const { lang } = useLanguage();

  const t = lang === "ar" ? ar : en;
  const courses = lang === "ar" ? arData : enData;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t.myCourses}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col"
          >
            <Image
              src={course.image}
              alt={course.title}
              className="rounded-xl h-40 w-full object-cover"
              width={500}
              height={500}
            />
            <h2 className="text-lg font-semibold mt-3">{course.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {course.description}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-right">
              {course.progress}% {t.completed}
            </p>

            <button
              onClick={() => router.push(`/dashboard/courses/${course.id}`)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              {t.continue}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
