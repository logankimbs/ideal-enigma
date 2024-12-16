import { ThemeProvider } from 'next-themes';
import type React from 'react';
import OnboardModule from '../../components/onboard-module';
import { getEvents } from '../../data';
import {
  getSessionUser,
  getUsersForTeam,
  isOnboardingComplete,
} from '../libs/api';
import { Dashboard } from './dashboard';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const user = await getSessionUser();
  const isOnboarded = await isOnboardingComplete(user.id);
  const events = await getEvents();
  const team = await getUsersForTeam(user.team.id);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="dark:text-white antialiased">
        {isOnboarded ? (
          <Dashboard events={events} user={user}>
            {props.children}
          </Dashboard>
        ) : (
          <OnboardModule team={team} user={user} />
        )}
      </div>
    </ThemeProvider>
  );
}
