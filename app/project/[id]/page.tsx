'use client'

import ProjectPage from "@/components/sections/ProjectPage"
import { ProjectProvider } from "@/lib/projects-context";

function page() {
  return (
    <ProjectProvider>
      <ProjectPage />
      </ProjectProvider>
  )
}

export default page
