"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useProjectContext } from "@/lib/projects-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { AgentCard } from "./ui/agent-card";


interface AgentsCarouselProps {
  onAgentClick?: (agentId: number) => void;
}

export function AgentsCarousel({ onAgentClick }: AgentsCarouselProps) {
  const ProjectsData = useProjectContext();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const handleCardClick = useCallback(
    (id: number) => {
      if (onAgentClick) {
        onAgentClick(id);
      } else {
        console.log(`Agent ${id} clicked`);
      }
    },
    [onAgentClick]
  );

  // Auto-play functionality

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 3000);
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  }, []);

  function getOrderedGradientColor(index: number) {
    const colors = [
      "from-blue-500/80 to-indigo-500/80",
      "from-purple-500/80 to-violet-500/80",
      "from-emerald-500/80 to-teal-500/80",
      "from-amber-500/80 to-orange-500/80",
      "from-rose-500/80 to-pink-500/80",
      "from-indigo-500/80 to-blue-500/80",
      "from-slate-500/80 to-gray-500/80",
      "from-teal-500/80 to-cyan-500/80",
      "from-red-500/80 to-rose-500/80",
      "from-violet-500/80 to-purple-500/80",
    ];
    return colors[index % colors.length];
  }

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay, stopAutoplay]);

  return (
    <div
      className="relative w-full py-2 px-0"
      onMouseEnter={stopAutoplay} // Stop on hover
      onMouseLeave={startAutoplay} // Resume on leave
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        <div className="mx-[2%]">
          <CarouselContent className="-ml-4 py-3">
            {ProjectsData.filter(
              (project) => project.category === "AI Agents"
            ).map((project) => (
              <CarouselItem
                key={project.P_id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <AgentCard
                  P_id={project.P_id}
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  imageUrl={project.imageUrl}
                  category={project.category}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
