import { deleteSession } from '../../../libs/session';

export async function POST(req: Request) {
  await deleteSession();
  return new Response('Session deleted', { status: 200 });
}
