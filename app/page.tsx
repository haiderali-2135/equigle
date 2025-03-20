"use client";
import { ProjectProvider } from "@/lib/projects-context";
import HeroSection from "@/components/sections/hero-section";

import CenterLightBeam from "@/components/light-beam";
import Agents from "@/components/sections/Agents";
import About from "@/components/sections/About";
import Services from "@/components/sections/services";
import OtherProjects from "@/components/sections/OtherProjects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer";
import Header2 from "@/components/header-2";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const target = searchParams.get("scroll") || "hero";
  useEffect(() => {
    // Wait until the DOM is ready, then scroll to the target section

    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [target]);
  return (
    <>
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="services">
          <Services />
        </section>
        <ProjectProvider>
          <section id="agents">
            <Agents />
          </section>
          <section id="projects">
            <OtherProjects />
          </section>
        </ProjectProvider>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}
