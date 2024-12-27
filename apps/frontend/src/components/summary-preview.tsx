import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { Summary } from '@ideal-enigma/common';
import { Badge } from './badge';
import { Divider } from './divider';
import { Subheading } from './heading';
import { Link } from './link';
import { Strong, Text } from './text';

type SummaryPreviewProps = {
  summary: Summary;
};

export async function SummaryPreview({ summary }: SummaryPreviewProps) {
  return (
    <div className="mt-10">
      <div className="overflow-hidden rounded-lg border border-zinc-950/10 dark:border-white/10">
        <div className="px-4 py-5 sm:p-6">
          <Subheading>Recent Summary</Subheading>
          <Divider className="mt-4" />
          <Text className="mt-4">
            {' '}
            <Strong>
              {new Date(summary.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              -{' '}
              {new Date(summary.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Strong>
          </Text>
          {/*<Subheading className="mt-4">*/}
          {/*  {new Date(summary.startDate).toLocaleDateString('en-US', {*/}
          {/*    year: 'numeric',*/}
          {/*    month: 'long',*/}
          {/*    day: 'numeric',*/}
          {/*  })}{' '}*/}
          {/*  -{' '}*/}
          {/*  {new Date(summary.createdAt).toLocaleDateString('en-US', {*/}
          {/*    year: 'numeric',*/}
          {/*    month: 'long',*/}
          {/*    day: 'numeric',*/}
          {/*  })}*/}
          {/*</Subheading>*/}
          {Array.isArray(summary.data.actions) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {summary.data.themes.map((theme, index) => (
                <Badge key={index}>{theme.title}</Badge>
              ))}
            </div>
          )}
          <Text className="mt-4">{summary.data.conclusion}</Text>
          <Link
            href={`/dashboard/summaries/${summary.id}`}
            className="flex items-center gap-1 text-sm/5 mt-4"
          >
            Read more
            <ChevronRightIcon className="size-4 fill-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
