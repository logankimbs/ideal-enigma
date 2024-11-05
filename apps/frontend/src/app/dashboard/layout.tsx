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
