"use client";

import {
<<<<<<< Updated upstream:apps/frontend/src/app/application-layout.tsx
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
=======
  // ChevronDownIcon,
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/dashboard.tsx
  ChevronUpIcon,
  // Cog8ToothIcon,
  LightBulbIcon,
  // PlusIcon,
  ShieldCheckIcon,
  // UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { Avatar } from "../components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "../components/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "../components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "../components/sidebar";
import { SidebarLayout } from "../components/sidebar-layout";
import { getEvents } from "../data";

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <Cog6ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <QuestionMarkCircleIcon />
        <DropdownLabel>Support</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarItem href="/dashboard">
              {/* TODO: Add echo logo */}
              <Avatar src="/teams/catalyst.svg" />
              <SidebarLabel>Echo</SidebarLabel>
            </SidebarItem>
            {/* <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <Avatar
                    slot="icon"
                    initials="BE"
                    className="bg-purple-500 text-white"
                  />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu> */}
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === "/"}>
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem
<<<<<<< Updated upstream:apps/frontend/src/app/application-layout.tsx
                href="/events"
                current={pathname.startsWith("/events")}
=======
                href="/dashboard/events"
                current={pathname.startsWith("/dashboard/events")}
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/dashboard.tsx
              >
                <Square2StackIcon />
                <SidebarLabel>My Repository</SidebarLabel>
              </SidebarItem>
              <SidebarItem
<<<<<<< Updated upstream:apps/frontend/src/app/application-layout.tsx
                href="/orders"
                current={pathname.startsWith("/orders")}
=======
                href="/dashboard/orders"
                current={pathname.startsWith("/dashboard/orders")}
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/dashboard.tsx
              >
                <TicketIcon />
                {/* TODO: Update icon! */}
                <SidebarLabel>[Company] Repository</SidebarLabel>
              </SidebarItem>
              <SidebarItem
<<<<<<< Updated upstream:apps/frontend/src/app/application-layout.tsx
                href="/settings"
                current={pathname.startsWith("/settings")}
=======
                href="/dashboard/summaries"
                current={pathname.startsWith("/dashboard/summaries")}
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/dashboard.tsx
              >
                {/* <Cog6ToothIcon /> */}
                <SparklesIcon />
                <SidebarLabel>Summaries</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
<<<<<<< Updated upstream:apps/frontend/src/app/application-layout.tsx
              <SidebarHeading>Upcoming Events</SidebarHeading>
              {events.map((event) => (
=======
              <SidebarHeading>Resources</SidebarHeading>
              {/* Links to blog articles - Loop through blog articles */}
              <SidebarItem key={1} href={""}>
                Actionable Insights Framework
              </SidebarItem>
              <SidebarItem key={2} href={""}>
                Scaling a (Learning) Startup
              </SidebarItem>
              <SidebarItem key={3} href={""}>
                Build - Measure - Learn Cycle
              </SidebarItem>
              {/* {props.events.map((event) => (
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/dashboard.tsx
                <SidebarItem key={event.id} href={event.url}>
                  {event.name}
                </SidebarItem>
              ))} */}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              {/* <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem> */}
              {/* <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem> */}
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src="/users/erica.jpg"
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      Erica
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      erica@example.com
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
