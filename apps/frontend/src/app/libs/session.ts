import { cookies } from "next/headers";
import "server-only";

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete("access_token");
}
