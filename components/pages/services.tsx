"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Smartphone, Cloud, BarChart, PieChart, Cpu } from "lucide-react";
import { useVisibility } from "@/hooks/usevisibility";

function Services() {
  const Cards = [
    {
      title: "Web Development",
      description:
        "Responsive, modern websites and web applications built with cutting-edge technologies.",
      icon: <Code className="h-8 w-8 text-white mb-2" />,
    },
    {
      title: "AI Agents",
      description:
        "To empower businesses with intelligent AI solutions that drive growth and innovation.",
      icon: <Cpu className="h-8 w-8 text-white mb-2" />,
    },
    {
      title: "Mobile Apps",
      description:
        "Cross-platform mobile applications to enhance user engagement and accessibility.",
      icon: <Smartphone className="h-8 w-8 text-white mb-2" />,
    },
    {
      title: "Data Analytics",
      description:
        "Leverage data to gain insights and make informed business decisions.",
      icon: <BarChart className="h-8 w-8 text-white mb-2" />,
    },
    {
      title: "Cloud Solutions",
      description:
        "Secure, scalable, and efficient cloud solutions to streamline your business operations.",
      icon: <Cloud className="h-8 w-8 text-white mb-2" />,
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions designed to meet your unique business requirements.",
      icon: <PieChart className="h-8 w-8 text-white mb-2" />,
    },
  ];

  const [hasNotAnimated, setHasNotAnimated] = useState(true);
  const isVisible = useVisibility("services-section");

  useEffect(() => {
    if (isVisible && hasNotAnimated) {
      setHasNotAnimated(false);
    }
  }, [isVisible, hasNotAnimated]);

  return (
    <div
      id="services-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 md:px-8 snap-start"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[4vw] mt-[0%] mb-[1%] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
      >
        Services We Provide
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-2 max-w-5xl mx-auto w-full"
        style={{ cursor: "pointer" }}
      >
        {Cards.map((card, index) => (
          <motion.div
            key={index}
            className="col-span-1 p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            whileHover={{
              rotate: [0, 3, -3, 3, -3, 0],
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <div className="flex justify-center -mb-2 mt-2">{card.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-1 text-center">
              {card.title}
            </h3>
            <p className="text-gray-400 text-xs text-center">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
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
      </motion.div>
    </div>
  );
}

export default Services;
