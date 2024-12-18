import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

interface GatewayRequest {
  path: string;
  method: string;
  body?: any;
}

export async function POST(req: Request) {
  const { path, method, body }: GatewayRequest = await req.json();

  if (!path || !method) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  if (!token) redirect('');

  try {
    const input = `${process.env.BACKEND_URL}/${path}`;
    const init = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
        ...req.headers,
      },
      body: body ? body : undefined,
    } as RequestInit;

    const response = await fetch(input, init);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
