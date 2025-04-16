"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, MessageSquare, Settings, LogOut, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

import "./admin.css"

interface AdminSidebarProps {
  children: React.ReactNode
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="sidebar" collapsible="icon" className="bg-gray-50 text-gray-900">
          <SidebarHeader className="flex items-center border-b border-gray-200 px-4 py-2">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-1">
                <Home className="h-5 w-5 text-purple-600" />
              </div>
              <span className="font-semibold text-gray-900">Equigle Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                  <Link
                    href="/admin"
                    className="hover:bg-purple-100 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/messages"}>
                  <Link
                    href="/admin/messages"
                    className="hover:bg-purple-100 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/editsite")}>
                  <Link
                    href="/admin/editsite"
                    className="hover:bg-purple-100 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Edit Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/api/auth/adminLogout" className="hover:bg-purple-100 hover:text-purple-700">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
