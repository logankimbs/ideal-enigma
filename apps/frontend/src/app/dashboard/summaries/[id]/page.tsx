import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import {
  Insight,
  SummaryActionV2,
  SummaryTextV1,
  SummaryTextV2,
  SummaryThemeV1,
  SummaryThemeV2,
  User,
} from '@ideal-enigma/common';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AvatarGroup } from '../../../../components/avatar-group';
import { BadgeGroup } from '../../../../components/badge-group';
import { Divider } from '../../../../components/divider';
import { Link } from '../../../../components/link';
import SummaryInsights from '../../../../components/summary-insights';
import { getInsightsInSummary, getSummary } from '../../../libs/api';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Summary' };
}

interface SummaryProps {
  params: { id: string };
}

const formatTitle = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const getIntro = (count: number): string =>
  `This week, ${count} insights were submitted across various teams, highlighting trends, challenges, and opportunities aligned with the company's strategic objectives. Below is a summary of the most critical insights and actionable steps.`;

const getKeyThemes = (themes: SummaryThemeV1[]) => {
  return (
    <ol className="list-inside mt-4 mb-10">
      {themes.map((theme, index) => (
        <li key={index} className="list-decimal mb-10">
          <h3 className="inline text-base font-semibold text-zinc-950 dark:text-white">
            {theme.title}
          </h3>
          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Objective:{' '}
            </strong>
            {theme.objective}
          </p>
          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Trend:{' '}
            </strong>
            {theme.trend}
          </p>
          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Actionable Insight:{' '}
            </strong>
            {theme.insight.interpretation}
          </p>
        </li>
      ))}
    </ol>
  );
};

const getKeyThemesV2 = (themes: SummaryThemeV2[]) => {
  return (
    <ol className="list-inside mt-4 mb-10">
      {themes.map((theme, index) => (
        <li key={index} className="list-decimal mb-10">
          <h3 className="inline text-base font-semibold text-zinc-950 dark:text-white">
            {theme.title}
          </h3>
          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Objective:{' '}
            </strong>
            {theme.objective}
          </p>
          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Summary:{' '}
            </strong>
            {theme.themeSummary}
          </p>
          {/*<div className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">*/}
          {/*  <p>*/}
          {/*    <strong className="font-medium text-zinc-950 dark:text-white">*/}
          {/*      Insights:{' '}*/}
          {/*    </strong>*/}
          {/*  </p>*/}
          {/*  <ul className="list-inside mb-10">*/}
          {/*    {theme.insights.map((insight, index) => (*/}
          {/*      <li key={index}>{insight.origin.text}</li>*/}
          {/*    ))}*/}
          {/*  </ul>*/}
          {/*</div>*/}

          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Action:{' '}
            </strong>
            {theme.action}
          </p>

          <p className="text-base leading-loose my-0.5 text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              Responsibility:{' '}
            </strong>
            {theme.responsibility}
          </p>
        </li>
      ))}
    </ol>
  );
};

const getImmediateActions = (actions: string[]) => {
  return (
    <ul className="list-disc list-inside mt-4 mb-10">
      {actions.map((action, index) => (
        <li key={index} className="my-0.5">
          <p className="inline text-base leading-loose text-zinc-500 dark:text-zinc-400">
            {action}
          </p>
        </li>
      ))}
    </ul>
  );
};

const getImmediateActionsV2 = (actions: SummaryActionV2[]) => {
  return (
    <ul className="list-disc list-inside mt-4 mb-10">
      {actions.map((action, index) => (
        <li key={index} className="my-0.5">
          <p className="inline text-base leading-loose text-zinc-500 dark:text-zinc-400">
            <strong className="font-medium text-zinc-950 dark:text-white">
              {action.responsibility}:{' '}
            </strong>
            {action.text}
          </p>
        </li>
      ))}
    </ul>
  );
};

function getUniqueThemeValues(insights: Insight[]): string[] {
  const themeSet = new Set<string>();

  for (const insight of insights) {
    insight.tags?.forEach((tag) => {
      themeSet.add(tag.text);
    });
  }

  return Array.from(themeSet);
}

function getUniqueUsers(insights: Insight[]): User[] {
  const userMap = new Map<string, User>();

  for (const insight of insights) {
    userMap.set(insight.user.id, insight.user);
  }

  return Array.from(userMap.values());
}

export default async function Summary(props: SummaryProps) {
  const summary = await getSummary(props.params.id);
  const insights = await getInsightsInSummary(props.params.id);
  const themes = getUniqueThemeValues(insights);
  const users = getUniqueUsers(insights);

  if (!summary) notFound();
  return (
    <>
      <div className="mb-12">
        <Link
          href="/dashboard/summaries"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Summaries
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            <AvatarGroup users={users} />
            <BadgeGroup values={themes} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
              {formatTitle(summary.startDate)} -{' '}
              {formatTitle(summary.createdAt)}
            </h1>

            <p className="text-base leading-loose mt-6 mb-10 text-zinc-500 dark:text-zinc-400">
              {getIntro(insights.length)}
            </p>

            {summary.version === 1
              ? renderV1(summary.data as SummaryTextV1)
              : renderV2(summary.data as SummaryTextV2)}
          </div>
        </div>
      </div>

      {insights.length > 0 && (
        <>
          <Divider />
          <SummaryInsights insights={insights} />
        </>
      )}
    </>
  );
}

function renderV1(summary: SummaryTextV1) {
  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
          Key Themes
        </h2>
        {getKeyThemes(summary.themes)}
      </div>

      <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
        Immediate Actions
      </h2>
      {getImmediateActions(summary.actions)}

      <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
        Conclusion
      </h2>

      <p className="text-base leading-loose mt-4 mb-10 text-zinc-500 dark:text-zinc-400">
        {summary.conclusion}
      </p>
    </>
  );
}

function renderV2(summary: SummaryTextV2) {
  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
          Key Themes
        </h2>
        {getKeyThemesV2(summary.themes)}
      </div>

      <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
        Immediate Actions
      </h2>
      {getImmediateActionsV2(summary.actions)}

      <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
        Conclusion
      </h2>

      <p className="text-base leading-loose mt-4 mb-10 text-zinc-500 dark:text-zinc-400">
        {summary.conclusion}
      </p>
    </>
  );
}
