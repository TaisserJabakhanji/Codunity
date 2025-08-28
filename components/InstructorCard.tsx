'use client'

import Image from "next/image";
import { Instructor } from "../types";

interface Props {
  instructor: Instructor;
  lang: 'ar' | 'en';
}

export default function InstructorCard({ instructor, lang }: Props) {
  return (
    <div className="shadow-2xl rounded-lg p-4 transition flex flex-col items-center text-center h-full">
      <Image
        src={instructor.avatar}
        alt={instructor.name}
        width={150}
        height={150}
        className="rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold">{instructor.name}</h2>
      <p className="text-[var(--primary)] font-medium">{instructor.title}</p>
      <p className="text-[var(--muted-foreground)] mt-2">{instructor.bio}</p>
    </div>
  );
}
