"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import DashboardNavbar from "./Navbar";
import { useLanguage } from "@/context/LanguageContext";

const languages = ["javascript", "typescript", "python"];

export default function MultiLangIDE() {
    const { lang } = useLanguage();
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(
        lang === "ar" ? "// جرّب الكود هنا..." : "// Try your code here..."
    );
    const [output, setOutput] = useState("");

    const runCode = () => {
        if (language === "javascript" || language === "typescript") {
        try {
            const result = new Function(code)();
            setOutput(String(result ?? (lang === "ar" ? "تم تنفيذ الكود!" : "Code executed!")));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setOutput(err.message);
        }
        } else if (language === "python") {
        setOutput(lang === "ar" ? "تنفيذ بايثون يحتاج باكند. قريباً!" : "Python execution requires backend. Coming soon!");
        }
    };

    const clearCode = () => {
        setCode(lang === "ar" ? "// جرّب الكود هنا..." : "// Try your code here...");
        setOutput("");
    };

    return (
        <>
            <DashboardNavbar username="User" onLogout={() => {}} />

            <div className="mt-24 p-6 rounded-xl shadow-lg bg-[var(--muted)] dark:bg-[var(--muted-dark)]">
                <h2 className="text-2xl font-semibold mb-4">
                {lang === "ar" ? "بيئة تطوير كودونيتي" : "Codunity IDE"}
                </h2>

                <div className="flex gap-4 mb-4 flex-wrap">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-2 rounded-lg border"
                >
                    {languages.map((l) => (
                    <option key={l} value={l}>
                        {lang === "ar"
                        ? l === "javascript"
                            ? "جافاسكريبت"
                            : l === "typescript"
                            ? "تايبسكريبت"
                            : "بايثون"
                        : l.charAt(0).toUpperCase() + l.slice(1)}
                    </option>
                    ))}
                </select>

                <button
                    onClick={runCode}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    {lang === "ar" ? "تشغيل الكود" : "Run Code"}
                </button>

                <button
                    onClick={clearCode}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
                >
                    {lang === "ar" ? "مسح" : "Clear"}
                </button>
                </div>

                <div className="h-80 border rounded-lg overflow-hidden" dir="ltr">
                <Editor
                    height="100%"
                    language={language === "python" ? "python" : language}
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    theme="vs-dark"
                    
                />
                </div>

                <div className="mt-4 p-4 bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-lg text-[var(--foreground)]">
                <h3 className="font-semibold mb-2">{lang === "ar" ? "الناتج:" : "Output:"}</h3>
                <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
            </div>
        </>
    );
}
