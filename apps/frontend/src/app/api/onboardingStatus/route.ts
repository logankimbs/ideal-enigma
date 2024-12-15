import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../libs/session';

export async function PUT(req: NextRequest) {
  try {
    let requestBody = {};
    if (req.body) {
      requestBody = await req.json();
    }

    const session = await getSession();

    if (!session || !session.payload?.sub) {
      throw new Error('Invalid session or user identifier');
    }

    const response = await axios.put(
      `${process.env.BACKEND_URL}/users/${session.payload.sub}/completeOnboarding`,
      requestBody, // Use the body if necessary, or send an empty payload
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Failed to update onboarding status:', error || error);
    return NextResponse.json(
      { success: false, error: error || 'Unknown error' },
      { status: 500 }
    );
  }
}
