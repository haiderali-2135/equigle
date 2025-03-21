"use client";

import { motion } from "framer-motion";

// Default partners that can be overridden
interface Partner {
  id: number;
  name: string;
  logo: string;
}
const Partners: Partner[] = [
  {
    id: 1,
    name: "Partner 1",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 3,
    name: "Partner 3",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 5,
    name: "Partner 5",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 6,
    name: "Partner 6",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 7,
    name: "Partner 7",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
  {
    id: 8,
    name: "Partner 8",
    logo: "https://banner2.cleanpng.com/20180610/jeu/aa8r2y6ex.webp",
  },
];

function LogoMarquee({ partners = Partners }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative overflow-hidden w-full">
        {/* Gradient overlays for fade effect - using transparent backgrounds to inherit parent bg */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex items-center gap-16 px-8"
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}-2`}
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
