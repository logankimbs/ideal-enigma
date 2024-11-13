import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '../../../../components/badge';
import { Heading } from '../../../../components/heading';
import { Link } from '../../../../components/link';
import { getInsight } from '../../../libs/api';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Insight' };
}

export default async function Insight({ params }: { params: { id: string } }) {
  const insight = await getInsight(params.id);

  if (!insight) notFound();

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/dashboard/repository"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Repository
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 pb-4 gap-8 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
        <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
          {insight.user && (
            <div className="flex items-center gap-3">
              {insight.user.data.profile.image_72 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt=""
                  src={insight.user.data.profile.image_72}
                  className="aspect-square size-6 rounded-full object-cover"
                />
              )}
              <div className="text-sm/5">
                {insight.user.data.profile.real_name}
              </div>
            </div>
          )}
          {Array.isArray(insight.tags) && (
            <div className="flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <Badge key={tag.id}>{tag.text}</Badge>
              ))}
            </div>
          )}
        </div>
        <div>
          <Heading className="mb-4">
            {new Date(insight.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Heading>
          <p className='"my-6 text-base/8 first:mt-0 last:mb-0"'>
            {insight.text}
          </p>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-200" />
    </>
  );
}
