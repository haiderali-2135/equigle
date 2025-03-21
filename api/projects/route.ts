import { NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Project } from "@/model/Project";
import dbConnect from "@/lib/dbConnect";

const newId = generateId();
console.log("Generated UUID:", newId);

export async function GET() {
  await dbConnect();
  const projects = await Project.find();
  return NextResponse.json(projects);
}
