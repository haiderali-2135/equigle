"use client";
import React, { useEffect, useState } from "react";
import LogoMarquee from "../partner-marquee";
import { motion } from "framer-motion";
import { Eye, Lightbulb, Smartphone, Target } from "lucide-react";
import { TextFocusCards } from "../ui/text-focus-cards";
import { useVisibility } from "@/hooks/usevisibility";

function About() {
  const cards = [
    {
      title: "Our Mission",
      description:
        "To empower businesses with intelligent AI solutions that drive growth and innovation.",
      icon: <Target className="h-6 w-6" />,
      titleColor: "text-purple-800",
      iconColor: "text-purple-600",
    },
    {
      title: "Our Approach",
      description:
        "We combine cutting-edge AI technology with deep industry expertise to deliver tailored solutions.",
      icon: <Lightbulb className="h-6 w-6" />,
      titleColor: "text-indigo-800",
      iconColor: "text-indigo-600",
    },
    {
      title: "Our Vision",
      description:
        "To lead the AI revolution by creating intelligent agents that transform how businesses operate.",
      icon: <Eye className="h-6 w-6" />,
      titleColor: "text-violet-800",
      iconColor: "text-violet-600",
    },
  ];

  const [hasNotAnimated, setHasNotAnimated] = useState(true);
  const isVisible = useVisibility("about-section");

  useEffect(() => {
    if (isVisible && hasNotAnimated) {
      setHasNotAnimated(false);
    }
  }, [isVisible, hasNotAnimated]);

  return (
    

    <div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden snap-start"
      id="about-section"
    >

      <div className="min-h-screen relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-[5vh] md:py-[3vh] flex flex-col items-center justify-center gap-[5%] ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: !hasNotAnimated ? 1 : 0,
            y: !hasNotAnimated ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-[4vh]"
        >
          <h2 className="text-[5vw] sm:text-[4vw] md:text-[3.5vw] font-bold mb-[2vh] text-purple-900">
            About Equigle
          </h2>
          <p className="text-[2.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.5vw] text-gray-700 max-w-3xl mx-auto">
            We're a team of AI specialists, developers, and designers building
            intelligent solutions for modern businesses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: !hasNotAnimated ? 1 : 0,
            y: !hasNotAnimated ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className=""
        >
          {/* Text Focus Cards */}
          <TextFocusCards cards={cards} />
        </motion.div>

        {/* Partners Section */}
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{
            opacity: !hasNotAnimated ? 1 : 0,
            y: !hasNotAnimated ? 0 : 20,
          }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] text-center  font-bold mb-[0vh] text-violet-700 mt-[5vh]">
            Our Partners
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: !hasNotAnimated ? 1 : 0,
            y: !hasNotAnimated ? 0 : 20,
          }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg "
        >
          <div
            className="p-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400"
            style={{ cursor: "pointer" }}
          >
            <div className="bg-white p-[2vh] sm:p-[3vh]">
              <div>
                <LogoMarquee />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* </BackgroundBeamsWithCollision>  */}
    </div>
  );
}

export default About;
