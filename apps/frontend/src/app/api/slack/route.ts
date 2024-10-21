export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request, response: Response) {
  console.log("request in frontend api", request);
  console.log("response in frontend api", response);
  return Response.json({ greeting: "hello from frontend api baby" });
}
