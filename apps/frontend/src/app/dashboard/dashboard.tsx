"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
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
import { Avatar } from "../../components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "../../components/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "../../components/navbar";
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
} from "../../components/sidebar";
import { SidebarLayout } from "../../components/sidebar-layout";
import { getEvents } from "../../data";
import { SignOutDropdownItem } from "@/src/components/signout-dropdown";
import { User } from "@idealgma/common";
import { createContext } from "react";

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
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
      <DropdownDivider />
      <SignOutDropdownItem />
    </DropdownMenu>
  );
}

export const UserContext = createContext<User | null>(null);

type DashboardProps = {
  events: Awaited<ReturnType<typeof getEvents>>;
  children: React.ReactNode;
  user: User;
};

export function Dashboard(props: DashboardProps) {
  const pathname = usePathname();
  const { user } = props;

  return (
    <UserContext.Provider value={user}>
      <SidebarLayout
        navbar={
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src={user.data.profile.image_original} square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <Avatar src="/teams/catalyst.svg" />
                  <SidebarLabel>Catalyst</SidebarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu
                  className="min-w-80 lg:min-w-64"
                  anchor="bottom start"
                >
                  <DropdownItem href="/dashboard/settings">
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
                </DropdownMenu>
              </Dropdown>
            </SidebarHeader>

            <SidebarBody>
              <SidebarSection>
                <SidebarItem
                  href="/dashboard"
                  current={pathname === "/dashboard"}
                >
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/events"
                  current={pathname.startsWith("/events")}
                >
                  <Square2StackIcon />
                  <SidebarLabel>Events</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/orders"
                  current={pathname.startsWith("/orders")}
                >
                  <TicketIcon />
                  <SidebarLabel>Orders</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/settings"
                  current={pathname.startsWith("/settings")}
                >
                  <Cog6ToothIcon />
                  <SidebarLabel>Settings</SidebarLabel>
                </SidebarItem>
              </SidebarSection>

              <SidebarSection className="max-lg:hidden">
                <SidebarHeading>Upcoming Events</SidebarHeading>
                {props.events.map((event) => (
                  <SidebarItem key={event.id} href={event.url}>
                    {event.name}
                  </SidebarItem>
                ))}
              </SidebarSection>

              <SidebarSpacer />

              <SidebarSection>
                <SidebarItem href="#">
                  <QuestionMarkCircleIcon />
                  <SidebarLabel>Support</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="#">
                  <SparklesIcon />
                  <SidebarLabel>Changelog</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>

            <SidebarFooter className="max-lg:hidden">
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={user?.data.profile.image_original}
                      className="size-10"
                      square
                      alt=""
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                        {user.data.profile.first_name}
                      </span>
                      <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                        {user?.data.profile.email}
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
        {props.children}
      </SidebarLayout>
    </UserContext.Provider>
  );
}
