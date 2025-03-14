import React from "react";
import { DrawerClose, DrawerFooter } from "./drawer";
import { Button } from "./button";
import { useProjectContext } from "@/lib/projects-context";
import { MoveDown } from "lucide-react";

interface DrawerCardProps {
  id: number;
}

function DrawerCard({ id }: DrawerCardProps) {
  // Get all agents from the context
  const projects = useProjectContext();

  // Find the agent with the given id
  const project = projects.find((project) => project.id === id);

  if (!project) return null; // If no agent is found, return null

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Section 1: Agent Tasks */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Agent Tasks</h3>
          <ul className="list-disc list-inside text-gray-700">
            {project.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>

        {/* Section 2: Title, Description & Image */}
        <div
          className="bg-cover bg-center rounded-md shadow-sm text-white p-6 flex flex-col justify-center"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        >
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <p className="text-sm opacity-80">{project.description}</p>
        </div>

        {/* Section 3: Key Statistics */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Key Statistics</h4>
          <ul className="list-disc list-inside text-gray-700">
            {project.stats.map((stat, index) => (
              <li key={index}>{stat}</li>
            ))}
          </ul>
        </div>

        {/* Section 4: Tools Used */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Tools Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, index) => (
              <span key={index} className="px-2 py-1 bg-gray-300 rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Section 5: Industry Type */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Industry Type</h4>
          <p className="text-gray-700">{project.industry || "Not specified"}</p>
        </div>
      </div>

      {/* Footer with Close Button */}
      <DrawerFooter className="p-2 ">
        <DrawerClose asChild>
          <Button
            variant="ghost"
            className="opacity-70 hover:opacity-100 bg-violet-400 hover:bg-violet-600"
            style={{ cursor: "grab" }}
          >
            <MoveDown />
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}

export default DrawerCard;
