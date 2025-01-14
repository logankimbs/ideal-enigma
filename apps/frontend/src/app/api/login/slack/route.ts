import { NextRequest, NextResponse } from 'next/server';
import { validateCode } from '../../../libs/gateway';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const baseUrl = process.env.FRONTEND_URL || '/';

  if (!code) {
    return NextResponse.redirect(baseUrl);
  }

  try {
    const { url } = await validateCode(code);
    return NextResponse.redirect(url || baseUrl);
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.redirect(baseUrl);
  }
}
