import type React from "react";
import { getEvents } from "../../data";
import { Dashboard } from "./dashboard";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const events = await getEvents();
  return <Dashboard events={events}>{props.children}</Dashboard>;
}
