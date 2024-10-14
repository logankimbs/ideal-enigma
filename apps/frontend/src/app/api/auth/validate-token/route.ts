import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/auth/validate-token`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const authToken = response.data.authToken;

    // Set auth token in HTTP-only cookie
    const responseHeaders = new Headers();
    responseHeaders.append(
      "Set-Cookie",
      `authToken=${authToken}; HttpOnly; Path=/; Secure; SameSite=Strict`,
    );

    return new NextResponse(JSON.stringify({ success: true }), {
      headers: responseHeaders,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
