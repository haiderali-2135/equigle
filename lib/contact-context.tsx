
"use client"

import React, { createContext, JSX, useContext, useEffect, useState } from "react";


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



  const ContactContext = createContext<ContactInfo | null>(null);

  // Custom hook (rename appropriately)
  export const useContactContext = () => useContext(ContactContext);
  
  export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  
    useEffect(() => {
      const fetchContactInfo = async () => {
        try {
          const response = await fetch("/api/contact");
          if (!response.ok) throw new Error("Failed to fetch contact information");
          const { data } = await response.json();
            if (data) setContactInfo(data);
            
        } catch (error) {
          console.error("Error fetching contact information:", error);
        }
      };
  
      fetchContactInfo();
    }, []);
  
    return (
      <ContactContext.Provider value={contactInfo}>
        {children}
      </ContactContext.Provider>
    );
  };