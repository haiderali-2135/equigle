"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2, Mail, Phone, MapPin, Globe, Linkedin, Instagram, Twitter, Pencil, Check, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ContactInfo {
  C_id: string
  email: string
  email_link: string
  ph_number: string
  whatsapp_link: string
  linkedin_link: string
  instagram_link: string
  twitter_link: string
  address: string
  developer_link: string
}

type FieldName = keyof Omit<ContactInfo, "C_id">

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Track which fields are being edited
  const [editingFields, setEditingFields] = useState<Record<FieldName, boolean>>({
    email: false,
    email_link: false,
    ph_number: false,
    whatsapp_link: false,
    linkedin_link: false,
    instagram_link: false,
    twitter_link: false,
    address: false,
    developer_link: false,
  })

  // Form state
  const [formValues, setFormValues] = useState<Record<FieldName, string>>({
    email: "",
    email_link: "",
    ph_number: "",
    whatsapp_link: "",
    linkedin_link: "",
    instagram_link: "",
    twitter_link: "",
    address: "",
    developer_link: "",
  })

  // Original values (for canceling edits)
  const [originalValues, setOriginalValues] = useState<Record<FieldName, string>>({
    email: "",
    email_link: "",
    ph_number: "",
    whatsapp_link: "",
    linkedin_link: "",
    instagram_link: "",
    twitter_link: "",
    address: "",
    developer_link: "",
  })

  // Form validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<FieldName, string>>({
    email: "",
    email_link: "",
    ph_number: "",
    whatsapp_link: "",
    linkedin_link: "",
    instagram_link: "",
    twitter_link: "",
    address: "",
    developer_link: "",
  })

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/contact")
      if (!response.ok) {
        throw new Error("Failed to fetch contact information")
      }
      const { data } = await response.json()

      if (data) {
        setContactInfo(data)

        // Set form values and original values
        const values = {
          email: data.email || "",
          email_link: data.email_link || "",
          ph_number: data.ph_number || "",
          whatsapp_link: data.whatsapp_link || "",
          linkedin_link: data.linkedin_link || "",
          instagram_link: data.instagram_link || "",
          twitter_link: data.twitter_link || "",
          address: data.address || "",
          developer_link: data.developer_link || "",
        }

        setFormValues(values)
        setOriginalValues(values)
      }
    } catch (error) {
      console.error("Error fetching contact information:", error)
      setError("Failed to load contact information. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const validateField = (field: FieldName, value: string): string => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    switch (field) {
      case "email":
        return !value.trim() || !emailPattern.test(value) ? "Please enter a valid email" : ""
      case "whatsapp_link":
      case "linkedin_link":
      case "instagram_link":
      case "twitter_link":
      case "developer_link":
        return !value.trim() || !urlPattern.test(value) ? "Please enter a valid URL" : ""
      case "ph_number":
        return !value.trim() || value.length < 5 ? "Please enter a valid phone number" : ""
      case "address":
        return !value.trim() || value.length < 5 ? "Address must be at least 5 characters" : ""
      default:
        return ""
    }
  }

  const handleEditField = (field: FieldName) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: true,
    }))
  }

  const handleCancelEdit = (field: FieldName) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: false,
    }))

    // Reset to original value
    setFormValues((prev) => ({
      ...prev,
      [field]: originalValues[field],
    }))

    // Clear error
    setFieldErrors((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  const handleFieldChange = (field: FieldName, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveField = async (field: FieldName) => {
    // Validate the field
    const error = validateField(field, formValues[field])

    if (error) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: error,
      }))
      return
    }

    try {
      setIsSubmitting(true)
      setFieldErrors((prev) => ({
        ...prev,
        [field]: "",
      }))

      if (!contactInfo) {
        throw new Error("No contact information found to update")
      }

      // Prepare data for update - only update the specific field
      const updateData = {
        C_id: contactInfo.C_id,
        [field]: formValues[field],
      }

      const response = await fetch(`/api/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error(`Failed to update ${field.replace("_", " ")}`)
      }

      toast.success("Field updated", {
        description: `${field.replace("_", " ")} has been updated successfully.`,
      })

      // Update original value
      setOriginalValues((prev) => ({
        ...prev,
        [field]: formValues[field],
      }))

      // Exit edit mode
      setEditingFields((prev) => ({
        ...prev,
        [field]: false,
      }))
    } catch (error) {
      console.error(`Error updating ${field}:`, error)
      setFieldErrors((prev) => ({
        ...prev,
        [field]: `Failed to update ${field.replace("_", " ")}`,
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to render a field with its edit controls
  const renderField = (field: FieldName, label: string, placeholder: string, icon?: React.ReactNode) => {
    const isEditing = editingFields[field]
    const value = formValues[field]
    const error = fieldErrors[field]

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={field} className="flex items-center gap-2">
            {icon && icon}
            {label}
          </Label>
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-green-600"
                  onClick={() => handleSaveField(field)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-red-600"
                  onClick={() => handleCancelEdit(field)}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900"
                onClick={() => handleEditField(field)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="relative">
          <Input
            id={field}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            disabled={!isEditing}
            className="border-gray-200 focus-visible:ring-purple-500"
          />
          {field === "address" && isEditing && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">{value.length} characters</div>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Contact Information</CardTitle>
          <CardDescription>Manage your contact details displayed on the website</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {renderField(
                    "email",
                    "Email Address",
                    "contact@example.com",
                    <Mail className="h-4 w-4 text-purple-600" />,
                  )}
                  {renderField("email_link", "Email Link", "mailto:contact@example.com")}
                  {renderField(
                    "ph_number",
                    "Phone Number",
                    "+1 (555) 123-4567",
                    <Phone className="h-4 w-4 text-purple-600" />,
                  )}
                  {renderField("whatsapp_link", "WhatsApp Link", "https://wa.me/15551234567")}
                  {renderField(
                    "address",
                    "Address",
                    "123 Main St, City, Country",
                    <MapPin className="h-4 w-4 text-purple-600" />,
                  )}
                </div>

                <div className="space-y-4">
                  {renderField(
                    "linkedin_link",
                    "LinkedIn",
                    "https://linkedin.com/company/example",
                    <Linkedin className="h-4 w-4 text-purple-600" />,
                  )}
                  {renderField(
                    "instagram_link",
                    "Instagram",
                    "https://instagram.com/example",
                    <Instagram className="h-4 w-4 text-purple-600" />,
                  )}
                  {renderField(
                    "twitter_link",
                    "Twitter",
                    "https://twitter.com/example",
                    <Twitter className="h-4 w-4 text-purple-600" />,
                  )}
                  {renderField(
                    "developer_link",
                    "Developer Website",
                    "https://developer.example.com",
                    <Globe className="h-4 w-4 text-purple-600" />,
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    // Enable editing for all fields
                    const allFields: Record<FieldName, boolean> = {
                      email: true,
                      email_link: true,
                      ph_number: true,
                      whatsapp_link: true,
                      linkedin_link: true,
                      instagram_link: true,
                      twitter_link: true,
                      address: true,
                      developer_link: true,
                    }
                    setEditingFields(allFields)
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Edit All Fields
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Reset all fields to original values and exit edit mode
                    setFormValues(originalValues)
                    setEditingFields({
                      email: false,
                      email_link: false,
                      ph_number: false,
                      whatsapp_link: false,
                      linkedin_link: false,
                      instagram_link: false,
                      twitter_link: false,
                      address: false,
                      developer_link: false,
                    })
                    setFieldErrors({
                      email: "",
                      email_link: "",
                      ph_number: "",
                      whatsapp_link: "",
                      linkedin_link: "",
                      instagram_link: "",
                      twitter_link: "",
                      address: "",
                      developer_link: "",
                    })
                  }}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Cancel All Edits
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
