import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { getCategoryIcon } from "@/utils/categoryIcons";

export const HoverEffect = ({
  items,
  className,
}: {
  items: any[]; // Accept any array of items
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 gap-2",
        className
      )}
    >
      {items.map((item, idx) => {
        const IconComponent = getCategoryIcon(item.category)
        return(
        <div
          className="relative group block p-2 h-full w-full"
          key={item?.P_id || idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-800 dark:bg-slate-800/[0.4] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.5, ease: "easeIn" },
                }}
              />
            )}
          </AnimatePresence>
          <Link href={`/project/${item.P_id}`}>
            <Card>
              <CardTitle>
                <div className="flex flex-col items-center justify-center ">
                  {/* {getCategoryIcon(item.icon)} */}
                    <IconComponent />
                </div>
                <div className="">{item.title || "Untitled"}</div>
              </CardTitle>

              <CardDescription>
                {item.description || "No description available"}
              </CardDescription>
            </Card>
          </Link>
        </div>


        // </Link>
      )
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-0", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-0 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
