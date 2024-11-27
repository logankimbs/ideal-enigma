'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Summary } from '@ideal-enigma/common';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';
import { UserContext } from '../app/dashboard/dashboard';
import EmptyRepositoryView from './empty-repository-view';
import { Heading } from './heading';
import { Input, InputGroup } from './input';
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from './pagination';
import { Select } from './select';
import { SummaryStackedList } from './summary-stacked-list';

type SummariesViewProps = {
  summaries: Summary[];
};

export default function SummariesView({ summaries }: SummariesViewProps) {
  const user = useContext(UserContext);

  if (!user) redirect('/');

  const [query, setQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredSummaries = summaries.filter((summary) => {
    const queryLower = query.toLowerCase();
    const titleMatch = summary.data.themes.some((theme) => {
      return (
        theme.title.toLocaleLowerCase().includes(queryLower) ||
        theme.trend.toLocaleLowerCase().includes(queryLower) ||
        theme.objective.toLocaleLowerCase().includes(queryLower)
      );
    });
    const actionMatch = summary.data.actions.some((action) =>
      action.toLocaleLowerCase().includes(queryLower)
    );
    const conclusionMatch = summary.data.conclusion
      .toLocaleLowerCase()
      .includes(queryLower);

    return titleMatch || actionMatch || conclusionMatch;
  });

  const totalItems = filteredSummaries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Paginate the filtered insights
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSummaries = filteredSummaries.slice(
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

  if (!summaries.length) return <EmptyRepositoryView />;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Summaries</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  name="search"
                  placeholder="Search summaries&hellip;"
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
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6">
        <SummaryStackedList summaries={paginatedSummaries} />
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
