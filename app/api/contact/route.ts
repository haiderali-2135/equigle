import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Contact } from "@/model/Contact";
import dbConnect from "@/lib/dbConnect";
import { verifyAdminToken } from "@/lib/auth";


// for use only once (to save data in the DB) later use PUT method to edit any details;

export async function PUT(req: NextRequest) {
  const tokenCheckResponse = await verifyAdminToken(req);
    if (tokenCheckResponse) {
      return tokenCheckResponse;
    }
    
  await dbConnect();
  try {
    // remember to give the id in the front-end
    const data = await req.json();
    // Update the contact info if it exists, otherwise create a new one
    const updatedContact = await Contact.findOneAndUpdate(
      {}, // Find the existing contact document (assuming there's only one)
      data,
      { upsert: true, new: true } // Create if not found & return updated doc
    );

    return NextResponse.json(
      {
        success: true,
        message: "Contact information updated successfully",
        data: updatedContact,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update Contact Information",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  await dbConnect();
  try {
    const contact = await Contact.findOne();

    if (!contact) {
      
      return NextResponse.json(
        {
          success: false,
          message: "No contact information found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact information retrieved successfully",
        data: contact,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact information",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
