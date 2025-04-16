"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Trash2, Loader2, User } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Testimonial {
  T_id: string
  name: string
  company: string
  review: string
  imageUrl: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [review, setReview] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  // Form validation errors
  const [nameError, setNameError] = useState("")
  const [companyError, setCompanyError] = useState("")
  const [reviewError, setReviewError] = useState("")
  const [imageUrlError, setImageUrlError] = useState("")

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/testimonials")
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials")
      }
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      setError("Failed to load testimonials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
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

    // Validate company
    if (!company.trim() || company.length < 2) {
      setCompanyError("Company must be at least 2 characters")
      isValid = false
    } else {
      setCompanyError("")
    }

    // Validate review
    if (!review.trim() || review.length < 10) {
      setReviewError("Review must be at least 10 characters")
      isValid = false
    } else {
      setReviewError("")
    }

    // Validate imageUrl
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    if (!imageUrl.trim() || !urlPattern.test(imageUrl)) {
      setImageUrlError("Please enter a valid URL for the image")
      isValid = false
    } else {
      setImageUrlError("")
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

      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          review,
          imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add testimonial")
      }

      toast.success("Testimonial added", {
        description: "The testimonial has been added successfully.",
      })

      // Reset form
      setName("")
      setCompany("")
      setReview("")
      setImageUrl("")
      fetchTestimonials()
    } catch (error) {
      console.error("Error adding testimonial:", error)
      setError("Failed to add testimonial. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ T_id: id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete testimonial")
      }

      toast.success("Testimonial removed", {
        description: "The testimonial has been removed successfully.",
      })

      fetchTestimonials()
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast.error("Error", {
        description: "Failed to delete testimonial. Please try again.",
      })
    }
  }

  const handleViewTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Testimonials</CardTitle>
          <CardDescription>Manage customer testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No testimonials found. Add your first testimonial below.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="hidden md:table-cell">Review</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.T_id}>
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-full border">
                          <img
                            src={testimonial.imageUrl || "/placeholder.svg"}
                            alt={`${testimonial.name}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{testimonial.name}</TableCell>
                      <TableCell>{testimonial.company}</TableCell>
                      <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                        {testimonial.review}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewTestimonial(testimonial)}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View testimonial</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100"
                            onClick={() => handleDelete(testimonial.T_id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete testimonial</span>
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
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Add a new customer testimonial to your website</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                {nameError && <p className="text-sm text-red-500">{nameError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                {companyError && <p className="text-sm text-red-500">{companyError}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrlError && <p className="text-sm text-red-500">{imageUrlError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="review">Testimonial</Label>
              <Textarea
                id="review"
                placeholder="Write the testimonial here..."
                className="min-h-[100px]"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              {reviewError && <p className="text-sm text-red-500">{reviewError}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Testimonial
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Testimonial</DialogTitle>
            <DialogDescription>View the complete testimonial</DialogDescription>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full border">
                  <img
                    src={selectedTestimonial.imageUrl || "/placeholder.svg"}
                    alt={selectedTestimonial.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedTestimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTestimonial.company}</p>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="italic">"{selectedTestimonial.review}"</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
