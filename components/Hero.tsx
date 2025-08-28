'use client'

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import heroEn from '../locales/en/hero.json';
import heroAr from '../locales/ar/hero.json';
import Link from 'next/link';



    export default function Hero() {
    const { lang } = useLanguage();
    const data = lang === 'ar' ? heroAr : heroEn;

    return (
        <section
        className={`py-20 px-6 bg-[var(--background)] text-[var(--foreground)] ${
            lang === 'ar' ? 'text-right' : 'text-left'
        }`}
        >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            
            {/* Text Content */}
            <div
            className={`flex-1 order-2 md:order-1 ${
                lang === 'ar' ? 'text-right' : 'text-left'
            }`}
            >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">{data.headline}</h1>
            <p className="text-lg md:text-xl mb-8 animate-fadeInUp delay-100">{data.subheadline}</p>

            <div className="flex flex-col md:flex-row justify-start gap-4 mb-8 animate-fadeInUp delay-200">
                <Link href="/dashboard">
                    <button className="cursor-pointer font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300">
                        {data.cta.startNow}
                    </button>
                </Link>
                <Link href="/courses">
                    <button className="cursor-pointer font-semibold bg-[var(--secondary)] text-[var(--secondary-foreground)] px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300">
                        {data.cta.browseCourses}
                    </button>
                </Link>
            </div>

            <ul className="flex flex-col gap-4 text-lg font-medium">
                {data.quickFeatures.map((feat, i) => (
                <li
                    key={i}
                    className="p-3 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-all duration-300 cursor-pointer shadow-sm transform hover:-translate-y-1"
                >
                    {feat}
                </li>
                ))}
            </ul>
            </div>

            {/* Illustration */}
            <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end mb-8 md:mb-0 animate-fadeInUp delay-300">
            <Image
                src={data.illustration}
                alt="Hero Illustration"
                className="w-full max-w-xl rounded-lg shadow-lg"
                width={1000}
                height={500}
            />
            </div>

        </div>
        </section>
    );
    }
