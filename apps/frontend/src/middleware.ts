import { auth } from "@/src/auth"; // Import auth from your src/auth.ts
import { NextResponse } from "next/server";

export default auth((req) => {
  // Check if the user is not authenticated
  if (!req.auth?.user) {
    const loginUrl = new URL("/auth/signin", req.url);
    // Optional: Set a callbackUrl parameter to redirect back after login
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated, allow the request to continue
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all routes under /dashboard
};
