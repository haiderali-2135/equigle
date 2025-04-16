"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Default partners that can be overridden
interface Partner {
  P_id: string;
  name: string;
  logo: string;
}

function LogoMarquee() {
  const [partners, setPartners] = useState<Partner[]>([])
  
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partners")
        if (!response.ok) {
          throw new Error("Failed to fetch partners")
        }
        const data = await response.json()
        setPartners(data)
      } catch (error) {
        console.error("Error fetching partners:", error)
      }
    }
  
    useEffect(() => {
      fetchPartners()
    }, [])



  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative overflow-hidden w-full">
        {/* Gradient overlays for fade effect - using transparent backgrounds to inherit parent bg */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex items-center gap-16 px-8"
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={`${partner.P_id}-${idx}-2`}
                className="w-[100px] h-[50px] flex items-center justify-center group"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}

export default LogoMarquee;
