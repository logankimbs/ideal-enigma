import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../libs/session';

export async function POST(req: NextRequest) {
  try {
    const { userIds } = await req.json();
    const session = await getSession();

    const response = await axios.post(
      `${process.env.BACKEND_URL}/users/enableNotifications`,
      { userIds },
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Failed to update notifications:', error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
