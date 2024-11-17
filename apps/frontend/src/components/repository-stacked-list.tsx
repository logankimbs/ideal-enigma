'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Insight } from '@ideal-enigma/common';
import { useContext, useState } from 'react';
import { UserContext } from '../app/dashboard/dashboard';
import { Avatar } from './avatar';
import ButtonGroup from './button-group';
import { Heading, Subheading } from './heading';
import { Input, InputGroup } from './input';
import { Select } from './select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Text } from './text';

type RepositoryStackedListProps = {
  repository: Insight[];
};

type RepositoryTableProps = {
  insights: Insight[];
};

function RepositoryTable(props: RepositoryTableProps) {
  const { insights } = props;

  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader>User</TableHeader>
          <TableHeader>Insight</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {insights.map((insight) => (
          <TableRow
            key={insight.id}
            href={`/dashboard/repository/${insight.id}`}
          >
            <TableCell>
              <div className="flex items-center gap-4">
                <Avatar
                  src={insight.user.data.profile.image_72}
                  className="size-10"
                />

                <div className="text-sm hidden sm:block">
                  <div>{insight.user.data.profile.real_name}</div>

                  <div className="text-zinc-500">
                    {new Date(insight.createdAt).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Badges */}
              {/* <div className="flex flex-wrap gap-1 mt-6">
          {insight.tags &&
            insight.tags.map((tag) => (
              <Badge key={tag.text}>{tag.text}</Badge>
            ))}
        </div> */}
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              <Text className="line-clamp-2">{insight.text}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function RepositoryStackedList(props: RepositoryStackedListProps) {
  const user = useContext(UserContext);
  const [activeButton, setActiveButton] = useState('All');
  const [query, setQuery] = useState('');

  const { repository } = props;

  const filteredInsights = repository.filter((insight) => {
    const textMatch = insight.text.toLowerCase().includes(query.toLowerCase());
    const tagsMatch = insight.tags?.some((tag) =>
      tag.text.toLowerCase().includes(query.toLowerCase())
    );

    const userMatch = activeButton === 'All' || insight.user.id === user?.id;

    return (textMatch || tagsMatch) && userMatch;
  });

  const buttons = [
    { id: 'All', label: 'All insights' },
    { id: 'Mine', label: 'Mine' },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Repository</Heading>

          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  name=""
                  placeholder="Search repository&hellip;"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <ButtonGroup
              buttons={buttons}
              activeButton={activeButton}
              onSetActive={setActiveButton}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        {filteredInsights.length ? (
          <RepositoryTable insights={filteredInsights} />
        ) : (
          <div className="flex justify-center">
            <div className="text-center max-w-lg">
              <Subheading className="mb-2">
                Looks like no one insights match your search.
              </Subheading>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
