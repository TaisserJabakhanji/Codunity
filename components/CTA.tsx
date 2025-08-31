'use client'

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ctaEn from '../locales/en/cta.json';
import ctaAr from '../locales/ar/cta.json';
import Image from 'next/image';
import Link from 'next/link';

export default function CTA() {
  const { lang } = useLanguage();
  const data = lang === 'ar' ? ctaAr : ctaEn;

  return (
    <section className="text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Text Content */}
        <div className="flex-1 animate-fadeInUp">
          <h2 className="text-4xl font-bold mb-4">{data.headline}</h2>
          <p className="text-lg text-[var(--muted-foreground)] mb-6">{data.subheadline}</p>
          <div className={`flex gap-4 justify-center md:justify-start ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Link href="/courses">
              <button className="cursor-pointer px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-lg hover:scale-105 transition-transform">
                {data.mainButton}
              </button></Link>
            <Link href="/dashboard">
              <button className="cursor-pointer px-6 py-3 border border-[var(--foreground)] font-semibold rounded-lg hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition-colors">
                {data.secondaryButton}
              </button>
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center md:justify-end animate-fadeInUp">
          <Image
            src={data.illustration}
            alt="CTA Illustration"
            className="w-full max-w-md rounded-xl shadow-lg"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
