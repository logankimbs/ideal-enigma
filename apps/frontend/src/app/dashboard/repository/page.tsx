import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { Heading } from '../../../components/heading';
import { Input, InputGroup } from '../../../components/input';
import { RepositoryStackedList } from '../../../components/repository-stacked-list';
import { Select } from '../../../components/select';
import { getRespository } from '../../libs/api';
import EmptyRepositoryState from '../../../components/empty-repository';

export const metadata: Metadata = {
  title: 'Repository',
};

export default async function Repository() {
  const repository = await getRespository();

  if (!repository.length) return <EmptyRepositoryState />;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Repository</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search repository&hellip;" />
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

        {/* <AddInsight href="#">Add Insight</AddInsight> */}
      </div>

      <div className="mt-10">
        <RepositoryStackedList repository={repository} />
      </div>
    </>
  );
}
