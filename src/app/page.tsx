import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Projects from "@/components/sections/Projects";
import Team from "@/components/sections/Team";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Metrics />
        <Services />
        <WhyUs />
        <Projects />
        <Team />
        <BlogPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
