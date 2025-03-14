"use client"
import React from 'react'
import LogoMarquee from '../partner-marquee'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision'
import { motion } from 'framer-motion'
import { Eye, Lightbulb, Smartphone, Target } from 'lucide-react'
import { TextFocusCards } from '../ui/text-focus-cards'
import FloatingPaths from '../floating-paths'
import { BackgroundLines } from '../ui/background-lines'
import { WobbleCard } from '../ui/wobble-card'

function About2() {
  const cards = [
    {
      title: "Our Mission",
      description: "To empower businesses with intelligent AI solutions that drive growth and innovation.",
      icon: <Target className="h-6 w-6" />,
      titleColor: "text-purple-800",
      iconColor: "text-purple-600",
    },
    {
      title: "Our Approach",
      description: "We combine cutting-edge AI technology with deep industry expertise to deliver tailored solutions.",
      icon: <Lightbulb className="h-6 w-6" />,
      titleColor: "text-indigo-800",
      iconColor: "text-indigo-600",
    },
    {
      title: "Our Vision",
      description: "To lead the AI revolution by creating intelligent agents that transform how businesses operate.",
      icon: <Eye className="h-6 w-6" />,
      titleColor: "text-violet-800",
      iconColor: "text-violet-600",
    },
  ]

  return (

    // image 2 ......
    // <div className='relative w-full flex flex-col items-center justify-center overflow-hidden snap-start bg-cover bg-center bg-no-repeat'
    // style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1670179693443-7c33b1afa788?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
    // >

    // no image .....
    <div className='relative w-full flex flex-col items-center justify-center overflow-hidden snap-start'>

      {/* <BackgroundBeamsWithCollision className='min-h-screen'>  */}
      {/* <div className="absolute inset-0">
      <FloatingPaths position={-10} />
      <FloatingPaths position={0.5} />
    </div> */}

        <div className="min-h-screen relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-[5vh] md:py-[3vh] flex flex-col items-center justify-center gap-[5%] ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[4vh]"
          >
            <h2 className="text-[5vw] sm:text-[4vw] md:text-[3.5vw] font-bold mb-[2vh] text-purple-900">
              About Equigle
            </h2>
            <p className="text-[2.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.5vw] text-gray-700 max-w-3xl mx-auto">
              We're a team of AI specialists, developers, and designers building intelligent solutions for modern businesses.
            </p>
          </motion.div>

          {/* Text Focus Cards
          <TextFocusCards cards={cards} /> */}

          {/* Wobble Cards Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto w-full">
  {cards.map((card, index) => (
    <WobbleCard
      key={index}
      containerClassName="col-span-1 p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-4"
    >
      <div className="flex justify-center mb-2">
        {card.icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1 text-center">{card.title}</h3>
      <p className="text-gray-400 text-sm text-center">{card.description}</p>
    </WobbleCard>
  ))}
</div>


          {/* Partners Section */}

          <motion.div className="">
          <h3 className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] text-center underline font-bold mb-[1vh] text-gray-800 mt-[4vh]">
                  Our Partners
          </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg "
          >
            <div className="p-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400">
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
  )
}

export default About2
