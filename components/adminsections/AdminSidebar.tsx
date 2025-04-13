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
        <Sidebar variant="sidebar" collapsible="icon" className="bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="flex items-center border-b border-sidebar-border px-4 py-2">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="rounded-full bg-background p-1">
                <Home className="h-5 w-5 text-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">Equigle Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                  <Link
                    href="/admin"
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
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
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
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
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Edit Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/api/auth/adminLogout"
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
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
