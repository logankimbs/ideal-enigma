import { Insight } from '@ideal-enigma/common';
import { Badge } from './badge';
import { Link } from './landing/link';

type RepositoryStackedListProps = {
  repository: Insight[];
};

export function RepositoryStackedList(props: RepositoryStackedListProps) {
  const { repository } = props;

  return (
    <div className="mt-10">
      {repository.map((insight) => (
        <div
          key={insight.id}
          className="relative grid grid-cols-1 border-t border-t-zinc-950/10 dark:border-t-white/10 py-6 first:border-t first:border-b-zinc-950/10 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            {insight.user && (
              <div className="flex items-center gap-3">
                {insight.user.data.profile.image_72 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={`${insight.user.data.profile.real_name} profile picture`}
                    src={insight.user.data.profile.image_72}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5">
                  {insight.user.data.profile.real_name}
                </div>
              </div>
            )}

            <div className="flex items-center mt-4 text-base/7 font-medium gap-2">
              {insight.tags
                ? insight.tags.map((tag) => (
                    <Badge key={tag.text}>{tag.text}</Badge>
                  ))
                : ''}
            </div>
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <div className="">
              {new Date(insight.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <p className="mt-3 text-xs/6 text-zinc-400 line-clamp-2">
              {insight.text}
            </p>
            <div>
              <Link href={`/dashboard/repository/${insight.id}`}>
                <span className="absolute inset-0" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
