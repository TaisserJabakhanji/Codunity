'use client'

import { useState } from 'react';
import { ModeToggle } from "./ModeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { useLanguage } from '@/context/LanguageContext';
import ar from "../locales/ar/navbar.json";
import en from "../locales/en/navbar.json";
import Link from 'next/link';

    export default function MobileNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);


    const { lang, setLang } = useLanguage();
    const data = lang === "ar" ? ar : en;
    const handleLinkClick = () => setMenuOpen(false);

    return (
        
        <nav className="w-full flex flex-col">
        {/* Header */}
        <div className="flex flex-row justify-between items-center py-4 px-4">
            {menuOpen ? (
            <FaWindowClose
                size={20}
                className="text-[var(--foreground)] cursor-pointer"
                onClick={() => setMenuOpen(false)}
            />
            ) : (
            <TiThMenu
                size={20}
                className="text-[var(--foreground)] cursor-pointer"
                onClick={() => setMenuOpen(true)}
            />
            )}

            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Codunity
            </h1>
            <ModeToggle />
        </div>

        {/* Menu */}
        <div
            className={`px-4 py-4 flex-col justify-center items-center w-full overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
            <ul className="flex flex-col gap-4 mb-4 justify-center items-center">
                <Link onClick={handleLinkClick} href="/" className="hover:text-blue-500 text-[var(--foreground)] hover:scale-105 transition-colors font-semibold">
                        {data.home}
                </Link>
                <Link onClick={handleLinkClick} href="/courses" className="hover:text-blue-500 text-[var(--foreground)] hover:scale-105 transition-colors font-semibold">
                        {data.courses}
                </Link>
                <Link onClick={handleLinkClick} href="/instructors" className="hover:text-blue-500 text-[var(--foreground)] hover:scale-105 transition-colors font-semibold">
                        {data.instructors}
                </Link>
                <Link onClick={handleLinkClick} href="/about" className="hover:text-blue-500 text-[var(--foreground)] hover:scale-105 transition-colors font-semibold">
                        {data.about}
                </Link>
            </ul>
            <div className="flex flex-col gap-4 justify-center items-center">
                <button
                    className="cursor-pointer px-4 py-2 rounded font-semibold text-[var(--foreground)]"
                    onClick={() => setLang(lang === "en" ? "ar" : "en")}
                >
                    {lang === "en" ? "العربية" : "Eng"}
                </button>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
        </nav>
    );
    }
