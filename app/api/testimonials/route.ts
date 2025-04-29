import { Testimonial } from "@/model/Testimonial";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { verifyAdminToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  try {
    console.log("Got a get request");

    const testimonials = await Testimonial.find();
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve testimonials",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const tokenCheckResponse = await verifyAdminToken(req);
    if (tokenCheckResponse) {
      return tokenCheckResponse;
    }
    
  await dbConnect();
  try {
    const data = await req.json();
    const newTestimonial = new Testimonial(data);

    const newId = generateId();
    console.log("Generated UUID for Testimonial:", newId);
    newTestimonial.T_id = newId;

    await newTestimonial.save();
    return NextResponse.json(
      {
        success: true,
        message: "Testimonial saved successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save testimonial",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const tokenCheckResponse = await verifyAdminToken(req);
    if (tokenCheckResponse) {
      return tokenCheckResponse;
    }
    
  await dbConnect();
  try {
    const { T_id } = await req.json();
    console.log(T_id);

    await Testimonial.deleteOne({ T_id });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
