import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '../../../../components/link';
import { getInsight } from '../../../libs/api';
import { Avatar } from '../../../../components/avatar';
import { Badge } from '../../../../components/badge';
import { Text } from '../../../../components/text';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Insight' };
}

interface InsightProps {
  params: { id: string };
}

export default async function Insight(props: InsightProps) {
  const insight = await getInsight(props.params.id);

  if (!insight) notFound();

  const user = insight.user.data.profile;

  return (
    <>
      <Link
        href="/dashboard/repository"
        className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
      >
        <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        Repository
      </Link>

      <div className="my-8 flex flex-wrap items-center gap-6 max-lg:justify-between lg:flex-col lg:items-start">
        <div className="flex items-center gap-4">
          <Avatar src={user.image_72} className="size-12" />

          <div className="font-medium">
            <div>{user.real_name}</div>

            <div className="text-zinc-500">
              <a href={`mailto:${user.email}`} className="hover:text-zinc-700">
                {user.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="font-medium">
        <div className="mb-4">
          {new Date(insight.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <Text className="mb-6">{insight.text}</Text>

        <div className="flex flex-wrap gap-2">
          {insight.tags &&
            insight.tags.map((tag) => <Badge key={tag.text}>{tag.text}</Badge>)}
        </div>
      </div>

      <hr className="my-8 border-t border-t-zinc-950/10 dark:border-t-white/10" />
    </>
  );
}
