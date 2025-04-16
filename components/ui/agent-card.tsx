"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { JSX } from "react";
import Link from "next/link";
import { Button } from "./button";
import { getCategoryIcon } from "@/utils/categoryIcons";

interface AgentCardProps {
  P_id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  category: string;
}

export function AgentCard({
  P_id,
  title,
  description,
  icon,
  imageUrl,
  category,
}: AgentCardProps) {

  const IconComponent = getCategoryIcon(category)

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full transition-all duration-300"
    >
      <Card
        className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden relative"
        style={{ cursor: "grab" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div
            className={`absolute inset-0  mix-blend-multiply`}
          />
        </div>

        {/* Card content */}
        <CardContent className="p-6 flex flex-col h-full relative">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm w-fit mb-4">
           <IconComponent />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>
          <p className="text-sm text-white/90 flex-grow">{description}</p>

          <div
            className="flex items-center mt-4 text-xs font-medium text-gray-400 hover:gap-1 hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <span>
              <Link href={`/project/${P_id}`}>Learn more</Link>{" "}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-0.5 mt-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
