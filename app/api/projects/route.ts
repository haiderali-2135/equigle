import { NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { Project } from "@/model/Project";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();

  try {
    const projects = await Project.find();
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve Projects",
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
    const newProject = new Project(data);
    newProject.P_id = generateId();
    await newProject.save();
    return NextResponse.json(
      {
        success: true,
        message: "Project saved successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save Project",
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
    const deletedProject = await Project.deleteOne({ P_id });
    
    if (deletedProject.deletedCount === 0) {
      throw new Error("Project not found") 
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 400 }
      );
    }
  
    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete Project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { P_id, ...updateFields } = await req.json();

    if (!P_id) throw new Error("Missing Project ID (P_id)");

    const updatedProject = await Project.findOneAndUpdate(
      { P_id }, // Find project by P_id
      { $set: updateFields }, // Update fields
      { new: true } // Return updated document
    );

    if (!updatedProject) throw new Error("Project not found");

    return NextResponse.json(
      { success: true, updatedProject },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
