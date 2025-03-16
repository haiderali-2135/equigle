"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectContext } from "@/lib/projects-context";
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projects = useProjectContext();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundProject = projects.find((p) => p.id === Number(params.id));
      if (foundProject) {
        setProject(foundProject);
      }
      setLoading(false);
    }
  }, [params.id, projects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white snap-start">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a] z-10"></div>
        <Image
          src={project.imageUrl || "/placeholder.svg?height=800&width=1200"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-1 bg-purple-600/80 rounded-full text-sm mb-4">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                Project Overview
              </h2>
              <p className="text-white/80 mb-8">
                {project.description} This project was developed for the{" "}
                {project.industry} industry, focusing on delivering high-quality
                solutions that meet specific business needs.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-purple-400">
                Key Tasks
              </h3>
              <ul className="space-y-3 mb-8">
                {project.tasks.map((task: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-purple-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-white/80">{task}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-purple-400">
                Performance Metrics
              </h3>
              <ul className="space-y-3">
                {project.stats.map((stat: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-purple-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-white/80">{stat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24"
            >
              <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                Project Details
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-white/60 mb-2">Industry</h4>
                  <p className="font-medium">{project.industry}</p>
                </div>

                <div>
                  <h4 className="text-sm text-white/60 mb-2">Category</h4>
                  <p className="font-medium">{project.category}</p>
                </div>

                <div>
                  <h4 className="text-sm text-white/60 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-900/30 border border-purple-500/20 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-white/60 mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tools.map((tool: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 border border-white/10 rounded-full text-xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>View Live Demo</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Related Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(
                (p) => p.category === project.category && p.id !== project.id
              )
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  href={`/project/${relatedProject.id}`}
                  key={relatedProject.id}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1 duration-300">
                    <div className="relative h-48">
                      <Image
                        src={
                          relatedProject.imageUrl ||
                          "/placeholder.svg?height=400&width=600"
                        }
                        alt={relatedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
