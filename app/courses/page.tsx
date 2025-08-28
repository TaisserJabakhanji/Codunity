'use client'

import CourseCard from "@/components/CourseCard";
import { Course } from "@/types";
import ar from "@/locales/courses/ar.json";
import en from "@/locales/courses/en.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from '@/context/LanguageContext';
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiFilter } from "react-icons/ci";


export default function CoursesPage() {
  const { lang } = useLanguage();
  const data = lang === 'ar' ? ar : en;
  const courses: Course[] = data.courses;

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // تحديد عدد الكورسات حسب الشاشة
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 8;

  // Filter + Search
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter ? course.level === levelFilter : true;
      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, levelFilter, courses]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  return (
    <>
      <Navbar/>
      <section className="py-12 px-6 bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex flex-col flex-1 md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">{data.pageTitle}</h1>

          {/* Search + Filter */}
          <div className="relative w-[40%] max-md:w-[60%] max-sm:w-[80%]">
            <input
              type="text"
              placeholder={lang === 'ar' ? 'ابحث عن كورس...' : 'Search courses...'}
              className="border rounded-lg w-full px-4 py-2 pr-10 focus:outline-none"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />

            <div className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer ${lang === 'en' ? 'right-2':'left-2'}`}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                    <CiFilter size={20} className="text-[var(--foreground)] cursor-pointer"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { setLevelFilter(''); setCurrentPage(1); }}>
                    {lang === 'ar' ? 'الكل' : 'All Levels'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setLevelFilter('Beginner'); setCurrentPage(1); }}>
                    {lang === 'ar' ? 'مبتدئ' : 'Beginner'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setLevelFilter('Intermediate'); setCurrentPage(1); }}>
                    {lang === 'ar' ? 'متوسط' : 'Intermediate'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setLevelFilter('Advanced'); setCurrentPage(1); }}>
                    {lang === 'ar' ? 'متقدم' : 'Advanced'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
          {paginatedCourses.map((course, i) => (
            <CourseCard lang={lang} key={i} course={course} />
          ))}
        </div>

        {/* Pagination Next / Previous */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className={`px-4 py-2 rounded bg-[var(--primary)] text-[var(--primary-foreground)] ${currentPage===1 && 'opacity-50 cursor-not-allowed'}`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage-1)}
          >
            {lang==='ar' ? 'السابق' : 'Previous'}
          </button>
          <button
            className={`px-4 py-2 rounded bg-[var(--primary)] text-[var(--primary-foreground)] ${currentPage===totalPages && 'opacity-50 cursor-not-allowed'}`}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage+1)}
          >
            {lang==='ar' ? 'التالي' : 'Next'}
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}
