import type React from "react";
import jwt from "jsonwebtoken";
import { getEvents } from "../../data";
import { Dashboard } from "./dashboard";
import { cookies } from "next/headers";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const events = await getEvents();
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")!.value;
  const secretKey = process.env.JWT_SECRET!;
  const decoded = jwt.verify(accessToken, secretKey);

  let user = null;
  if (accessToken) {
    try {
      // 2. Make a request to the backend using the access token
      const response = await fetch(
        `${process.env.BACKEND_URL}/users/${decoded.sub}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        user = await response.json();
      } else {
        console.error("Failed to fetch user info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  } else {
    console.error("No access token found in cookies");
  }

  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <body>
        <div className="dark:text-white antialiased">
          <Dashboard events={events} user={user}>
            {props.children}
          </Dashboard>
        </div>
      </body>
    </html>
  );
}
