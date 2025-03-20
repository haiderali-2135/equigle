"use client";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { useVisibility } from "@/hooks/usevisibility";
import { useEffect, useState } from "react";
import { AgentsCarousel } from "../agents-carousel";

function Agents() {
  const paragraph = `Importance of automation using agents: Lorem ipsum dolor, sit t quos illo. Earum reiciendis repudiandae, sint necessitatibus rerum, saepe voluptatem rem, veniam maxime natus est. Magnam, sed aperiam. Illo deserunt, libero necessitatibus quas expedita aperiam deleniti eos porro consequuntur facere, cupiditate consequatur accusamus obcaecati in nesciunt aliquam aliquid numquam? Aspernatur ut nisi recusandae magni modi quibusdam voluptatibus enim!`;

  const [hasNotAnimated, setHasNotAnimated] = useState(true);
  const isVisible = useVisibility("agents-section");

  useEffect(() => {
    if (isVisible && hasNotAnimated) {
      setHasNotAnimated(false);
    }
  }, [isVisible, hasNotAnimated]);

  return (
    <div
      id="agents-section"
      className="relative pt-[1.75%] max-h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-start"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8 }}
        className="text-center mb-[2vh]"
      >
        <h2 className="text-[5vw] sm:text-[4vw] md:text-[3.5vw] font-bold mb-[2vh] text-purple-900">
          AI Agents
        </h2>
        <div className="text-[2.5vw] sm:text-[2.5vw] md:text-[2.5vw] lg:text-[1.2vw] text-gray-700 max-w-4xl mx-auto">
          {!hasNotAnimated && <TextGenerateEffect words={paragraph} />}
        </div>
      </motion.div>
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h3 className="text-[3vw]  sm:text-[2.5vw] md:text-[2vw] text-center font-bold mb-[0vh] text-violet-700 mt-[3vh]">
          Our Agents
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 30,
        }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full px-4 mb-[1vh] "
      >
        <AgentsCarousel />
      </motion.div>
    </div>
  );
}

export default Agents;
