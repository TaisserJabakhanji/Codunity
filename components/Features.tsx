'use client'

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import featuresEn from '../locales/en/features.json';
import featuresAr from '../locales/ar/features.json';

export default function Features() {
  const { lang } = useLanguage();
  const data = lang === 'ar' ? featuresAr : featuresEn;

  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Text Content */}
        <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fadeInUp">
            {data.featuresTitle}
          </h2>

          <ul className="flex flex-col gap-6">
            {data.items.map((f, i) => (
              <li
                key={i}
                className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-2xl hover:bg-[var(--muted)] transition-all duration-300 cursor-pointer shadow-sm transform hover:-translate-y-1
                  animate-fadeInUp`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="text-3xl">{f.icon}</span>
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="text-[var(--muted-foreground)]">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0 animate-fadeInUp delay-300">
          <Image
            src={data.illustration}
            alt="Features Illustration"
            className="w-full max-w-md rounded-xl shadow-lg"
            width={1000}
            height={500}
          />
        </div>

      </div>
    </section>
  );
}
