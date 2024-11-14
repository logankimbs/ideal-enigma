import { Insight } from '@ideal-enigma/common';
import { Avatar } from './avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

type RepositoryStackedListProps = {
  repository: Insight[];
};

export function RepositoryStackedList(props: RepositoryStackedListProps) {
  const { repository } = props;

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
            <TableCell>
              <div className="flex items-center gap-4">
                <Avatar
                  src={insight.user.data.profile.image_72}
                  className="size-12"
                />

                <div className="hidden sm:block">
                  <div className="font-medium">
                    {insight.user.data.profile.real_name}
                  </div>

                  <div className="text-zinc-500">
                    {new Date(insight.createdAt).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Badges */}
              {/* <div className="flex flex-wrap gap-1 mt-6">
                {insight.tags &&
                  insight.tags.map((tag) => (
                    <Badge key={tag.text}>{tag.text}</Badge>
                  ))}
              </div> */}
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              <div className="line-clamp-3">{insight.text}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}