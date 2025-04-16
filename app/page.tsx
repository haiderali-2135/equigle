"use client";

import { useEffect } from "react";
import HeroSection from "@/components/sections/hero-section";
import About from "@/components/sections/About";
import Services from "@/components/sections/services";
import Agents from "@/components/sections/Agents";
import OtherProjects from "@/components/sections/OtherProjects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer";
import { ProjectProvider } from "@/lib/projects-context";
import { ContactProvider } from "@/lib/contact-context";

export default function Home() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get("scroll") || "hero";

    const scrollToTarget = () => {
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Add small delay to wait for DOM/render
    setTimeout(scrollToTarget, 300);
  }, []);

  return (
    <ContactProvider>
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
    </ContactProvider>
  );
}
