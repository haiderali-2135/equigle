"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, Mail, Phone, MapPin, Globe, Linkedin, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

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

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [email, setEmail] = useState("")
  const [emailLink, setEmailLink] = useState("")
  const [phNumber, setPhNumber] = useState("")
  const [whatsappLink, setWhatsappLink] = useState("")
  const [linkedinLink, setLinkedinLink] = useState("")
  const [instagramLink, setInstagramLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [address, setAddress] = useState("")
  const [developerLink, setDeveloperLink] = useState("")

  // Form validation errors
  const [emailError, setEmailError] = useState("")
  const [emailLinkError, setEmailLinkError] = useState("")
  const [phNumberError, setPhNumberError] = useState("")
  const [whatsappLinkError, setWhatsappLinkError] = useState("")
  const [linkedinLinkError, setLinkedinLinkError] = useState("")
  const [instagramLinkError, setInstagramLinkError] = useState("")
  const [twitterLinkError, setTwitterLinkError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [developerLinkError, setDeveloperLinkError] = useState("")

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/contact")
      if (!response.ok) {
        throw new Error("Failed to fetch contact information")
      }
      const data = await response.json()

      if (data && data.length > 0) {
        setContactInfo(data[0])

        // Set form values
        setEmail(data[0].email || "")
        setEmailLink(data[0].email_link || "")
        setPhNumber(data[0].ph_number || "")
        setWhatsappLink(data[0].whatsapp_link || "")
        setLinkedinLink(data[0].linkedin_link || "")
        setInstagramLink(data[0].instagram_link || "")
        setTwitterLink(data[0].twitter_link || "")
        setAddress(data[0].address || "")
        setDeveloperLink(data[0].developer_link || "")
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

  const validateForm = () => {
    let isValid = true
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate email
    if (!email.trim() || !emailPattern.test(email)) {
      setEmailError("Please enter a valid email")
      isValid = false
    } else {
      setEmailError("")
    }

    // Validate email link
    if (!emailLink.trim() || !urlPattern.test(emailLink)) {
      setEmailLinkError("Please enter a valid URL")
      isValid = false
    } else {
      setEmailLinkError("")
    }

    // Validate phone number
    if (!phNumber.trim() || phNumber.length < 5) {
      setPhNumberError("Please enter a valid phone number")
      isValid = false
    } else {
      setPhNumberError("")
    }

    // Validate WhatsApp link
    if (!whatsappLink.trim() || !urlPattern.test(whatsappLink)) {
      setWhatsappLinkError("Please enter a valid URL")
      isValid = false
    } else {
      setWhatsappLinkError("")
    }

    // Validate LinkedIn link
    if (!linkedinLink.trim() || !urlPattern.test(linkedinLink)) {
      setLinkedinLinkError("Please enter a valid URL")
      isValid = false
    } else {
      setLinkedinLinkError("")
    }

    // Validate Instagram link
    if (!instagramLink.trim() || !urlPattern.test(instagramLink)) {
      setInstagramLinkError("Please enter a valid URL")
      isValid = false
    } else {
      setInstagramLinkError("")
    }

    // Validate Twitter link
    if (!twitterLink.trim() || !urlPattern.test(twitterLink)) {
      setTwitterLinkError("Please enter a valid URL")
      isValid = false
    } else {
      setTwitterLinkError("")
    }

    // Validate address
    if (!address.trim() || address.length < 5) {
      setAddressError("Address must be at least 5 characters")
      isValid = false
    } else {
      setAddressError("")
    }

    // Validate developer link
    if (!developerLink.trim() || !urlPattern.test(developerLink)) {
      setDeveloperLinkError("Please enter a valid URL")
      isValid = false
    } else {
      setDeveloperLinkError("")
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

      const contactData = {
        email,
        email_link: emailLink,
        ph_number: phNumber,
        whatsapp_link: whatsappLink,
        linkedin_link: linkedinLink,
        instagram_link: instagramLink,
        twitter_link: twitterLink,
        address,
        developer_link: developerLink,
      }

      // Handle both update and create scenarios
      const url = contactInfo ? `/api/contact?id=${contactInfo.C_id}` : "/api/contact"

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        throw new Error("Failed to update contact information")
      }

      toast.success("Contact information updated", {
        description: "Your contact information has been updated successfully.",
      })

      setIsEditing(false)
      fetchContactInfo()
    } catch (error) {
      console.error("Error updating contact information:", error)
      setError("Failed to update contact information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)

    if (contactInfo) {
      // Reset form to original values
      setEmail(contactInfo.email || "")
      setEmailLink(contactInfo.email_link || "")
      setPhNumber(contactInfo.ph_number || "")
      setWhatsappLink(contactInfo.whatsapp_link || "")
      setLinkedinLink(contactInfo.linkedin_link || "")
      setInstagramLink(contactInfo.instagram_link || "")
      setTwitterLink(contactInfo.twitter_link || "")
      setAddress(contactInfo.address || "")
      setDeveloperLink(contactInfo.developer_link || "")

      // Clear errors
      setEmailError("")
      setEmailLinkError("")
      setPhNumberError("")
      setWhatsappLinkError("")
      setLinkedinLinkError("")
      setInstagramLinkError("")
      setTwitterLinkError("")
      setAddressError("")
      setDeveloperLinkError("")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-equigle-200">
        <CardHeader>
          <CardTitle className="text-equigle-800">Contact Information</CardTitle>
          <CardDescription>Manage your contact details displayed on the website</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-equigle-600" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-equigle-600" /> Email Address
                    </Label>
                    <Input
                      id="email"
                      placeholder="contact@equigle.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailLink">Email Link</Label>
                    <Input
                      id="emailLink"
                      placeholder="mailto:contact@equigle.com"
                      value={emailLink}
                      onChange={(e) => setEmailLink(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {emailLinkError && <p className="text-sm text-red-500">{emailLinkError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phNumber" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-equigle-600" /> Phone Number
                    </Label>
                    <Input
                      id="phNumber"
                      placeholder="+1 (555) 123-4567"
                      value={phNumber}
                      onChange={(e) => setPhNumber(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {phNumberError && <p className="text-sm text-red-500">{phNumberError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsappLink">WhatsApp Link</Label>
                    <Input
                      id="whatsappLink"
                      placeholder="https://wa.me/15551234567"
                      value={whatsappLink}
                      onChange={(e) => setWhatsappLink(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {whatsappLinkError && <p className="text-sm text-red-500">{whatsappLinkError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-equigle-600" /> Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, City, Country"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {addressError && <p className="text-sm text-red-500">{addressError}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinLink" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-equigle-600" /> LinkedIn
                    </Label>
                    <Input
                      id="linkedinLink"
                      placeholder="https://linkedin.com/company/equigle"
                      value={linkedinLink}
                      onChange={(e) => setLinkedinLink(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {linkedinLinkError && <p className="text-sm text-red-500">{linkedinLinkError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagramLink" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-equigle-600" /> Instagram
                    </Label>
                    <Input
                      id="instagramLink"
                      placeholder="https://instagram.com/equigle"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {instagramLinkError && <p className="text-sm text-red-500">{instagramLinkError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitterLink" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-equigle-600" /> Twitter
                    </Label>
                    <Input
                      id="twitterLink"
                      placeholder="https://twitter.com/equigle"
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {twitterLinkError && <p className="text-sm text-red-500">{twitterLinkError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="developerLink" className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-equigle-600" /> Developer Website
                    </Label>
                    <Input
                      id="developerLink"
                      placeholder="https://developer.equigle.com"
                      value={developerLink}
                      onChange={(e) => setDeveloperLink(e.target.value)}
                      disabled={!isEditing}
                      className="border-equigle-200 focus-visible:ring-equigle-500"
                    />
                    {developerLinkError && <p className="text-sm text-red-500">{developerLinkError}</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-equigle-600 hover:bg-equigle-700 text-white"
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelEdit}
                      className="border-equigle-300 hover:bg-equigle-100"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-equigle-600 hover:bg-equigle-700 text-white"
                  >
                    Edit Contact Information
                  </Button>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
