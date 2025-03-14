"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { JSX } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "./button";
import DrawerCard from "./drawer-card";

interface AgentCardProps {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  imageUrl: string;
}

export function AgentCard({
  id,
  title,
  description,
  icon,
  color,
  imageUrl,
}: AgentCardProps) {
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
            className={`absolute inset-0 bg-gradient-to-br ${color} mix-blend-multiply`}
          />
        </div>

        {/* Card content */}
        <CardContent className="p-6 flex flex-col h-full relative">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm w-fit mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>
          <p className="text-sm text-white/90 flex-grow">{description}</p>
          <Drawer>
            <DrawerTrigger asChild>
              <div
                className="flex items-center mt-4 text-xs font-medium text-white hover:underline"
                style={{ cursor: "pointer" }}
              >
                <span>Learn more</span>
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
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </DrawerTrigger>
            <DrawerContent className="min-h-26/30 max-h-26/30 overflow-hidden">
              <DrawerCard id={id} />
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
