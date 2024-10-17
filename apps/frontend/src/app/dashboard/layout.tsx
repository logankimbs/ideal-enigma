import type React from "react";
import { getEvents } from "../../data";
import "../../styles/tailwind.css";
import { Dashboard } from "./dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const events = await getEvents();

  return <Dashboard events={events}>{children}</Dashboard>;
}
