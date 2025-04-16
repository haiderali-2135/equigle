"use client";

import { useVisibility } from "@/hooks/usevisibility";
import React, { useEffect, useState } from "react";
import { useProjectContext } from "@/lib/projects-context";
import { motion } from "framer-motion";
import { HoverEffect } from "../ui/card-hover-effect";
import { Pointer } from "lucide-react";
import { getCategoryIcon } from "@/utils/categoryIcons";

const ITEMS_PER_PAGE = 8;

function OtherProjects() {
  const projectsData = useProjectContext();
  const [hasNotAnimated, setHasNotAnimated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const isVisible = useVisibility("projects-section");

  useEffect(() => {
    if (isVisible && hasNotAnimated) {
      setHasNotAnimated(false);
    }
  }, [isVisible, hasNotAnimated]);

  // Calculate total pages
  const totalPages = Math.ceil(
    projectsData.filter((project) => project.category !== "AI Agents").length /
      ITEMS_PER_PAGE
  );

  // Get projects for current page
  const paginatedProjects = projectsData
    .filter((project) => project.category !== "AI Agents")
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div
      id="projects-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 md:px-8 snap-start"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[4vw] mt-[1%] mb-1 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
      >
        Other Projects
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: !hasNotAnimated ? 1 : 0,
          y: !hasNotAnimated ? 0 : 20,
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full flex flex-col items-center"
        style={{ cursor: "pointer" }}
      >
        <HoverEffect items={paginatedProjects} />

        {/* Pagination Controls */}
        <div className=" flex gap-5 mb-2 sm:gap-60">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 rounded bg-gray-700 text-white ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
            style={{ cursor: "Pointer" }}
          >
            Previous
          </button>
          <span className="text-white mt-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 rounded bg-gray-700 text-white ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
            style={{ cursor: "Pointer" }}
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OtherProjects;
