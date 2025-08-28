'use client'

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import faqEn from '../locales/en/faq.json';
import faqAr from '../locales/ar/faq.json';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { lang } = useLanguage();
  const data = lang === 'ar' ? faqAr : faqEn;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className={`py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          {data.title}
        </h2>

        <div className="flex flex-col gap-4">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="shadow-lg rounded-lg border-0 outline-0 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(i)}
                className={` w-full flex items-center justify-between px-6 py-4 hover:bg-[var(--muted)] transition-colors`}
              >
                <span
                  className={`font-semibold ${
                    lang === 'ar' ? 'text-right w-full' : 'text-left w-full'
                  }`}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-max-height duration-500 ease-in-out ${
                  openIndex === i ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                <p
                  className={`text-[var(--muted-foreground)] ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
