'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { User } from '@ideal-enigma/common';
import { FormEvent, useState } from 'react';
import { Avatar } from './avatar';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Heading } from './heading';
import { Input, InputGroup } from './input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Text } from './text';

export default function OnboardModule({ team }: { team: User[] }) {
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
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: unselectedIds }),
      });

      await fetch('/api/onboardingStatus', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'complete' }),
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <div className="mx-auto max-w-3xl">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col justify-center min-h-screen"
        >
          <Heading>Your Slack integration is almost set up.</Heading>
          <Text>
            Before exploring your new Loop dashboard, choose which users you
            would like to opt out of receiving notifications. Simply select them
            below and click “Save changes” to apply your preferences.
          </Text>
          <div className="my-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  name=""
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
                  <TableHeader className="text-right hidden sm:table-cell">
                    Email
                  </TableHeader>
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
                    <TableCell className="text-right hidden sm:table-cell">
                      {user.data.profile.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
