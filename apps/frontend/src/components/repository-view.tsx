'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Insight, User } from '@ideal-enigma/common';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';
import { UserContext } from '../app/dashboard/dashboard';
import { Avatar } from './avatar';
import EmptyRepositoryView from './empty-repository-view';
import { Heading } from './heading';
import { Input, InputGroup } from './input';
import { Listbox, ListboxLabel, ListboxOption } from './listbox';
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from './pagination';
import { RepositoryTableV2 } from './repository-table';
import { Select } from './select';

type View = {
  code: string;
  name: string;
  avatarUrl?: string | undefined;
};

function getViews(user: User): View[] {
  return [
    {
      code: user.team.id,
      name: user.team.data.name || 'Company',
      avatarUrl: user.team.data.icon?.image_68,
    },
    {
      code: user.id,
      name: user.data.profile.real_name,
      avatarUrl: user.data.profile.image_72,
    },
  ];
}

type RepositoryViewProps = {
  repository: Insight[];
};

export default function RepositoryView({ repository }: RepositoryViewProps) {
  const user = useContext(UserContext);

  if (!user) redirect('/');

  const views = getViews(user);
  const [view, setView] = useState(views[0]);
  const [query, setQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredInsights = repository.filter((insight) => {
    const queryLower = query.toLowerCase();
    const textMatch = insight.text.toLowerCase().includes(queryLower);
    const tagsMatch = insight.tags?.some((tag) =>
      tag.text.toLowerCase().includes(queryLower)
    );
    const viewMatch =
      view.code === user.team.id || insight.user.id === user?.id;

    return (textMatch || tagsMatch) && viewMatch;
  });

  // Pagination
  const totalItems = filteredInsights.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Paginate the filtered insights
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInsights = filteredInsights.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const generatePageLinks = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationPage
          key={i}
          href={`?page=${i}`}
          current={i === currentPage}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(i);
          }}
        >
          {i}
        </PaginationPage>
      );
    }

    return (
      <>
        {startPage > 1 && <PaginationGap />}
        {pages}
        {endPage < totalPages && <PaginationGap />}
      </>
    );
  };

  if (!repository.length) return <EmptyRepositoryView />;

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
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1); // Reset to the first page
                  }}
                />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by featured</option>
                <option value="date">Sort by date</option>
              </Select>
            </div>
          </div>

          <Listbox
            aria-label="View Filter"
            name="view_filter"
            placeholder="View Filter"
            by="code"
            value={view}
            onChange={(view) => {
              setView(view);
              setCurrentPage(1);
            }}
            className="mt-4 md:max-w-48"
          >
            {views.map((view) => (
              <ListboxOption key={view.code} value={view}>
                <Avatar src={view.avatarUrl} />
                <ListboxLabel>{view.name}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
        </div>
      </div>

      <div className="my-6">
        <RepositoryTableV2 repository={paginatedInsights} />
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationPrevious
          href={currentPage > 1 ? `?page=${currentPage - 1}` : null}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
        />
        <PaginationList>{generatePageLinks()}</PaginationList>
        <PaginationNext
          href={currentPage < totalPages ? `?page=${currentPage + 1}` : null}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
          }}
        />
      </Pagination>
    </>
  );
}
