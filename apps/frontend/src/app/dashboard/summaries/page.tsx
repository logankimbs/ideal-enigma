import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { Heading } from '../../../components/heading';
import { Input, InputGroup } from '../../../components/input';
import { Select } from '../../../components/select';
import { getSummaries } from '../../libs/api';
import { SummaryStackedList } from '../../../components/summary-stacked-list';
import EmptySummariesState from '../../../components/empty-summaries';

export const metadata: Metadata = {
  title: 'Summaries',
};

export default async function Summaries() {
  const summaries = await getSummaries();

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
                <Input name="search" placeholder="Search summaries&hellip;" />
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
      <div className="mt-10">
        <SummaryStackedList summaries={summaries} />
      </div>
    </>
  );
}
