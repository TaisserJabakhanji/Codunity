"use client";

import React, { useState } from "react";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { ModeToggle } from "@/components/ModeToggle";

interface DashboardNavbarProps {
    username: string;
    onLogout: () => void;
}

export default function DashboardNavbar({ username, onLogout }: DashboardNavbarProps) {
    const { lang, setLang } = useLanguage();
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

    const handleLanguageToggle = () => {
        setLang(lang === "ar" ? "en" : "ar");
    };

    return (
        <nav className="fixed top-0 z-20 w-full bg-[var(--background)] text-[var(--foreground)] shadow-md">
            <div className="flex justify-between items-center px-6 py-4 max-md:px-4">
                {/* Logo */}
                <h1 className="text-xl font-bold cursor-pointer">
                    {lang === "ar" ? "كوديونتي داشبورد" : "Codunity Dashboard"}
                </h1>

                {/* Desktop Right Section */}
                <div className="hidden md:flex items-center gap-4">
                    <ModeToggle />

                    {/* Language Switch */}
                    <button
                        onClick={handleLanguageToggle}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg border hover:bg-[var(--muted)] transition"
                    >
                        <FaGlobe size={16} />
                        {lang === "ar" ? "عربي" : "EN"}
                    </button>

                    {/* Username */}
                    <span className="font-medium">
                        {lang === "ar" ? `مرحبا، ${username}` : `Hello, ${username}`}
                    </span>

                    {/* Logout */}
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg border hover:bg-red-600 hover:text-white transition"
                    >
                        <MdLogout size={20} />
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMobileMenu} className="md:hidden">
                    {mobileOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-[var(--background)]">
                    <ModeToggle />

                    <button
                        onClick={handleLanguageToggle}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border hover:bg-[var(--muted)] transition"
                    >
                        <FaGlobe size={16} />
                        {lang === "ar" ? "عربي" : "EN"}
                    </button>

                    <span className="font-medium">
                        {lang === "ar" ? `مرحبا، ${username}` : `Hello, ${username}`}
                    </span>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border hover:bg-red-600 hover:text-white transition"
                    >
                        <MdLogout size={20} />
                    </button>
                </div>
            )}
        </nav>
    );
}
