import { deleteSession } from "../../../libs/session";


export async function POST(req: Request) {
  console.log(req);
  await deleteSession();
  return new Response("Session deleted", { status: 200 });
}
