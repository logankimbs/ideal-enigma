import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // List of protected routes (e.g., /dashboard and its sub-routes)
  const protectedPaths = ["/dashboard"];

  // Check if the request is for a protected path
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  // If accessing a protected path and no token, redirect to login page
  if (isProtected && !token) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); // Return to original path after login
    return NextResponse.redirect(loginUrl);
  }

  // Continue the request if the user is authenticated or it's not a protected path
  return NextResponse.next();
}

// Apply middleware to protect the /dashboard route and its sub-routes
export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all routes under /dashboard
};
