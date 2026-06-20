import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
