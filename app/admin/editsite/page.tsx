"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, Briefcase, Phone } from "lucide-react"

import PartnersSection from "@/components/adminsections/addPartners"
import TestimonialsSection from "@/components/adminsections/addTestimonials"
import ProjectsSection from "@/components/adminsections/addProjects"
import ContactSection from "@/components/adminsections/editContactInfo"
import AdminSidebar from "@/components/adminsections/AdminSidebar"

export default function EditSitePage() {
  const [activeTab, setActiveTab] = useState("partners")

  const editSiteContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-equigle-800">Edit Site Content</h1>
      </div>

      <Card className="border-equigle-200">
        <CardHeader>
          <CardTitle className="text-equigle-800">Site Management</CardTitle>
          <CardDescription>
            Update your website content including partners, testimonials, projects, and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-equigle-100">
              <TabsTrigger
                value="partners"
                className="flex items-center gap-2 data-[state=active]:bg-equigle-600 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Partners</span>
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="flex items-center gap-2 data-[state=active]:bg-equigle-600 data-[state=active]:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Testimonials</span>
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="flex items-center gap-2 data-[state=active]:bg-equigle-600 data-[state=active]:text-white"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="flex items-center gap-2 data-[state=active]:bg-equigle-600 data-[state=active]:text-white"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="partners" className="space-y-4">
              <PartnersSection />
            </TabsContent>
            <TabsContent value="testimonials" className="space-y-4">
              <TestimonialsSection />
            </TabsContent>
            <TabsContent value="projects" className="space-y-4">
              <ProjectsSection />
            </TabsContent>
            <TabsContent value="contact" className="space-y-4">
              <ContactSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )

  return <AdminSidebar>{editSiteContent}</AdminSidebar>
}
