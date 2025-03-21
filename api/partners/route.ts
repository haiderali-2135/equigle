import { NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Partner } from "@/model/Partner";
import dbConnect from "@/lib/dbConnect";

const newId = generateId();
console.log("Generated UUID:", newId);

export async function GET() {
  await dbConnect();
  const partners = await Partner.find();
  return NextResponse.json(partners);
}
