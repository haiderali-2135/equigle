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
  Code,
  PieChart,
  Cloud,
  Smartphone,
  Trash2,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Instagram,
  Twitter,
  Plus,
  X,
} from "lucide-react"
import type { ReactNode } from "react"

// List of allowed icon names
export const iconNames = [
  "Search",
  "MessageSquare",
  "Database",
  "Calendar",
  "FileText",
  "BarChart",
  "Cog",
  "BookOpen",
  "Activity",
  "Layers",
  "Code",
  "PieChart",
  "Cloud",
  "Smartphone",
] as const

// Type for icon names
export type IconName = (typeof iconNames)[number]

// Function to get icon component from name
export const getIconComponent = (iconName: string): ReactNode => {
  switch (iconName) {
    case "Search":
      return <Search className="h-4 w-4" />
    case "MessageSquare":
      return <MessageSquare className="h-4 w-4" />
    case "Database":
      return <Database className="h-4 w-4" />
    case "Calendar":
      return <Calendar className="h-4 w-4" />
    case "FileText":
      return <FileText className="h-4 w-4" />
    case "BarChart":
      return <BarChart className="h-4 w-4" />
    case "Cog":
      return <Cog className="h-4 w-4" />
    case "BookOpen":
      return <BookOpen className="h-4 w-4" />
    case "Activity":
      return <Activity className="h-4 w-4" />
    case "Layers":
      return <Layers className="h-4 w-4" />
    case "Code":
      return <Code className="h-4 w-4" />
    case "PieChart":
      return <PieChart className="h-4 w-4" />
    case "Cloud":
      return <Cloud className="h-4 w-4" />
    case "Smartphone":
      return <Smartphone className="h-4 w-4" />
    default:
      return <Database className="h-4 w-4" /> // Default icon
  }
}

// Additional utility icons for internal use
export const utilityIcons = {
  trash: <Trash2 className="h-4 w-4" />,
  loader: <Loader2 className="h-4 w-4 animate-spin" />,
  mail: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  mapPin: <MapPin className="h-4 w-4" />,
  globe: <Globe className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  plus: <Plus className="h-4 w-4" />,
  x: <X className="h-3 w-3" />,
}
