import { Summary } from '@ideal-enigma/common';
import { Divider } from './divider';
import { Subheading } from './heading';
import { ReadMore } from './read-more';
import { Table, TableBody, TableCell, TableHead, TableRow } from './table';
import { Text } from './text';

function NoMatchingSummaries() {
  return (
    <div className="flex justify-center">
      <div className="text-center max-w-lg">
        <Subheading className="mb-2">
          No summaries match your search.
        </Subheading>
      </div>
    </div>
  );
}

type SummaryStackedListProps = {
  summaries: Summary[];
};

export function SummaryStackedList({ summaries }: SummaryStackedListProps) {
  if (!summaries.length) return <NoMatchingSummaries />;

  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <th className="mx-0 my-0 px-0 py-0">
            <Divider soft />
          </th>
        </TableRow>
      </TableHead>
      <TableBody>
        {summaries.map((summary) => (
          <TableRow key={summary.id}>
            <TableCell className="py-8">
              <div className="text-sm/5 sm:font-medium">
                {new Date(summary.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                -{' '}
                {new Date(summary.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>

              <Text className="pt-2 whitespace-normal break-words line-clamp-2">
                {summary.data.conclusion}
              </Text>

              <div className="mt-4">
                <ReadMore href={`/dashboard/summaries/${summary.id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
