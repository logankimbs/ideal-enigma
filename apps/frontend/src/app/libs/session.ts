import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import 'server-only';

export type SessionPayload = {
  sub: string; // UserId
  'https://slack.com/team_id': string;
  // TODO: Add more values
};

export type Session = {
  token: string;
  payload: SessionPayload;
};

export async function decrypt(
  accessToken: string | undefined = ''
): Promise<SessionPayload> {
  try {
    return jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as SessionPayload;
  } catch (error) {
    console.error('Failed to verify session', error);
    throw error;
  }
}

export async function createSession(accessToken: string | undefined = '') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decoded = await decrypt(accessToken);

    cookies().set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      // expires: decoded.exp
    });
  } catch (error) {
    console.error('Failed to create session', error);
    throw error;
  }
}

export async function getSession(): Promise<Session> {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value || '';

  try {
    const payload = await decrypt(token);

    return { payload, token };
  } catch (error) {
    console.error('No session exists', error);
    throw error;
  }
}

export async function deleteSession() {
  const cookieStore = cookies();

  cookieStore.delete('access_token');
}
