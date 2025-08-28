'use client'

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/about/ar.json";
import en from "@/locales/about/en.json";
import { motion } from "framer-motion";
import { MdSchool, MdCode, MdRocketLaunch } from "react-icons/md";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutUs() {
  const { lang } = useLanguage();
  const data = lang === "ar" ? ar : en;

  // eslint-disable-next-line react/jsx-key
  const icons = [<MdSchool />, <MdCode />, <MdRocketLaunch />];

  return (
    <>
    <Navbar/>
    <section className={`py-20 px-6 bg-[var(--background)] text-[var(--foreground)] ${lang === "ar" ? "text-right" : "text-left"}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.title}</h2>
          <p className="text-[var(--muted-foreground)] mb-8">{data.description}</p>

          <ul className="flex flex-col gap-4 mb-6">
            {data.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: lang === "ar" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                className="flex items-center gap-3 bg-[var(--muted)] dark:bg-[var(--muted-dark)] p-3 rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-300"
              >
                <motion.span
                  className="text-2xl"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6}}
                >
                  {icons[i % icons.length]}
                </motion.span>
                <span>{h.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Interactive SVG Illustration */}
        <div className="flex-1 flex justify-center mt-12 md:mt-0">
          <motion.svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, repeat: Infinity}}
            whileHover={{ rotate: 15, scale: 1.05 }}
          >
            <circle cx="150" cy="150" r="120" stroke="#4F46E5" strokeWidth="8" fill="transparent" />
            <circle cx="150" cy="150" r="80" stroke="#6366F1" strokeWidth="8" fill="transparent" />
            <circle cx="150" cy="150" r="50" stroke="#818CF8" strokeWidth="6" fill="transparent" />
          </motion.svg>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}
