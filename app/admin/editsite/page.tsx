'use client'
import React, { useState } from 'react'
import AddPartners from '@/components/adminsections/addPartners'
import AddTestimonials from '@/components/adminsections/addTestimonials'
import AddProjects from '@/components/adminsections/addProjects'
import EditContactInfo from '@/components/adminsections/editContactInfo'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function page() {
  const [Messages, setMessages] = useState([])
  const [position, setPosition] = React.useState("bottom")
  return (
    <>
    <div>
      <h1 className='mt-[8%]'>edit site page</h1>
      </div>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
      <div className='flex m-auto'>
        <ul>
          <li> <Button>Add/Remove Partners</Button></li>
          <li><Button>Add/Remove Testimonials</Button></li>
          <li><Button>Add/Remove Projects</Button></li>
          <li><Button>Edit Contact Information</Button></li>
        </ul>
      </div>
      <AddPartners />
      <AddTestimonials />
      <AddProjects />
      <EditContactInfo />
    </>
  )
}

export default page
