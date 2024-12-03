'use client';

import { ChevronUpIcon } from '@heroicons/react/16/solid';
import {
  HomeIcon,
  SparklesIcon,
  Square2StackIcon,
} from '@heroicons/react/20/solid';
import { User } from '@ideal-enigma/common';
import { usePathname } from 'next/navigation';
import { createContext } from 'react';
import { AccountDropdownMenu } from '../../components/account-dropdown-menu';
import { Avatar } from '../../components/avatar';
import { Dropdown, DropdownButton } from '../../components/dropdown';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '../../components/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '../../components/sidebar';
import { SidebarLayout } from '../../components/sidebar-layout';
import { ThemeToggle } from '../../components/theme-toggle';
import { getEvents } from '../../data';
import { getFeaturedPosts } from '../blog/posts';

export const UserContext = createContext<User | null>(null);

type DashboardProps = {
  events: Awaited<ReturnType<typeof getEvents>>;
  children: React.ReactNode;
  user: User;
};

export function Dashboard(props: DashboardProps) {
  const blogPosts = getFeaturedPosts();
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
                  <Avatar src={user.data.profile.image_72} />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <div className="flex gap-2">
                <SidebarItem href="/dashboard" className="flex-auto">
                  <Avatar src="/teams/catalyst.svg" />
                  <SidebarLabel>Catalyst</SidebarLabel>
                </SidebarItem>
                <ThemeToggle />
              </div>
            </SidebarHeader>

            <SidebarBody>
              <SidebarSection>
                <SidebarItem
                  href="/dashboard"
                  current={pathname === '/dashboard'}
                >
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/repository"
                  current={pathname.startsWith('/dashboard/repository')}
                >
                  <Square2StackIcon />
                  <SidebarLabel>Repository</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/summaries"
                  current={pathname.startsWith('/dashboard/summaries')}
                >
                  <SparklesIcon />
                  <SidebarLabel>Summaries</SidebarLabel>
                </SidebarItem>
              </SidebarSection>

              <SidebarSection className="max-lg:hidden">
                <SidebarHeading>Resources</SidebarHeading>
                {blogPosts.map((post, index) => (
                  <SidebarItem key={index} href={`blog/${post.slug}`}>
                    {post.title}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>

            <SidebarFooter className="max-lg:hidden">
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={user.data.profile.image_72}
                      className="size-10"
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
