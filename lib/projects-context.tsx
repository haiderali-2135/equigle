// lib/agentContext.tsx

"use client"

import React, { createContext, JSX, useContext, useEffect, useState } from "react";
import {
  Search,
  MessageSquare,
  Database,
  Calendar,
  FileText,
  BarChart,
  Cog,
  BookOpen,
  Activity,
  Layers,
  StepForward,
  StepBack,
  Code,
  PieChart,
  Cloud,
  Smartphone,
} from "lucide-react";

interface Project {
  P_id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  tasks: string[];
  stats: string[];
  tools: string[];
  technologies: string[];
  industry: string;
  category: string;
}






// Create context
const ProjectContext = createContext<Project[]>([]);

// Create a custom hook to use the context
export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch("/api/projects");
          if (!response.ok) throw new Error("Failed to fetch projects");
          const data = await response.json();
          setProjects(data)
          
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
  
      fetchProjects();
      
    }, []);
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};
