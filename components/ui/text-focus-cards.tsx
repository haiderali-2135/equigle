"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-200 dark:bg-neutral-900 overflow-hidden p-8 transition-all duration-300 ease-out h-full",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3
          className={cn(
            "text-xl font-semibold",
            card.titleColor || "text-gray-900 dark:text-white"
          )}
        >
          {card.title}
        </h3>
        {card.icon && (
          <div className={card.iconColor || "text-gray-700 dark:text-gray-300"}>
            {card.icon}
          </div>
        )}
      </div>
      <p className="text-gray-600  dark:text-gray-400">{card.description}</p>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  titleColor?: string;
  iconColor?: string;
};

export function TextFocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full"
      style={{ cursor: "pointer" }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
