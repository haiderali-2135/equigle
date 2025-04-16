import { MessageSquare, Code, Smartphone, BarChart, Cloud, PieChart, Cpu } from "lucide-react"

export const CATEGORY_OPTIONS = [
  "AI Agents",
  "Web Development",
  "Mobile Apps",
  "Data Analytics",
  "Cloud Solutions",
  "Custom Software",
] as const

export type ProjectCategory = (typeof CATEGORY_OPTIONS)[number]

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "AI Agents":
      return Cpu
    case "Web Development":
      return Code
    case "Mobile Apps":
      return Smartphone
    case "Data Analytics":
      return BarChart
    case "Cloud Solutions":
      return Cloud
    case "Custom Software":
      return PieChart
    default:
      return Code // Default icon
  }
}

// Add a new function to get the icon name from a category
export const getCategoryIconName = (category: string): string => {
  switch (category) {
    case "AI Agents":
      return "Cpu"
    case "Web Development":
      return "Code"
    case "Mobile Apps":
      return "Smartphone"
    case "Data Analytics":
      return "BarChart"
    case "Cloud Solutions":
      return "Cloud"
    case "Custom Software":
      return "PieChart"
    default:
      return "Code" // Default icon name
  }
}
