"use client";

import { useLanguage } from "../context/LanguageContext";
import ar from "../locales/ar/footer.json";
import en from "../locales/en/footer.json";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLanguage();
  const data = lang === "ar" ? ar : en;

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`shadow-2xl relative w-full px-6 py-4 mt-10 border-t ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div className=" max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Description */}
        <div>
          <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Codunity
          </h1>
          <p className="text-[var(--foreground)]">{data.description}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-1">{data.quickLinksTitle}</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            {data.quickLinks.map((link, i) => (
              <li key={i} className="text-[var(--foreground)] hover:text-blue-500 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h2 className="text-lg font-semibold mb-3">{data.contactTitle}</h2>
          <ul className="space-y-2 text-[var(--foreground)] mb-4">
            {data.contact.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Social Media */}
          <div className="flex gap-4 text-gray-500">
            <Link href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaXTwitter className="w-5 h-5 hover:text-black dark:hover:text-white" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="w-5 h-5 hover:text-gray-800 dark:hover:text-gray-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t pt-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Codunity. {data.rights}
      </div>

      {/* Scroll To Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-5 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
