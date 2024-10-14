import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const protectedRoutes = ["/dashboard"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

      await jwtVerify(authToken, secret);
      return NextResponse.next();
    } catch (error) {
      console.log("error", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Paths where the middleware should run
export const config = {
  matcher: ["/dashboard/:path*"],
};
