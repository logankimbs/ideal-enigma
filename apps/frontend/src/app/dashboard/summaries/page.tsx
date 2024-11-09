import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { Badge } from '../../../components/badge';
import { Divider } from '../../../components/divider';
import { Heading } from '../../../components/heading';
import { Input, InputGroup } from '../../../components/input';
import { Link } from '../../../components/link';
import { Select } from '../../../components/select';
import { getSummaries } from '../../libs/api';

export const metadata: Metadata = {
  title: 'Summaries',
};

export default async function Summaries() {
  const summaries = await getSummaries();

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
      <ul className="mt-10">
        {summaries.map((summary, index) => (
          <>
            <li key={summary.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={summary.id} className="flex gap-6 py-6">
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={`/dashboard/summaries/${summary.id}`}>
                        LAST DATE -{' '}
                        {new Date(summary.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </Link>
                    </div>
                    <div className="text-xs/6 text-zinc-400">
                      {summary.data.actions.join(' ')}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {`{number of insights submitted}`} insights submitted
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className="max-sm:hidden"
                    color={summary.version === 1 ? 'lime' : 'zinc'}
                  >
                    Weekly
                  </Badge>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
