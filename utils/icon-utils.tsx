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
  } from "lucide-react"
  
  export const iconComponents = {
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
    Code,
    PieChart,
    Cloud,
    Smartphone,
  }
  
  export const iconNames = Object.keys(iconComponents)
  
  export function getIconComponent(name: string) {
    const IconComponent = iconComponents[name as keyof typeof iconComponents]
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null
  }
  