import { BlogNavbar } from "@/components/BlogNavbar";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Home() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto px-2">
      <div className="w-full">
        {/* Navbar */}
        <BlogNavbar />
        <TracingBeam>
          <Hero />
          <Features />
          <Footer />
        </TracingBeam>
      </div>
    </main>
  );
}
