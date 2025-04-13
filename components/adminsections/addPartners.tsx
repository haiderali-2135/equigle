"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Trash2, Loader2, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

interface Partner {
  P_id: string
  name: string
  logo: string
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [name, setName] = useState("")
  const [logo, setLogo] = useState("")
  const [nameError, setNameError] = useState("")
  const [logoError, setLogoError] = useState("")

  const fetchPartners = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/partners")
      if (!response.ok) {
        throw new Error("Failed to fetch partners")
      }
      const data = await response.json()
      setPartners(data)
    } catch (error) {
      console.error("Error fetching partners:", error)
      setError("Failed to load partners. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const validateForm = () => {
    let isValid = true

    // Validate name
    if (!name.trim() || name.length < 2) {
      setNameError("Name must be at least 2 characters")
      isValid = false
    } else {
      setNameError("")
    }

    // Validate logo URL
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    if (!logo.trim() || !urlPattern.test(logo)) {
      setLogoError("Please enter a valid URL for the logo")
      isValid = false
    } else {
      setLogoError("")
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

      const response = await fetch("/api/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          logo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add partner")
      }

      toast.success("Partner added", {
        description: "The partner has been added successfully.",
      })

      // Reset form
      setName("")
      setLogo("")
      fetchPartners()
    } catch (error) {
      console.error("Error adding partner:", error)
      setError("Failed to add partner. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/partners`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ P_id: id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete partner")
      }

      toast.success("Partner removed", {
        description: "The partner has been removed successfully.",
      })

      fetchPartners()
    } catch (error) {
      console.error("Error deleting partner:", error)
      toast.error("Error", {
        description: "Failed to delete partner. Please try again.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Partners</CardTitle>
          <CardDescription>Manage your company partners</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : partners.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No partners found. Add your first partner below.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.P_id}>
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-md border">
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => window.open(partner.logo, "_blank")}>
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View logo</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100"
                            onClick={() => handleDelete(partner.P_id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete partner</span>
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
          <CardTitle>Add New Partner</CardTitle>
          <CardDescription>Add a new partner to your website</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Partner Name</Label>
              <Input
                id="name"
                placeholder="Enter partner name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="text-sm text-red-500">{nameError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                placeholder="https://example.com/logo.png"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
              {logoError && <p className="text-sm text-red-500">{logoError}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-equigle-600 hover:bg-equigle-700 text-white">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Partner
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
