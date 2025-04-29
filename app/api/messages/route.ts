import { Message } from "@/model/Message";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/generateId";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const tokenCheckResponse = await verifyAdminToken(req);
    if (tokenCheckResponse) {
      return tokenCheckResponse;
    }
    
  try {
    console.log("Got a get request");

      const messages = await Message.find();
      // find messages instead of testimonials
      return NextResponse.json(messages, { status: 200 });
      // send messages instead of testimonials
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve messages", // messages intead of testimonials
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
      const newMessage = new Message(data);
      // create new Message 
    const newId = generateId();
    console.log("Generated UUID for Messages:", newId); // for Message
    newMessage.M_id = newId; // M_id = newId

    await newMessage.save(); //newMesssage.save()
    return NextResponse.json(
      {
        success: true,
        message: "Message saved successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save message",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


