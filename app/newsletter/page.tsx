"use client";

import { BlogNavbar } from "@/components/BlogNavbar";
import Footer from "@/components/Footer";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Features from "@/components/Features";
import HeroNews from "@/components/newsletter/HeroNews";

export default function NewsletterPage() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto px-2">
      <div className="w-full">
        {/* Navbar */}
        <BlogNavbar />
        <TracingBeam>
          <HeroNews />
          <Features />
          <Footer />
        </TracingBeam>
      </div>
    </main>
  );
}
