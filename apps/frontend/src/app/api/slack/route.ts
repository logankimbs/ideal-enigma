import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("access_token");

  if (!accessToken) redirect(`${process.env.BASE_URL}/`);

  try {
    const secretKey = process.env.JWT_SECRET!;
    const decoded = jwt.verify(accessToken, secretKey);

    // FIXME: Only here because we arent using decoded yet, but we will when we implement token refresh logic
    console.log(decoded);
    cookies().set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // TODO: set max age to exp? Exp = 1729722901
      // maxAge: decoded.exp - Math.floor(Date.now() / 1000),
    });

    redirect(`${process.env.BASE_URL}/dashboard`);
  } catch (error) {
    console.error("JWT verification failed:", error);
    redirect(`${process.env.BASE_URL}/`);
  }
}
