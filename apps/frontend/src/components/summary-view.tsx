'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Summary } from '@ideal-enigma/common';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';
import { UserContext } from '../app/dashboard/dashboard';
import { Heading } from './heading';
import { Input, InputGroup } from './input';
import { Pagination, usePagination } from './pagination';
import { Select } from './select';
import { SummaryStackedList } from './summary-stacked-list';
import EmptySummariesState from './empty-summaries';

type SummariesViewProps = {
  summaries: Summary[];
};

export default function SummariesView({ summaries }: SummariesViewProps) {
  const user = useContext(UserContext);
  const [query, setQuery] = useState('');

  if (!user) redirect('/');

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

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedSummaries,
    setCurrentPage,
  } = usePagination<Summary>({
    data: filteredSummaries,
    itemsPerPage: 4,
    initialPage: 1,
  });

  if (!summaries.length) return <EmptySummariesState />;

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
