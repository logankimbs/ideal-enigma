import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// TODO: Make sure this route can only be called from the backend!
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("access_token")!;

  return NextResponse.json({ token: accessToken });
}
