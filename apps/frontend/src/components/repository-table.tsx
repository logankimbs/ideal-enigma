import { Insight } from '@ideal-enigma/common';
import { Avatar } from './avatar';
import { Badge } from './badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

type RepositoryTableProps = {
  repository: Insight[];
};

export function RepositoryTable(props: RepositoryTableProps) {
  const { repository } = props;

  return (
    <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
      <TableHead>
        <TableRow>
          <TableHeader>Date</TableHeader>
          <TableHeader>Author</TableHeader>
          <TableHeader>Insight</TableHeader>
          <TableHeader className="text-right"></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {repository.map((insight) => (
          <TableRow
            key={insight.id}
            href={`/dashboard/repository/${insight.id}`}
            title={`insight #${insight.id}`}
          >
            <TableCell className="text-zinc-500">
              {new Date(insight.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar
                  src={insight.user.data.profile.image_72}
                  className="size-6"
                />
                <span className="text-zinc-500">
                  {insight.user.data.profile.first_name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="text-zinc-500 line-clamp-2">
                  {insight.text}
                </span>
              </div>
            </TableCell>
            <TableCell className="flex line-clamp-2">{insight.text}</TableCell>
            <TableCell className="text-right">
              {insight.tags
                ? insight.tags.map((tag) => (
                    <Badge key={tag.text} style={{ marginLeft: '4px' }}>
                      {tag.text}
                    </Badge>
                  ))
                : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
