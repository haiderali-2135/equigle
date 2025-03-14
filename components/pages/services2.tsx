"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Code, Smartphone, Cloud, BarChart, PieChart, Cpu } from 'lucide-react'
import { WobbleCard } from '../ui/wobble-card'

function Services2() {

  const Cards = [
    {
      title: "AI Agents",
      description: "To empower businesses with intelligent AI solutions that drive growth and innovation.",
      icon: <Cpu className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "Web Development",
      description: "Responsive, modern websites and web applications built with cutting-edge technologies.",
      icon: <Code className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications to enhance user engagement and accessibility.",
      icon: <Smartphone className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "Data Analytics",
      description: "Leverage data to gain insights and make informed business decisions.",
      icon: <BarChart className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "Cloud Solutions",
      description: "Secure, scalable, and efficient cloud solutions to streamline your business operations.",
      icon: <Cloud className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "Custom Software",
      description: "Tailored software solutions designed to meet your unique business requirements.",
      icon: <PieChart className="h-10 w-10 text-white mb-2" />,
    },
  ]

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 md:px-8 snap-start">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[4vw] mt-2 mb-4 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
      >
        Intelligent Agents for Your Business
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-2 max-w-5xl mx-auto w-full">
        {Cards.map((card, index) => (
          <WobbleCard
            key={index}
            containerClassName="col-span-1 p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2"
          >
            <div className="flex justify-center mb-2">
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-1 text-center">{card.title}</h3>
            <p className="text-gray-400 text-sm text-center">{card.description}</p>
          </WobbleCard>
        ))}
      </div>

      {/* Contact Button */}
      <div className="mt-4 flex justify-center">
        <a
          href="#contact"
          className="px-6 py-2 rounded-lg bg-white/10 text-white text-lg font-semibold hover:bg-white/20 transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>

    </div>
  )
}

export default Services2;
