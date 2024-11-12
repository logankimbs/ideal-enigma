import { Summary, SummaryThemeV1 } from '@ideal-enigma/common';
import React from 'react';
import { Badge } from './badge';
import { Heading } from './heading';

interface SummaryDisplayProps {
  summary: Summary;
  count: number;
}

export default function SummaryDisplay(props: SummaryDisplayProps) {
  const { summary, count } = props;

  const buildIntro = (count: number): string =>
    `This week, ${count} insights were submitted across various teams, highlighting trends, challenges, and opportunities aligned with the company's strategic objectives. Below is a summary of the most critical insights and actionable steps.`;

  const buildKeyThemes = (themes: SummaryThemeV1[]) =>
    themes.map((theme, index) => (
      <div key={index}>
        <h3 className="mb-4 text-xl/6 font-medium tracking-tight first:mt-0 last:mb-0">
          {index + 1}. {theme.title}
        </h3>
        <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
          <li className="pl-2 has-[br]:mb-8">
            <strong className="font-semibold">Objective:</strong>{' '}
            {theme.objective}
          </li>
          <li className="pl-2 has-[br]:mb-8">
            <strong className="font-semibold">Trend:</strong> {theme.trend}
          </li>
          <li className="pl-2 has-[br]:mb-8">
            <strong className="font-semibold">Actionable Insight:</strong>{' '}
            {theme.insight.interpretation}
          </li>
        </ul>
        <p className="my-6 text-base/8 first:mt-0 last:mb-0"></p>
      </div>
    ));

  const buildImmediateActions = (actions: string[]) =>
    actions.map((action, index) => (
      <li key={index} className="pl-2 has-[br]:mb-8">
        {action}
      </li>
    ));

  return (
    <main className="overflow-hidden">
      <Heading className="mt-6">
        Nov 1, 2024 -{' '}
        {new Date(summary.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </Heading>

      <div className="mt-4 grid grid-cols-1 gap-8 ">
        {Array.isArray(summary.data.actions) && (
          <div className="flex flex-wrap gap-2">
            {summary.data.themes.map((theme) => (
              <Badge key={theme.insight.origin.insight}>{theme.title}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Introduction Section */}
      <p className="mt-8 my-6 text-base/8">{buildIntro(count)}</p>

      {/* Key Themes Section */}
      <h2 className="mb-6 mt-8 text-2xl/6 font-medium tracking-tight first:mt-0 last:mb-0">
        Key Themes
      </h2>
      {buildKeyThemes(summary.data.themes)}

      {/* Immediate Actions Section */}
      <h2 className="mb-6 mt-8 text-2xl/6 font-medium tracking-tight first:mt-0 last:mb-0">
        Immediate Actions
      </h2>
      <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
        {buildImmediateActions(summary.data.actions)}
        <p className="my-6 text-base/8 first:mt-0 last:mb-0"></p>
      </ul>

      {/* Conclusion Section */}
      <p className="my-6 text-base/8 first:mt-0 last:mb-0">
        {summary.data.conclusion}
      </p>

      <hr className="my-6 border-t border-gray-200" />
    </main>
  );
};
