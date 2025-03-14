"use client";

import { useVisibility } from "@/hooks/usevisibility";
import React, { useEffect, useState } from "react";
import { useProjectContext } from "@/lib/projects-context";
import { motion } from "framer-motion";
import { BarChart, Cloud, Code, PieChart, Smartphone } from "lucide-react";
import { HoverEffect } from "../ui/card-hover-effect";

function OtherProjects() {
  const projectsData = useProjectContext();

  const [hasNotAnimated, setHasNotAnimated] = useState(true);
  const isVisible = useVisibility("projects-section");

  useEffect(() => {
    if (isVisible && hasNotAnimated) {
      setHasNotAnimated(false);
    }
  }, [isVisible, hasNotAnimated]);

  return (
    <div
      id="projects-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 md:px-8 snap-start"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[4vw] mt-[1%] mb-[0%] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
      >
        Other Projects
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className=""
        style={{ cursor: "pointer" }}
      >
        <HoverEffect
          items={projectsData.filter(
            (project) => project.category !== "AI Agents"
          )}
        />
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-[2%] mb-[2%] flex justify-center"
      >
        <a
          href="#contact"
          className="px-6 py-2 rounded-lg bg-white/10 text-white text-md font-semibold hover:bg-white/20 transition-colors duration-300"
        >
          Contact Us
        </a>
      </motion.div> */}
    </div>
  );
}

export default OtherProjects;
