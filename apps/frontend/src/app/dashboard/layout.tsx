import { ThemeProvider } from 'next-themes';
import type React from 'react';
import { getEvents } from '../../data';
import { getSessionUser } from '../libs/api';
import { Dashboard } from './dashboard';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const user = await getSessionUser();
  const events = await getEvents();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="dark:text-white antialiased">
        <Dashboard events={events} user={user}>
          {props.children}
        </Dashboard>
      </div>
    </ThemeProvider>
  );
}
