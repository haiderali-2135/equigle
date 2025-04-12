// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  // Allow access to login page always
  if (pathname.startsWith("/adminlogin")) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token. Redirecting to home.");
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      await jwtVerify(token, secret); // will throw if invalid or expired
      return NextResponse.next(); // Token is valid
    } catch (error) {
      console.log("Invalid or expired token. Redirecting to homepage...");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next(); // Allow all other routes
}

export const config = {
  matcher: ["/admin/:path*", "/adminlogin"],
};
