'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Insight } from '@ideal-enigma/common';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';
import { UserContext } from '../app/dashboard/dashboard';
import EmptyRepositoryView from './empty-repository-view';
import { Input, InputGroup } from './input';
import { Pagination, usePagination } from './pagination';
import { RepositoryTableV2 } from './repository-table';
import { Select } from './select';

type RepositoryViewProps = {
  insights: Insight[];
};

export default function SummaryInsights({ insights }: RepositoryViewProps) {
  const [query, setQuery] = useState('');
  const user = useContext(UserContext);

  if (!user) redirect('/');

  const filteredInsights = insights.filter((insight) => {
    const queryLower = query.toLowerCase();
    const textMatch = insight.text.toLowerCase().includes(queryLower);
    const tagsMatch = insight.tags?.some((tag) =>
      tag.text.toLowerCase().includes(queryLower)
    );

    return textMatch || tagsMatch;
  });

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedInsights,
    setCurrentPage,
  } = usePagination<Insight>({
    data: filteredInsights,
    itemsPerPage: 4,
    initialPage: 1,
  });

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
