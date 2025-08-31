'use client'

import React from 'react';
import { ModeToggle } from "./ModeToggle";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ar from "../locales/ar/navbar.json";
import en from "../locales/en/navbar.json";




const Navbar = () => {

    const { lang, setLang } = useLanguage();
    const data = lang === "ar" ? ar : en;

    const { openSignIn } = useClerk()

    return (
                <>
            {/* Desktop Navbar */}
            <nav className="backdrop-blur-lg fixed top-0 z-50 max-md:hidden w-full flex flex-row px-6 py-4 justify-between items-center bg-[var(--background)] shadow-md transition-colors duration-300">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Codunity
                </h1>

                <ul className="flex flex-row gap-5 ml-26">
                    <Link href="/" className="text-[var(--foreground)] hover:text-blue-500 hover:scale-105 transition-colors font-semibold">
                        {data.home}
                    </Link>
                    <Link href="/courses" className="text-[var(--foreground)] hover:text-blue-500 hover:scale-105 transition-colors font-semibold">
                        {data.courses}
                    </Link>
                    <Link href="/instructors" className="text-[var(--foreground)] hover:text-blue-500 hover:scale-105 transition-colors font-semibold">
                        {data.instructors}
                    </Link>
                    <Link href="/about" className="text-[var(--foreground)] hover:text-blue-500 hover:scale-105 transition-colors font-semibold">
                        {data.about}
                    </Link>
                </ul>

                <div className="flex flex-row gap-4 items-center">
                    <div className="z-100">
                        <ModeToggle />
                        <button
                            className="cursor-pointer px-4 py-2 rounded font-semibold text-[var(--foreground)]"
                            onClick={() => setLang(lang === "en" ? "ar" : "en")}
                        >
                            {lang === "en" ? "العربية" : "Eng"}
                        </button>
                    </div>
                        <SignedOut>
                            <button onClick={() => openSignIn()} className='bg-[var(--foreground)] text-[var(--background)] rounded-md cursor-pointer'>
                                {lang === "ar"? "تسجيل الدخول" : "Signin"}
                            </button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                </div>
            </nav>

            <MobileNavbar />

        </>
    )
}

export default Navbar;
