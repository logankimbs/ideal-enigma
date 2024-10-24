import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("access_token");

  if (!accessToken) return NextResponse.redirect(new URL("/", request.url));

  try {
    const secretKey = process.env.JWT_SECRET!;
    const decoded = jwt.verify(accessToken, secretKey);

    // FIXME: Only here because we arent using decoded yet, but we will when we implement token refresh logic
    console.log(decoded);
    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // TODO: set max age to exp? Exp = 1729722901
      // maxAge: decoded.exp - Math.floor(Date.now() / 1000),
    });

    return response;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
