"use client";
import { ProjectProvider } from "@/lib/projects-context";
import HeroSection from "@/components/pages/hero-section";
import Header from "@/components/header";
import CenterLightBeam from "@/components/light-beam";
import Agents from "@/components/pages/Agents";
import About from "@/components/pages/About";
import Services from "@/components/pages/services";
import OtherProjects from "@/components/pages/OtherProjects";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Services />
      <ProjectProvider>
        <Agents />
        <OtherProjects />
      </ProjectProvider>
    </>
  );
}
