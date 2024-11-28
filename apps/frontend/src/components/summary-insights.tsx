'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Insight } from '@ideal-enigma/common';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';
import { UserContext } from '../app/dashboard/dashboard';
import EmptyRepositoryView from './empty-repository-view';
import { Input, InputGroup } from './input';
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

type RepositoryViewProps = {
  insights: Insight[];
};

export default function SummaryInsights({ insights }: RepositoryViewProps) {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const user = useContext(UserContext);
  const itemsPerPage = 4;

  if (!user) redirect('/');

  const filteredInsights = insights.filter((insight) => {
    const queryLower = query.toLowerCase();
    const textMatch = insight.text.toLowerCase().includes(queryLower);
    const tagsMatch = insight.tags?.some((tag) =>
      tag.text.toLowerCase().includes(queryLower)
    );

    return textMatch || tagsMatch;
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

  if (!insights.length) return <EmptyRepositoryView />;

  return (
    <>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
            Featured Insights
          </h1>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  name=""
                  placeholder="Search insights&hellip;"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
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
        </div>
      </div>

      <div className="my-6">
        <RepositoryTableV2 repository={paginatedInsights} />
      </div>

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
