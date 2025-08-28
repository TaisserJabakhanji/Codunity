'use client'

import React, { useEffect, useState } from "react";

interface HRProps {
    className?: string;
}

export const HR: React.FC<HRProps> = ({ className }) => {
  const [width, setWidth] = useState("w-full"); // يبدأ 100%

    useEffect(() => {
        const timer = setTimeout(() => setWidth("w-[85%]"), 100); // بعد قليل يصغر إلى 90%
        return () => clearTimeout(timer);
    }, []);

    return (
        <hr
        className={`h-0.5 bg-[var(--muted)] dark:bg-[var(--muted-foreground)] my-12 mx-auto transition-all duration-700 ease-out ${width} ${className}`}
        />
    );
};
