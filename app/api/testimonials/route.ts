import { Testimonial } from "@/model/Testimonial";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
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

export async function POST(req: Request) {
  await dbConnect();
  try {
    const data = await req.json();
    const newTestimonial = new Testimonial(data);
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

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { T_id } = await req.json();
    console.log(T_id);

    const deletedTestimonial = await Testimonial.deleteOne({ T_id });
    console.log(deletedTestimonial);

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
      },
      { status: 204 }
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
