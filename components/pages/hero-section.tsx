"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Smartphone, Bot } from "lucide-react"
import CenterLightBeam from "../light-beam"
import FloatingPaths from "../floating-paths"
import ServicesMarquee from "@/components/services-marquee";

export default function HeroSection() {

  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {  // Show when user scrolls 100px
        setShowMarquee(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 md:px-8 snap-start">
      
    {/* Floating Paths */}
    <div className="absolute inset-0">
      <FloatingPaths position={-10} />
      <FloatingPaths position={0.5} />
    </div>

    <CenterLightBeam />

    {/* Content Container */}
    <div className="relative z-10 mt-[7%] container mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-[5%] md:gap-[8%] lg:gap-[10%] py-[1vh]">
      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-[4%] py-[1.5%] mt-[1%] rounded-lg text-white/90 font-semibold text-lg border border-white/20 bg-white/5 backdrop-blur-md shadow-md"
      >
        Equigle offers
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[5vw] mt-[2%] md:text-[4vw] lg:text-[3.5vw] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
      >
        Intelligent Agents for Your Business
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-[2vw] md:text-[1.8vw] lg:text-[1.5vw] mt-[1%] text-gray-300 max-w-2xl"
      >
        We build custom AI agents that automate tasks, provide insights, and enhance productivity across your organization. Our expertise extends to web development, mobile applications, and complete digital solutions.
      </motion.p>
    </div>

    {/* ✅ Fixed: Marquee is part of Hero and Fades In, Prevents Shifting */}
    <div className="relative z-10 w-full max-w-screen-lg mt-[5%] mb-0 overflow-hidden" style={{ cursor: "pointer" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMarquee ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <ServicesMarquee />
        </motion.div>
      </div>
  </div>
  )
}
