import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";


export const metadata: Metadata = {
  title: "Counity",
  description: "Learning Platform",
};

export default async function RootLayout({
  children,

}: {
  children: React.ReactNode;
}) {


  return (
    <html>
      <body>
        <ClerkProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <LanguageProvider>
                  {children}
                </LanguageProvider>
              </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
