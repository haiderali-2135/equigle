import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log(" Client Username: ", username);
  console.log(" Client Password: ", password);
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET!;

  console.log(" Env Username: ", ADMIN_USERNAME);
  console.log(" Env Password: ", ADMIN_PASSWORD);

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate token (expires in 5 hours)
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "5h" });

    // Create response and set cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 5, // 5 hours
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
