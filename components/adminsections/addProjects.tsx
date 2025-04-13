"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Trash2, Pencil, Loader2, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { iconNames, getIconComponent } from "@/utils/icon-utils"
import { toast } from "sonner"

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
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState<string>("Database")
  const [imageUrl, setImageUrl] = useState("")
  const [industry, setIndustry] = useState("")
  const [categoryType, setCategoryType] = useState<"ai" | "other">("ai")
  const [customCategory, setCustomCategory] = useState("")

  // Form validation errors
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [iconError, setIconError] = useState("")
  const [imageUrlError, setImageUrlError] = useState("")
  const [industryError, setIndustryError] = useState("")
  const [categoryError, setCategoryError] = useState("")

  // For handling array fields
  const [tasks, setTasks] = useState<string[]>([])
  const [stats, setStats] = useState<string[]>([])
  const [tools, setTools] = useState<string[]>([])
  const [technologies, setTechnologies] = useState<string[]>([])

  // For adding new items to arrays
  const [newTask, setNewTask] = useState("")
  const [newStat, setNewStat] = useState("")
  const [newTool, setNewTool] = useState("")
  const [newTechnology, setNewTechnology] = useState("")

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
      setError("Failed to load projects. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setIcon("Database")
    setImageUrl("")
    setIndustry("")
    setCategoryType("ai")
    setCustomCategory("")
    setTasks([])
    setStats([])
    setTools([])
    setTechnologies([])
    setNewTask("")
    setNewStat("")
    setNewTool("")
    setNewTechnology("")
    setEditMode(false)
    setCurrentProjectId(null)

    // Clear errors
    setTitleError("")
    setDescriptionError("")
    setIconError("")
    setImageUrlError("")
    setIndustryError("")
    setCategoryError("")
  }

  const handleEdit = (project: Project) => {
    setEditMode(true)
    setCurrentProjectId(project.P_id)

    setTitle(project.title)
    setDescription(project.description)
    setIcon(project.icon)
    setImageUrl(project.imageUrl)
    setIndustry(project.industry)

    // Set category type based on project category
    if (project.category === "AI Agents") {
      setCategoryType("ai")
      setCustomCategory("")
    } else {
      setCategoryType("other")
      setCustomCategory(project.category)
    }

    setTasks(project.tasks || [])
    setStats(project.stats || [])
    setTools(project.tools || [])
    setTechnologies(project.technologies || [])
  }

  const validateForm = () => {
    let isValid = true
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

    // Validate title
    if (!title.trim()) {
      setTitleError("Title is required")
      isValid = false
    } else if (title.length > 28) {
      setTitleError("Title must be 28 characters or less")
      isValid = false
    } else {
      setTitleError("")
    }

    // Validate description
    if (!description.trim()) {
      setDescriptionError("Description is required")
      isValid = false
    } else if (description.length > 300) {
      setDescriptionError("Description must be 300 characters or less")
      isValid = false
    } else {
      setDescriptionError("")
    }

    // Validate icon
    if (!icon) {
      setIconError("Please select an icon")
      isValid = false
    } else {
      setIconError("")
    }

    // Validate image URL
    if (!imageUrl.trim() || !urlPattern.test(imageUrl)) {
      setImageUrlError("Please enter a valid URL for the image")
      isValid = false
    } else {
      setImageUrlError("")
    }

    // Validate industry
    if (!industry.trim() || industry.length < 2) {
      setIndustryError("Industry must be at least 2 characters")
      isValid = false
    } else {
      setIndustryError("")
    }

    // Validate category
    if (categoryType === "other" && (!customCategory.trim() || customCategory.length < 2)) {
      setCategoryError("Category must be at least 2 characters")
      isValid = false
    } else {
      setCategoryError("")
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const category = categoryType === "ai" ? "AI Agents" : customCategory

      const projectData = {
        title,
        description,
        icon,
        imageUrl,
        industry,
        category,
        tasks,
        stats,
        tools,
        technologies,
      }

      const url = editMode ? `/api/projects` : "/api/projects"
      const method = editMode ? "PUT" : "POST"
      const body = editMode ? JSON.stringify({ P_id: currentProjectId, ...projectData }) : JSON.stringify(projectData)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? "update" : "add"} project`)
      }

      toast.success(editMode ? "Project updated" : "Project added", {
        description: `The project has been ${editMode ? "updated" : "added"} successfully.`,
      })

      resetForm()
      fetchProjects()
    } catch (error) {
      console.error(`Error ${editMode ? "updating" : "adding"} project:`, error)
      setError(`Failed to ${editMode ? "update" : "add"} project. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ P_id: id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      toast.success("Project removed", {
        description: "The project has been removed successfully.",
      })

      fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Error", {
        description: "Failed to delete project. Please try again.",
      })
    }
  }

  // Array field handlers
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask.trim()])
      setNewTask("")
    }
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const addStat = () => {
    if (newStat.trim() !== "") {
      setStats([...stats, newStat.trim()])
      setNewStat("")
    }
  }

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }

  const addTool = () => {
    if (newTool.trim() !== "") {
      setTools([...tools, newTool.trim()])
      setNewTool("")
    }
  }

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index))
  }

  const addTechnology = () => {
    if (newTechnology.trim() !== "") {
      setTechnologies([...technologies, newTechnology.trim()])
      setNewTechnology("")
    }
  }

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Projects</CardTitle>
          <CardDescription>Manage your portfolio projects</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No projects found. Add your first project below.</p>
            </div>
          ) : (
            <div className="rounded-md border">
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
                  {projects.map((project) => (
                    <TableRow key={project.P_id}>
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-md border">
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
                      <TableCell className="hidden md:table-cell">{project.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{project.industry}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit project</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100"
                            onClick={() => handleDelete(project.P_id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete project</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{editMode ? "Edit Project" : "Add New Project"}</CardTitle>
          <CardDescription>
            {editMode ? "Update project details" : "Add a new project to your portfolio"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="E-Commerce Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={28}
                />
                <div className="flex justify-between">
                  {titleError && <p className="text-sm text-red-500">{titleError}</p>}
                  <p className="text-xs text-muted-foreground">{title.length}/28 characters</p>
                </div>
              </div>
              <div className="space-y-4">
                <Label>Category</Label>
                <RadioGroup value={categoryType} onValueChange={(value) => setCategoryType(value as "ai" | "other")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ai" id="ai" />
                    <Label htmlFor="ai">AI Agents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {categoryType === "other" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    />
                    {categoryError && <p className="text-sm text-red-500">{categoryError}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Retail"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              {industryError && <p className="text-sm text-red-500">{industryError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the project..."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
              />
              <div className="flex justify-between">
                {descriptionError && <p className="text-sm text-red-500">{descriptionError}</p>}
                <p className="text-xs text-muted-foreground">{description.length}/300 characters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="icon">Project Icon</Label>
                <Select value={icon} onValueChange={setIcon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconNames.map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {getIconComponent(iconName)}
                          <span>{iconName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {iconError && <p className="text-sm text-red-500">{iconError}</p>}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm">Selected Icon:</span>
                  {getIconComponent(icon)}
                  <span className="text-sm">{icon}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Project Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrlError && <p className="text-sm text-red-500">{imageUrlError}</p>}
              </div>
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
                      className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeTask(index)}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTask()
                    }
                  }}
                />
                <Button type="button" onClick={addTask} size="sm">
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
                      className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeStat(index)}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addStat()
                    }
                  }}
                />
                <Button type="button" onClick={addStat} size="sm">
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
                      className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeTool(index)}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTool()
                    }
                  }}
                />
                <Button type="button" onClick={addTool} size="sm">
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
                      className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeTechnology(index)}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTechnology()
                    }
                  }}
                />
                <Button type="button" onClick={addTechnology} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editMode ? "Update Project" : "Add Project"}
              </Button>
              {editMode && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
