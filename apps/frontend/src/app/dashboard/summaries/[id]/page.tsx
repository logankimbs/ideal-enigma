import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '../../../../components/badge';
import { Heading, Subheading } from '../../../../components/heading';
import { Link } from '../../../../components/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/table';
import { getEvent } from '../../../../data';
// import { Stat } from '../../../../components/stat';
import { getSummary, getSummaryInsights } from '../../../libs/api';
import { Avatar } from '../../../../components/avatar';
import SummaryDisplay from '../../../../components/summary-display';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const event = await getEvent(params.id);

  return {
    title: event?.name,
  };
}

export default async function Summary({ params }: { params: { id: string } }) {
  const summary = await getSummary(params.id);
  const insights = await getSummaryInsights(params.id);

  if (!summary) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/dashboard/summaries"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Summaries
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>
                LAST DATE -{' '}
                {new Date(summary.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Heading>
              <Badge color={summary.version === 1 ? 'lime' : 'zinc'}>
                Weekly
              </Badge>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      {/* <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat
          title="Total revenue"
          value={event.totalRevenue}
          change={event.totalRevenueChange}
        />
        <Stat
          title="Tickets sold"
          value={`${summary.ticketsSold}/${summary.ticketsAvailable}`}
          change={summary.ticketsSoldChange}
        />
        <Stat
          title="Pageviews"
          value={summary.pageViews}
          change={summary.pageViewsChange}
        />
      </div> */}
      <SummaryDisplay summary={summary} count={summary.data.actions.length} />
      <Subheading className="mt-12">Insights used</Subheading>
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
          {insights.map((insight) => (
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
