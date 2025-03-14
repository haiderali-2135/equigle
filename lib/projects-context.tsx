// lib/agentContext.tsx

"use client";
import React, { createContext, JSX, useContext } from "react";
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
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  imageUrl: string;
  tasks: string[];
  stats: string[];
  tools: string[];
  technologies: string[];
  industry: string;
  category: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A fully responsive and modern e-commerce platform that offers a seamless shopping experience.",
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL"],
    icon: <Code className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1080&q=80",
    tasks: [
      "Develop a responsive front-end using Next.js and Tailwind CSS",
      "Implement a secure user authentication system",
      "Integrate payment gateways like Stripe and PayPal",
      "Manage inventory and order tracking",
    ],
    stats: [
      "Monthly Users: 10k+",
      "Conversion Rate: 15%",
      "Average Order Value: $50",
    ],
    industry: "E-Commerce",
    tools: ["VS Code", "Git", "Postman", "Docker"],
  },
  {
    id: 2,
    title: "Fitness Tracker App",
    category: "Mobile Apps",
    description:
      "A cross-platform mobile app to track workouts, monitor progress, and set fitness goals.",
    technologies: ["React Native", "Expo", "Firebase"],
    icon: <Smartphone className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1586281380322-4e47d9c70228?w=1080&q=80",
    tasks: [
      "Track workout routines and progress",
      "Set personal fitness goals",
      "Provide real-time health data integration",
      "Generate progress reports",
    ],
    stats: [
      "Active Users: 5k+",
      "Average Session Time: 25 mins",
      "Goal Completion Rate: 70%",
    ],
    industry: "Health & Fitness",
    tools: ["Android Studio", "Xcode", "Firebase", "Figma"],
  },
  {
    id: 3,
    title: "Business Analytics Dashboard",
    category: "Data Analytics",
    description:
      "A comprehensive dashboard that visualizes key business metrics and trends.",
    technologies: ["Django", "Plotly", "Pandas", "Dash"],
    icon: <BarChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1518933165971-611dbc9c412d?w=1080&q=80",
    tasks: [
      "Visualize sales and performance metrics",
      "Analyze business trends",
      "Generate automated business reports",
      "Provide real-time updates and alerts",
    ],
    stats: [
      "Data Accuracy: 99%",
      "Visualization Speed: 500ms",
      "Supported Formats: CSV, JSON",
    ],
    industry: "Data Analytics",
    tools: ["Python", "Jupyter Notebook", "Pandas", "Plotly"],
  },
  {
    id: 4,
    title: "Cloud File Storage System",
    category: "Cloud Solutions",
    description:
      "A secure and scalable cloud storage solution for managing and sharing files.",
    technologies: ["AWS S3", "Node.js", "MongoDB", "Docker"],
    icon: <Cloud className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1508385082359-fbb1845c1e82?w=1080&q=80",
    tasks: [
      "Enable secure file uploads and downloads",
      "Integrate real-time file synchronization",
      "Implement data encryption and backup",
      "Optimize file retrieval speed",
    ],
    stats: [
      "Storage Capacity: 5TB",
      "Upload Speed: 10MB/s",
      "Data Redundancy: 3 copies",
    ],
    industry: "Cloud computing ",
    tools: ["AWS CLI", "Docker", "MongoDB Atlas", "Kubernetes"],
  },
  {
    id: 5,
    title: "Inventory Management System",
    category: "Custom Software",
    industry: "Retail & Supply Chain",
    description:
      "A tailored solution to manage inventory efficiently with real-time updates.",
    technologies: ["Laravel", "MySQL", "Bootstrap"],
    icon: <PieChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=1080&q=80",
    tasks: [
      "Track stock levels and movements",
      "Generate inventory reports",
      "Send low-stock alerts",
      "Manage supplier information",
    ],
    stats: [
      "Accuracy: 98%",
      "Inventory Update Speed: Real-time",
      "Supported Formats: PDF, Excel",
    ],
    tools: ["PHP", "Bootstrap", "MySQL Workbench", "Composer"],
  },
  {
    id: 6,
    title: "Virtual Event Management Platform",
    category: "Web Development",
    industry: "Event Management",
    description:
      "A platform to organize, manage, and stream virtual events seamlessly.",
    technologies: ["React", "Next.js", "Socket.io", "PostgreSQL"],
    icon: <Code className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1581093588401-7f9d9070dbce?w=1080&q=80",
    tasks: [
      "Host live events with low latency",
      "Manage event registrations",
      "Streamline event scheduling",
      "Monitor engagement metrics",
    ],
    stats: [
      "Event Attendance Rate: 80%",
      "Latency: <500ms",
      "Supported Users: 1000+",
    ],
    tools: ["OBS Studio", "Socket.io", "PostgreSQL", "Next.js"],
  },
  {
    id: 7,
    title: "Smart Home Control App",
    category: "Mobile Apps",
    industry: "IoT & Smart Home",
    description:
      "Control smart home devices from your mobile with real-time updates and automation.",
    technologies: ["Flutter", "Dart", "IoT APIs", "AWS IoT"],
    icon: <Smartphone className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1573480745042-40e41929dc76?w=1080&q=80",
    tasks: [
      "Control smart home devices remotely",
      "Monitor device status in real-time",
      "Automate lighting and temperature",
      "Set schedules for device actions",
    ],
    stats: [
      "Device Response Time: 200ms",
      "Supported Devices: 50+",
      "Platform Integrations: 5",
    ],
    tools: ["AWS IoT", "Flutter", "Dart", "Firebase"],
  },
  {
    id: 8,
    title: "Financial Portfolio Manager",
    category: "Data Analytics",
    industry: "Finance",
    description:
      "A web app that helps users track their investments and analyze financial trends.",
    technologies: ["Python", "Flask", "Pandas", "Chart.js"],
    icon: <BarChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1080&q=80",
    tasks: [
      "Track investment portfolios",
      "Analyze financial trends and returns",
      "Visualize portfolio performance",
      "Generate automated reports",
    ],
    stats: [
      "Analysis Speed: 300ms",
      "Prediction Accuracy: 90%",
      "Supported Currencies: 20+",
    ],
    tools: ["Flask", "Pandas", "Chart.js", "SQLAlchemy"],
  },
  {
    id: 9,
    title: "Collaborative Whiteboard App",
    category: "Web Development",
    industry: "Collaboration & Productivity",
    description:
      "A real-time collaborative whiteboard for brainstorming and planning sessions.",
    technologies: ["React", "WebSockets", "Canvas API"],
    icon: <Code className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1080&q=80",
    tasks: [
      "Enable real-time drawing and sketching",
      "Support multiple users simultaneously",
      "Save and export whiteboard sessions",
      "Integrate with collaboration tools",
    ],
    stats: [
      "Real-Time Sync: 100ms",
      "Max Users: 50",
      "Supported File Types: PNG, PDF",
    ],
    tools: ["React", "WebSockets", "Canvas API", "Node.js"],
  },
  {
    id: 10,
    title: "Online Learning Platform",
    category: "Web Development",
    industry: "Collaboration & Productivity",
    description:
      "A platform for delivering online courses and managing student progress.",
    technologies: ["Next.js", "Firebase", "GraphQL", "Tailwind CSS"],
    icon: <Code className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1584697964190-a6b482c8e7d7?w=1080&q=80",
    tasks: [
      "Host interactive video lectures",
      "Track student progress and assessments",
      "Provide discussion forums",
      "Offer certification for completed courses",
    ],
    stats: [
      "Active Users: 5k+",
      "Course Completion Rate: 80%",
      "Supported Languages: 10",
    ],
    tools: ["Firebase", "GraphQL", "Next.js", "Tailwind CSS"],
  },
  {
    id: 11,
    title: "Remote Team Collaboration Tool",
    category: "Web Development",
    industry: "Data Analytics",
    description:
      "A web-based collaboration tool for remote teams to manage projects and communicate.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    icon: <Code className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1581093588401-7f9d9070dbce?w=1080&q=80",
    tasks: [
      "Organize tasks and projects",
      "Enable real-time chat and file sharing",
      "Track project progress with dashboards",
      "Integrate with third-party productivity tools",
    ],
    stats: [
      "User Satisfaction: 95%",
      "Task Completion Rate: 85%",
      "Daily Active Users: 3k+",
    ],
    tools: ["React", "Socket.io", "PostgreSQL", "Node.js"],
  },
  {
    id: 12,
    title: "Social Media Sentiment Analyzer",
    category: "Data Analytics",
    industry: "Media & Entertainment",
    description:
      "Analyze and visualize public sentiment on social media using AI-driven analytics.",
    technologies: ["Python", "NLTK", "TensorFlow", "Django"],
    icon: <BarChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1080&q=80",
    tasks: [
      "Scrape data from social media platforms",
      "Analyze sentiment using NLP techniques",
      "Generate sentiment trends and reports",
      "Visualize data in interactive charts",
    ],
    stats: [
      "Sentiment Accuracy: 90%",
      "Data Processing Speed: 2000 tweets/min",
      "Supported Platforms: 5",
    ],
    tools: ["NLTK", "Django", "TensorFlow", "Matplotlib"],
  },
  {
    id: 13,
    title: "Video Streaming Platform",
    category: "Web Development",
    industry: "Virtual Reality",
    description:
      "A scalable video streaming platform for hosting and streaming HD videos.",
    technologies: ["React", "Node.js", "FFmpeg", "AWS"],
    icon: <Code className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1080&q=80",
    tasks: [
      "Stream high-quality videos with low latency",
      "Support live streaming and on-demand playback",
      "Implement video transcoding for different formats",
      "Enable user-generated content uploads",
    ],
    stats: [
      "Streaming Latency: <1 second",
      "Supported Formats: MP4, MKV, FLV",
      "Concurrent Viewers: 10k+",
    ],
    tools: ["FFmpeg", "AWS CloudFront", "React", "Node.js"],
  },
  {
    id: 14,
    title: "Virtual Reality Tour App",
    category: "Mobile Apps",
    industry: "Image Processing",
    description:
      "A VR application to explore virtual tours of landmarks and famous places.",
    technologies: ["Unity", "C#", "Oculus SDK", "Google VR"],
    icon: <Smartphone className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1080&q=80",
    tasks: [
      "Develop immersive VR experiences",
      "Provide interactive features for guided tours",
      "Support offline mode for pre-downloaded tours",
      "Integrate with VR hardware for enhanced experience",
    ],
    stats: [
      "Supported VR Devices: 5",
      "Rendering Speed: 60 FPS",
      "Content Library: 50+ locations",
    ],
    tools: ["Unity", "Oculus SDK", "Blender", "C#"],
  },
  {
    id: 15,
    title: "Image Processing Pipeline",
    category: "Data Analytics",
    industry: "Human Resources",
    description:
      "An automated pipeline to process and enhance image quality for various applications.",
    technologies: ["Python", "OpenCV", "NumPy", "PyTorch"],
    icon: <BarChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1080&q=80",
    tasks: [
      "Remove noise and enhance image clarity",
      "Detect and annotate objects",
      "Generate processed outputs in multiple formats",
      "Integrate with cloud storage for image archiving",
    ],
    stats: [
      "Processing Speed: 100 images/min",
      "Accuracy: 97%",
      "Supported Formats: JPEG, PNG, BMP",
    ],
    tools: ["OpenCV", "PyTorch", "AWS S3", "Python"],
  },
  {
    id: 16,
    title: "Employee Management System",
    category: "Custom Software",
    industry: "Agriculture & Environment",
    description:
      "A comprehensive system to manage employee records, payroll, and performance.",
    technologies: ["Spring Boot", "MySQL", "Thymeleaf", "Docker"],
    icon: <PieChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=1080&q=80",
    tasks: [
      "Maintain employee records and profiles",
      "Automate payroll and attendance tracking",
      "Generate performance reports",
      "Monitor employee engagement metrics",
    ],
    stats: [
      "Employee Records: 1k+",
      "Payroll Processing Speed: 2s/record",
      "Report Generation Time: 1s",
    ],
    tools: ["Spring Boot", "MySQL", "Docker", "Thymeleaf"],
  },
  {
    id: 17,
    title: "Research Agent",
    category: "AI Agents",
    industry: "Data Analytics",
    description:
      "An intelligent agent that gathers and analyzes information from multiple sources to provide insights.",
    technologies: ["Python", "BeautifulSoup", "Selenium", "Pandas"],
    icon: <Search className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Collect data from multiple online sources",
      "Perform sentiment analysis",
      "Generate reports from gathered data",
      "Identify emerging trends",
    ],
    stats: [
      "Data collection speed: 500 requests/min",
      "Accuracy: 92%",
      "Sources monitored: 50+",
    ],
    tools: ["Python", "BeautifulSoup", "Selenium", "Pandas"],
  },
  {
    id: 18,
    title: "Customer Service Agent",
    category: "AI Agents",
    industry: "Customer Support",
    description:
      "Handles customer inquiries and provides 24/7 support through intelligent response generation.",
    technologies: ["Chatbots", "Zendesk", "Twilio", "Dialogflow"],
    icon: <MessageSquare className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Respond to customer queries",
      "Generate response tickets",
      "Provide real-time support",
      "Analyze customer feedback",
    ],
    stats: [
      "Response time: 2 seconds",
      "Customer satisfaction: 95%",
      "Support languages: 12",
    ],
    tools: ["Chatbots", "Zendesk", "Twilio", "Dialogflow"],
  },
  {
    id: 19,
    title: "Data Processing Agent",
    category: "AI Agents",
    industry: "Data Analytics",
    description:
      "Organizes and analyzes complex datasets for actionable insights.",
    technologies: ["SQL", "Excel", "Python", "R"],
    icon: <Database className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Clean and preprocess raw data",
      "Perform statistical analysis",
      "Generate data visualizations",
      "Export processed data in various formats",
    ],
    stats: [
      "Data throughput: 10GB/hour",
      "Accuracy: 98%",
      "Data formats supported: CSV, JSON, SQL",
    ],
    tools: ["SQL", "Excel", "Python", "R"],
  },
  {
    id: 20,
    title: "Scheduling Agent",
    category: "AI Agents",
    industry: "Productivity",
    description: "Manages calendars and coordinates meetings efficiently.",
    technologies: ["Google Calendar API", "Microsoft Graph", "Calendly"],
    icon: <Calendar className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Automate meeting scheduling",
      "Send calendar invites",
      "Sync across multiple platforms",
      "Send reminders to participants",
    ],
    stats: [
      "Scheduling accuracy: 99%",
      "Average booking time: 1 second",
      "Platform integrations: 8",
    ],
    tools: ["Google Calendar API", "Microsoft Graph", "Calendly"],
  },
  {
    id: 21,
    title: "Content Creation Agent",
    category: "AI Agents",
    industry: "Content Marketing",
    description:
      "Generates and optimizes content for various platforms to maximize engagement.",
    technologies: ["GPT-4", "Hemingway", "Grammarly", "Canva"],
    icon: <FileText className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Generate articles and blogs",
      "Create social media content",
      "Perform keyword optimization",
      "Generate content summaries",
    ],
    stats: [
      "Content generation speed: 500 words/min",
      "Grammar accuracy: 98%",
      "Keyword optimization rate: 95%",
    ],
    tools: ["GPT-4", "Hemingway", "Grammarly", "Canva"],
  },
  {
    id: 22,
    title: "Analytics Agent",
    category: "AI Agents",
    industry: "Business Intelligence",
    description:
      "Provides insights and visualizations from data to support decision-making.",
    technologies: ["Tableau", "Power BI", "Matplotlib", "D3.js"],
    icon: <BarChart className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Analyze sales and performance metrics",
      "Generate data visualizations",
      "Provide trend forecasts",
      "Create interactive dashboards",
    ],
    stats: [
      "Visualization accuracy: 99%",
      "Dashboard response time: 200ms",
      "Supported formats: JSON, CSV, XLSX",
    ],
    tools: ["Tableau", "Power BI", "Matplotlib", "D3.js"],
  },
  {
    id: 23,
    title: "Automation Agent",
    category: "AI Agents",
    industry: "Operations",
    description: "Streamlines workflows and automates repetitive tasks.",
    technologies: ["Node.js", "Python", "Bash", "AutoHotkey"],
    icon: <Cog className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Automate data entry",
      "Perform file backups",
      "Monitor system performance",
      "Trigger automated actions",
    ],
    stats: [
      "Task automation rate: 98%",
      "Script execution time: 500ms",
      "Error rate: 0.5%",
    ],
    tools: ["Node.js", "Python", "Bash", "AutoHotkey"],
  },
  {
    id: 24,
    title: "Learning Agent",
    category: "AI Agents",
    industry: "Education",
    description: "Adapts and improves by learning from new data.",
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn"],
    icon: <BookOpen className="h-8 w-8 text-white mb-2" />,
    imageUrl:
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop",
    tasks: [
      "Continuously learn from data",
      "Fine-tune existing models",
      "Incorporate user feedback",
      "Provide adaptive responses",
    ],
    stats: [
      "Model accuracy: 96%",
      "Training time: 2 hours",
      "Data update frequency: Daily",
    ],
    tools: ["TensorFlow", "PyTorch", "Scikit-learn"],
  },
];

// Create context
const ProjectContext = createContext<Project[]>(projectsData);

// Create a custom hook to use the context
export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ProjectContext.Provider value={projectsData}>
      {children}
    </ProjectContext.Provider>
  );
};
