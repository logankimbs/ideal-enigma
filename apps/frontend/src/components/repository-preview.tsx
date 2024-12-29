import { Insight } from '@ideal-enigma/common';
import { Avatar } from './avatar';
import { Subheading } from './heading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Text } from './text';

type RepositoryPreviewProps = {
  repository: Insight[];
};

export async function RepositoryPreview({
  repository,
}: RepositoryPreviewProps) {
  return (
    <div className="mt-10">
      <div className="overflow-hidden rounded-lg border border-zinc-950/10 dark:border-white/10">
        <div className="px-4 py-5 sm:p-6">
          <Subheading>Recent Insights</Subheading>
          <Table
            dense
            className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
          >
            <TableHead>
              <TableRow>
                <TableHeader></TableHeader>
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {repository.map((insight) => (
                <TableRow
                  key={insight.id}
                  href={`/dashboard/repository/${insight.id}`}
                >
                  <TableCell className="py-4">
                    <div className="mx-2">
                      <Avatar
                        src={insight.user.data.profile.image_72}
                        className="size-8"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-normal break-words">
                    <div>{insight.user.data.profile.real_name}</div>
                    <Text className="line-clamp-1">{insight.text}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
