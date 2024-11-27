import { Summary } from '@ideal-enigma/common';
import { Divider } from './divider';
import { Subheading } from './heading';
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
          <TableRow
            key={summary.id}
            href={`/dashboard/summaries/${summary.id}`}
          >
            <TableCell>
              <Subheading>
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
              </Subheading>

              <Text className="pt-2 whitespace-normal break-words line-clamp-3">
                {summary.data.actions.join(' ')}
              </Text>

              {/* Badges */}
              {/* <div className="flex flex-wrap gap-1 mt-6">
                {insight.tags &&
                  insight.tags.map((tag) => (
                    <Badge key={tag.text}>{tag.text}</Badge>
                  ))}
              </div> */}
            </TableCell>
            {/* <TableCell className="whitespace-normal break-words">
              <div className="line-clamp-3">
                {summary.data.actions.join(' ')}
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
