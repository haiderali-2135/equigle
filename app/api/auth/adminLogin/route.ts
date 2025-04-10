import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const ADMIN_USERNAME = process.env.USERNAME;
  const ADMIN_PASSWORD = process.env.PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET!;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate token (expires in 5 hours)
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "5h" });

    const serialized = serialize("admin_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 5, // 5 hours
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
