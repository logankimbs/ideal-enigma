import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../libs/session';

export async function GET(request: NextRequest) {
  console.log('this is comeing from a fresh installations');
  const accessToken = request.nextUrl.searchParams.get('access_token');

  if (!accessToken) {
    return NextResponse.redirect(`${process.env.FRONTEND_URL}/`);
  }

  try {
    await createSession(accessToken);

    return NextResponse.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${process.env.FRONTEND_URL}/`);
  }
}
