"use client"

import { useState, useEffect } from "react"
import { Search, Mail, MoreHorizontal } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AdminSidebar from "@/components/adminsections/AdminSidebar"

interface Message {
  M_id: string
  name: string
  email: string
  message: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/messages")
      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
  }

  const messagesContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-purple-800">Messages</h1>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Received Messages</CardTitle>
          <CardDescription>View and manage messages from your website visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-purple-500" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="text-center text-muted-foreground">Loading messages...</div>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <div className="text-center text-muted-foreground">
                {messages.length === 0 ? "No messages found." : "No messages match your search."}
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-purple-200">
              <Table>
                <TableHeader className="bg-purple-50">
                  <TableRow>
                    <TableHead className="w-[250px]">Sender</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow
                      key={message.M_id}
                      className="group cursor-pointer hover:bg-purple-50"
                      onClick={() => handleViewMessage(message)}
                    >
                      <TableCell className="font-medium">{message.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <a
                          href={`mailto:${message.email}`}
                          className="text-purple-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {message.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{message.message}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="hover:bg-purple-100 hover:text-purple-700">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewMessage(message)
                              }}
                              className="hover:bg-purple-50 hover:text-purple-700"
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `mailto:${message.email}`
                              }}
                              className="hover:bg-purple-50 hover:text-purple-700"
                            >
                              Reply via email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 hover:bg-red-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-purple-800">Message Details</DialogTitle>
            <DialogDescription>
              From {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-purple-50 p-4">
              <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-purple-300 hover:bg-purple-100 hover:text-purple-700"
                onClick={() => (window.location.href = `mailto:${selectedMessage?.email}`)}
              >
                <Mail className="h-4 w-4" />
                Reply via Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  return <AdminSidebar>{messagesContent}</AdminSidebar>
}
