import { verifyAdminToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tokenCheckResponse = await verifyAdminToken(req);
  if (tokenCheckResponse) {
    return tokenCheckResponse;
  }
  
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: "admin_token",
      value: "",
      maxAge: 0, // Expire immediately
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}
