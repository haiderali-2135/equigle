import { NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Contact } from "@/model/Contact";
import dbConnect from "@/lib/dbConnect";

const newId = generateId();
console.log("Generated UUID:", newId);

export async function GET() {
  await dbConnect();
  const contact = await Contact.findOne();
  return NextResponse.json(contact);
}
