import { NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Partner } from "@/model/Partner";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  const partners = await Partner.find();
  return NextResponse.json(partners);
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const data = await req.json();
    const newPartner = new Partner(data);

    const newId = generateId();
    console.log("Generated UUID for Partner:", newId);
    newPartner.P_id = newId;

    await newPartner.save();
    return NextResponse.json(
      {
        success: true,
        message: "Partner saved successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save Partner",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { P_id } = await req.json();
    await Partner.deleteOne({ P_id });
    return NextResponse.json(
      {
        success: true,
        message: "Partner deleted successfully",
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
