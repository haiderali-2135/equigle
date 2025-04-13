'use client'
import React from 'react'
import Link from "next/link"
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
function AdminSidebar() {
  return (
    <SidebarProvider>
    <div className="flex min-h-screen">
      <Sidebar variant="sidebar" collapsible="icon" className="bg-gray-900 text-white">
        <SidebarHeader className="flex items-center border-b border-gray-700 px-4 py-2">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="rounded-full bg-white p-1">
              <Home className="h-5 w-5 text-gray-700" />
            </div>
            <span className="font-semibold text-white">Equigle Admin</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                <Link href="/admin" className="hover:bg-gray-800 data-[active=true]:bg-gray-800">
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin/messages"}>
                <Link href="/admin/messages" className="hover:bg-gray-800 data-[active=true]:bg-gray-800">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/editsite")}>
                <Link href="/admin/editsite" className="hover:bg-gray-800 data-[active=true]:bg-gray-800">
                  <Settings className="h-5 w-5" />
                  <span>Edit Site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-gray-700 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/api/auth/adminLogout" className="hover:bg-gray-800">
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

export default AdminSidebar
