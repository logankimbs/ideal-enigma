import { NextRequest, NextResponse } from 'next/server';
import 'server-only';
import { loginUser } from '../../../../libs/gateway';
import { createSession } from '../../../../libs/session';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const baseUrl = process.env.FRONTEND_URL || '/';

  if (!code || !state) {
    return NextResponse.redirect(baseUrl);
  }

  try {
    const response = await loginUser(code, state);
    await createSession(response.token);
    return NextResponse.redirect(`${baseUrl}/dashboard`);
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.redirect(baseUrl);
  }
}
