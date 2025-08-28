'use client'

import { useState, useEffect } from "react";
import { useLanguage } from '@/context/LanguageContext';
import ar from "@/locales/instructors/ar.json";
import en from "@/locales/instructors/en.json";
import InstructorCard from "@/components/InstructorCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CiFilter } from "react-icons/ci";


export default function InstructorsPage() {
    const { lang } = useLanguage();
    const data = lang === 'ar' ? ar : en;

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(8);

    // responsive perPage
    useEffect(() => {
        const updatePerPage = () => {
        if (window.innerWidth <= 768) setPerPage(5);
        else setPerPage(8);
        };
        updatePerPage();
        window.addEventListener('resize', updatePerPage);
        return () => window.removeEventListener('resize', updatePerPage);
    }, []);

    const specialties = ['All', ...Array.from(new Set(data.instructors.map(inst => inst.specialty)))];

    const filteredInstructors = data.instructors.filter(inst => 
        (inst.name.toLowerCase().includes(search.toLowerCase()) || inst.title.toLowerCase().includes(search.toLowerCase()))
        && (filter === 'All' || inst.specialty === filter)
    );

    const totalPages = Math.ceil(filteredInstructors.length / perPage);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const instructorsPage = filteredInstructors.slice(start, end);

    return (
        <>
        <Navbar/>
        <section className="py-12 px-6 bg-[var(--background)] text-[var(--foreground)]">
            <h1 className="text-3xl font-bold mb-2">{data.pageTitle}</h1>
            {/* Search + Filter */}
            <div className="relative flex-1 my-8 w-[50%] mx-auto max-md:w-[65%] max-sm:w-[75%]">
                <input
                    type="text"
                    placeholder={lang === 'ar' ? "ابحث عن مدرس..." : "Search instructors..."}
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setCurrentPage(1)}}
                    className="w-full px-4 py-2 pr-12  rounded-lg border-1 outline-0 shadow-2xl"
                />
                {/* Filter Icon */}
                <div className={`absolute inset-y-0 flex items-center px-3 cursor-pointer ${lang === 'en' ? 'right-0 mr-4' : 'left-0 ml-4'}`}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CiFilter />
                        </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mt-3 px-4 py-4 flex flex-col gap-4 shadow-2xl">
                        {specialties.map((spec, i) => (
                        <DropdownMenuItem key={i} onClick={() => {setFilter(spec); setCurrentPage(1)}} className="px-4 py-1 rounded-md hover:scale-105 hover:bg-gray-500">
                            {spec}
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>


            {/* Instructors Grid */}
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
            {instructorsPage.map((inst, i) => (
                <InstructorCard key={i} instructor={inst} lang={lang} />
            ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded disabled:opacity-50"
            >
                {lang === 'ar' ? 'السابق' : 'Previous'}
            </button>
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded disabled:opacity-50"
            >
                {lang === 'ar' ? 'التالي' : 'Next'}
            </button>
            </div>
        </section>
        <Footer/>
        </>
    );
}
