import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { SummaryThemeV1 } from '@ideal-enigma/common';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Divider } from '../../../../components/divider';
import { Heading } from '../../../../components/heading';
import { Link } from '../../../../components/link';
import RepositoryView from '../../../../components/repository-view';
import { getInsightsInSummary, getSummary } from '../../../libs/api';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Summary' };
}

interface SummaryProps {
  params: { id: string };
}

const getIntro = (count: number): string =>
  `This week, ${count} insights were submitted across various teams, highlighting trends, challenges, and opportunities aligned with the company's strategic objectives. Below is a summary of the most critical insights and actionable steps.`;

const getKeyThemes = (themes: SummaryThemeV1[]) =>
  themes.map((theme, index) => (
    <div key={index} className="mb-6 text-lg/6 font-medium sm:text-sm/6">
      <h3 className="font-bold text-base mb-1.5">{theme.title}</h3>

      <div>
        <strong>Objective:</strong> {theme.objective}
      </div>
      <div>
        <strong>Trend:</strong> {theme.trend}
      </div>
      <div>
        <strong>Actionable Insight:</strong> {theme.insight.interpretation}
      </div>
    </div>
  ));

const getImmediateActions = (actions: string[]) => {
  return (
    <ul className="list-disc ml-3.5">
      {actions.map((action, index) => (
        <li key={index} className="text-lg/6 font-medium sm:text-sm/6">
          {action}
        </li>
      ))}
    </ul>
  );
};

export default async function Summary(props: SummaryProps) {
  const summary = await getSummary(props.params.id);
  const insights = await getInsightsInSummary(props.params.id);

  if (!summary) notFound();

  return (
    <>
      <div>
        <Link
          href="/dashboard/summaries"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Summaries
        </Link>

        <Heading className="mt-8 mb-6">
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
        </Heading>

        <div className="mb-6 text-lg/6 font-medium sm:text-sm/6">
          {getIntro(summary.data.themes.length)}
        </div>

        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-950 dark:text-white">
            Key Themes
          </h2>
          {getKeyThemes(summary.data.themes)}
        </div>

        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-950 dark:text-white">
            Immediate Actions
          </h2>
          {getImmediateActions(summary.data.actions)}
        </div>

        <div className="mb-6 text-lg/6 font-medium sm:text-sm/6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-950 dark:text-white">
            Conclusion
          </h2>
          {summary.data.conclusion}
        </div>
      </div>

      {insights.length > 0 && (
        <>
          <Divider className="mt-10" />
          <div className="mt-8">
            <RepositoryView repository={insights} />
          </div>
        </>
      )}
    </>
  );
}
