'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { User } from '@ideal-enigma/common';
import { FormEvent, useState } from 'react';
import {
  enableNotifications,
  sendWelcomeMessage,
  updateUserOnboardingStatus,
} from '../app/libs/gateway';
import { Avatar } from './avatar';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input, InputGroup } from './input';
import { GradientBackground } from './landing/gradient';
import { Link } from './landing/link';
import { Mark } from './landing/logo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

type OnboardModuleProps = {
  team: User[];
  user: User;
};

export default function OnboardModule({ team, user }: OnboardModuleProps) {
  const [checkedIds, setCheckedIds] = useState(new Set<string>());
  const [query, setQuery] = useState('');

  const filteredUsers = team.filter((user) => {
    const queryLower = query.toLowerCase();
    return user.data.profile.real_name.toLowerCase().includes(queryLower);
  });

  const handleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const unselectedIds = team
      .filter((user) => !checkedIds.has(user.id))
      .map((user) => user.id);

    try {
      await enableNotifications(unselectedIds);
      await updateUserOnboardingStatus(user.id);
      await sendWelcomeMessage(user.team.id);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-xl rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form onSubmit={handleSubmit} method="POST" className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <Mark className="h-9 fill-black" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">
              Your Slack integration is almost set up.
            </h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Before exploring your new Loop dashboard, choose which users you
              would like to opt out of receiving notifications.
            </p>
            <div className="mt-8 space-y-3">
              <div className="my-4 flex max-w-xl gap-4">
                <div className="flex-1">
                  <InputGroup>
                    <MagnifyingGlassIcon />
                    <Input
                      name="search"
                      placeholder="Search users&hellip;"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="mt-4 mb-10 max-h-80 overflow-y-auto">
                <Table dense>
                  <TableHead>
                    <TableRow>
                      <TableHeader className="text-center">Opt out</TableHeader>
                      <TableHeader>User</TableHeader>
                      <TableHeader>Role</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-center">
                          <Checkbox
                            onChange={() => handleCheck(user.id)}
                            checked={checkedIds.has(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Avatar
                            src={user.data.profile.image_72}
                            className="size-6 ring-2 ring-white dark:ring-zinc-900 mr-2"
                          />
                          {user.data.profile.real_name}
                        </TableCell>
                        <TableCell>
                          {user.data.is_admin ? 'Admin' : 'Member'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
