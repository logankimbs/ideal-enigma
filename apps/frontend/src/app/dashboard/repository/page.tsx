import type { Metadata } from 'next';
import { Avatar } from '../../../components/avatar';
import { Button } from '../../../components/button';
import { Heading } from '../../../components/heading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/table';
import { Input, InputGroup } from '../../../components/input';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Select } from '../../../components/select';
import { getRespository } from '../../libs/api';
import { Badge } from '../../../components/badge';

export const metadata: Metadata = {
  title: 'Repository',
};

export default async function Repository() {
  const repository = await getRespository();

  // TODO: If repository is empty display empty message

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
        <Button>Add insight</Button>
      </div>
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
              href={`/dashboard/repository/3017`}
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
              <TableCell className="truncate max-w-xs">
                {insight.text}
              </TableCell>
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
    </>
  );
}
