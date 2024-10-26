import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("access_token");

  if (!accessToken) {
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }

  try {
    const secretKey = process.env.JWT_SECRET!;
    const decoded = jwt.verify(accessToken, secretKey);

    console.log(decoded);

    // Create a response with the redirection
    const response = NextResponse.redirect(`${process.env.BASE_URL}/dashboard`);

    // Set the cookie in the response
    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
}
