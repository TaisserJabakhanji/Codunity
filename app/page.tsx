// import { useTranslations } from "next-intl";

import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { HR } from "@/components/Hr";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";



export default function Home() {


  return (
    <main>
      <Navbar/>
      <Hero />
      <HR />
      <Features />
      <HR />
      <CTA />
      <HR />
      <FAQ />
      <Footer />
    </main>
  );
}
