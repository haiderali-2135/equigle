"use client";
import { ProjectProvider } from "@/lib/projects-context";
import HeroSection from "@/components/pages/hero-section";

import CenterLightBeam from "@/components/light-beam";
import Agents from "@/components/pages/Agents";
import About from "@/components/pages/About";
import Services from "@/components/pages/services";
import OtherProjects from "@/components/pages/OtherProjects";
import Testimonials from "@/components/pages/Testimonials";
import Contact from "@/components/pages/Contact";
import Footer from "@/components/footer";
import Header2 from "@/components/header-2";

export default function Home() {
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
    </>
  );
}
