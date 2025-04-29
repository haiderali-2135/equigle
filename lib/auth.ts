// lib/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

// Function to verify the token and return a response
export async function verifyAdminToken(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    // No token found in cookies
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Attempt to verify the JWT token
    await jwtVerify(token, secret); // Will throw if invalid
    return null; // Token is valid, proceed with API logic
  } catch (error) {
    // Invalid or expired token
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
  }
}
