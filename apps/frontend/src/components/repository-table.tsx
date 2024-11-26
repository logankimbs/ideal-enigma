import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { Insight } from '@ideal-enigma/common';
import { Avatar } from './avatar';
import { Badge } from './badge';
import { Subheading } from './heading';
import { Link } from './link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Text } from './text';

function NoMatchingInsights() {
  return (
    <div className="flex justify-center">
      <div className="text-center max-w-lg">
        <Subheading className="mb-2">No insights match your search.</Subheading>
      </div>
    </div>
  );
}

type RepositoryTableProps = {
  repository: Insight[];
};

/** Repository Table V1 **/
export function RepositoryTable({ repository }: RepositoryTableProps) {
  if (!repository.length) return <NoMatchingInsights />;

  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader>User</TableHeader>
          <TableHeader>Insight</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {repository.map((insight) => (
          <TableRow
            key={insight.id}
            href={`/dashboard/repository/${insight.id}`}
          >
            <TableCell className="py-10">
              <div className="flex items-center gap-4">
                <Avatar
                  src={insight.user.data.profile.image_72}
                  className="size-10"
                />
                <div className="text-sm hidden sm:block">
                  <div>{insight.user.data.profile.real_name}</div>
                  <div className="text-zinc-500">
                    {new Date(insight.createdAt).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              <Text className="line-clamp-2">{insight.text}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/** Repository Table V2 **/
export function RepositoryTableV2({ repository }: RepositoryTableProps) {
  if (!repository.length) return <NoMatchingInsights />;

  return (
    <>
      {repository.map((insight) => (
        <div
          key={insight.id}
          className="relative grid grid-cols-1 border-b border-b-zinc-950/5 py-8 dark:border-b-white/5 first:border-t first:border-t-gray-200 first:dark:border-t-white/10 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 sm:font-medium">
              {new Date(insight.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            {insight.user && (
              <div className="mt-2.5 flex items-center gap-3">
                {insight.user.data.profile.image_72 && (
                  <Avatar
                    src={insight.user.data.profile.image_72}
                    className="size-6"
                  />
                )}
                <Text>{insight.user.data.profile.real_name}</Text>
              </div>
            )}
            <div className="hidden sm:block">
              <div className="mt-2.5 flex flex-wrap gap-2 ">
                {insight.tags &&
                  insight.tags.map((tag) => (
                    <Badge key={tag.text}>{tag.text}</Badge>
                  ))}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <Text className="line-clamp-2">{insight.text}</Text>
            <div className="mt-4">
              <Link
                href={`/dashboard/repository/${insight.id}`}
                className="flex items-center gap-1 text-sm/5"
              >
                <span className="absolute inset-0" />
                Read more
                <ChevronRightIcon className="size-4 fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
