import type React from "react";
import { getEvents } from "../../data";
import { Dashboard } from "./dashboard";
import { auth } from "@/src/auth";
import { SessionProvider } from "next-auth/react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const events = await getEvents();
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider session={session}>
      <Dashboard events={events}>{props.children}</Dashboard>
    </SessionProvider>
  );
}
