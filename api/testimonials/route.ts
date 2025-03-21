import { NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Testimonial } from "@/model/Testimonial";
import dbConnect from "@/lib/dbConnect";

const newId = generateId();
console.log("Generated UUID:", newId);

export async function GET() {
  await dbConnect();
  const testimonials = await Testimonial.find();
  return NextResponse.json(testimonials);
}
