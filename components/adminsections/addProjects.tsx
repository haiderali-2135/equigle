"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Trash2, Loader2, Plus, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORY_OPTIONS, getCategoryIcon, getCategoryIconName } from "@/utils/categoryIcons"

interface Project {
  P_id: string
  title: string
  description: string
  icon: string
  imageUrl: string
  tasks: string[]
  stats: string[]
  tools: string[]
  technologies: string[]
  industry: string
  category: string
}

export default function ProjectsSection() {
  // Projects list state
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null)

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  // Form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [industry, setIndustry] = useState("")
  const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0])

  // Form validation errors
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [imageUrlError, setImageUrlError] = useState("")
  const [industryError, setIndustryError] = useState("")

  // Array fields
  const [tasks, setTasks] = useState<string[]>([])
  const [stats, setStats] = useState<string[]>([])
  const [tools, setTools] = useState<string[]>([])
  const [technologies, setTechnologies] = useState<string[]>([])

  // New item inputs
  const [newTask, setNewTask] = useState("")
  const [newStat, setNewStat] = useState("")
  const [newTool, setNewTool] = useState("")
  const [newTechnology, setNewTechnology] = useState("")

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects()
  }, [])

  // Function to fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/projects")

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast.error("Failed to load projects", {
        description: "Please refresh the page to try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Reset form to initial state
  const resetForm = () => {
    setTitle("")
    setDescription("")
    setImageUrl("")
    setIndustry("")
    setCategory(CATEGORY_OPTIONS[0])
    setTasks([])
    setStats([])
    setTools([])
    setTechnologies([])
    setNewTask("")
    setNewStat("")
    setNewTool("")
    setNewTechnology("")
    setTitleError("")
    setDescriptionError("")
    setImageUrlError("")
    setIndustryError("")
    setFormError("")
  }

  // Validate form fields
  // const validateForm = () => {
  //   let isValid = true
  //   const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

  //   // Validate title
  //   if (!title.trim()) {
  //     setTitleError("Title is required")
  //     isValid = false
  //   } else if (title.length > 28) {
  //     setTitleError("Title must be 28 characters or less")
  //     isValid = false
  //   } else {
  //     setTitleError("")
  //   }

  //   // Validate description
  //   if (!description.trim()) {
  //     setDescriptionError("Description is required")
  //     isValid = false
  //   } else if (description.length > 300) {
  //     setDescriptionError("Description must be 300 characters or less")
  //     isValid = false
  //   } else {
  //     setDescriptionError("")
  //   }

  //   // Validate image URL
  //   if (!imageUrl.trim() || !urlPattern.test(imageUrl)) {
  //     setImageUrlError("Please enter a valid URL for the image")
  //     isValid = false
  //   } else {
  //     setImageUrlError("")
  //   }

  //   // Validate industry
  //   if (!industry.trim()) {
  //     setIndustryError("Industry is required")
  //     isValid = false
  //   } else {
  //     setIndustryError("")
  //   }

  //   return isValid
  // }

  const validateForm = () => {
    // Clear previous errors first
    setTitleError("")
    setDescriptionError("")
    setImageUrlError("")
    setIndustryError("")

    let isValid = true

    // Validate title - simple length check
    if (!title.trim()) {
      setTitleError("Title is required")
      isValid = false
    } else if (title.length > 28) {
      setTitleError("Title must be 28 characters or less")
      isValid = false
    }

    // Validate description - simple length check
    if (!description.trim()) {
      setDescriptionError("Description is required")
      isValid = false
    } else if (description.length > 300) {
      setDescriptionError("Description must be 300 characters or less")
      isValid = false
    }

    // Validate image URL - simplified check
    if (!imageUrl.trim()) {
      setImageUrlError("Image URL is required")
      isValid = false
    } else if (!imageUrl.includes(".")) {
      setImageUrlError("Please enter a valid URL")
      isValid = false
    }

    // Validate industry - simple presence check
    if (!industry.trim()) {
      setIndustryError("Industry is required")
      isValid = false
    }

    return isValid
  }


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    setFormError("");
  
    const projectData = {
      title,
      description,
      // Do not manually set P_id here – backend will generate it
      icon: getCategoryIconName(category), // Assuming you use the category name as icon value; double-check if this is your intended behavior
      imageUrl,
      industry,
      category,
      tasks,
      stats,
      tools,
      technologies,
    };
  
    console.log("Submitting project:", projectData);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add project");
      }
  
      toast.success("Project added successfully", {
        description: "The project has been added to your portfolio.",
      });
  
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      setFormError(error instanceof Error ? error.message : "Unknown error");
      toast.error("Failed to add project", {
        description: "Please check your inputs and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;
  //   setIsSubmitting(true)
  //   setFormError("")
  //   console.log(title);
  //   console.log(description);
  //   console.log(category);
  //   console.log("icon:",category);
  //   console.log(industry);
  //   console.log(tasks);
  //   console.log(stats);
  //   console.log(tools);
  //   console.log(technologies);
    
  //   setIsSubmitting(false)
  // }

  // Handle project deletion
  const handleDelete = async (id: string) => {
    try {
      setLoadingProjectId(id)

      const response = await fetch("/api/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ P_id: id }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to delete project")
      }

      toast.success("Project deleted", {
        description: "The project has been removed from your portfolio.",
      })

      fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Failed to delete project", {
        description: "Please try again later.",
      })
    } finally {
      setLoadingProjectId(null)
    }
  }

  // Array field handlers
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()])
      setNewTask("")
    }
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const addStat = () => {
    if (newStat.trim()) {
      setStats([...stats, newStat.trim()])
      setNewStat("")
    }
  }

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }

  const addTool = () => {
    if (newTool.trim()) {
      setTools([...tools, newTool.trim()])
      setNewTool("")
    }
  }

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index))
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setTechnologies([...technologies, newTechnology.trim()])
      setNewTechnology("")
    }
  }

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }

  // Handle Enter key press in array input fields
  const handleKeyDown = (e: React.KeyboardEvent, addFunction: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addFunction()
    }
  }

  return (
    <div className="space-y-6">
      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Projects</CardTitle>
          <CardDescription>Manage your portfolio projects</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-gray-500">No projects found. Add your first project below.</p>
            </div>
          ) : (
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Industry</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => {
                    const IconComponent = getCategoryIcon(project.category)
                    return (
                      <TableRow key={project.P_id}>
                        <TableCell>
                          <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={project.imageUrl || "/placeholder.svg"}
                              alt={project.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{project.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{project.industry}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-50"
                            onClick={() => handleDelete(project.P_id)}
                            disabled={loadingProjectId === project.P_id}
                          >
                            {loadingProjectId === project.P_id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-red-500" />
                            )}
                            <span className="sr-only">Delete project</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Project Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>Add a new project to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Category */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="E-Commerce Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={28}
                  disabled={isSubmitting}
                />
                <div className="flex justify-between">
                  {titleError && <p className="text-sm text-red-500">{titleError}</p>}
                  <p className="text-xs text-gray-500">{title.length}/28 characters</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => {
                      const IconComponent = getCategoryIcon(option)
                      return (
                        <SelectItem key={option} value={option}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{option}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Retail, Healthcare, Finance, etc."
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={isSubmitting}
              />
              {industryError && <p className="text-sm text-red-500">{industryError}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the project..."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
                disabled={isSubmitting}
              />
              <div className="flex justify-between">
                {descriptionError && <p className="text-sm text-red-500">{descriptionError}</p>}
                <p className="text-xs text-gray-500">{description.length}/300 characters</p>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Project Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={isSubmitting}
              />
              {imageUrlError && <p className="text-sm text-red-500">{imageUrlError}</p>}
            </div>

            {/* Tasks */}
            <div>
              <Label>Tasks</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tasks.map((task, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                    {task}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 text-gray-500 hover:text-gray-900"
                      onClick={() => removeTask(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Add a task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addTask)}
                  disabled={isSubmitting}
                />
                <Button type="button" onClick={addTask} size="sm" disabled={isSubmitting}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div>
              <Label>Stats</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {stats.map((stat, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                    {stat}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 text-gray-500 hover:text-gray-900"
                      onClick={() => removeStat(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Add a stat"
                  value={newStat}
                  onChange={(e) => setNewStat(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addStat)}
                  disabled={isSubmitting}
                />
                <Button type="button" onClick={addStat} size="sm" disabled={isSubmitting}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tools */}
            <div>
              <Label>Tools</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                    {tool}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 text-gray-500 hover:text-gray-900"
                      onClick={() => removeTool(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Add a tool"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addTool)}
                  disabled={isSubmitting}
                />
                <Button type="button" onClick={addTool} size="sm" disabled={isSubmitting}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <Label>Technologies</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                    {tech}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 text-gray-500 hover:text-gray-900"
                      onClick={() => removeTechnology(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Add a technology"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addTechnology)}
                  disabled={isSubmitting}
                />
                <Button type="button" onClick={addTechnology} size="sm" disabled={isSubmitting}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Add Project"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isSubmitting}
                className="border-gray-300 hover:bg-gray-50"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
