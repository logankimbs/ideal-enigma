import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { slackLogin } from '../../../../libs/gateway';
import { createSession } from '../../../../libs/session';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!state || !code) redirect('/');

  // validate code and state
  // login user
  const { accessToken, user } = await slackLogin(code, state);
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

  return redirect('/dashboard');

  // return new Response(`code = ${code}\nstate = ${state}`);
}
