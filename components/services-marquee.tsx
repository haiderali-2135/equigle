'use client'
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function ServicesMarquee() {
  const services = [
    'AI Agents', 
    'Web Development', 
    'Mobile Apps', 
    'Cloud Solutions', 
    'Automation', 
    'Cyber Security',
    'Data Analytics',
    'Custom Software',
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="rounded-xl py-6 bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <Marquee 
        gradient 
        gradientColor="rgb(10, 10, 10)"
        gradientWidth={100} 
        speed={40} 
        pauseOnHover
      >
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-x-8 mx-4">
             
            {/* Service Box */}
            <div className="mx-5 p-2 px-6 text-white font-medium rounded-full bg-white/10 hover:bg-white/15 transition-colors border border-white/10">
              {service}
            </div>

            {/* Separator with fading effect */}
            {index !== services.length - 1 && (
              <div className="w-[2px] h-7 bg-gradient-to-b from-white/30 via-white/10 to-transparent opacity-30" />
            )}
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}

export default ServicesMarquee;