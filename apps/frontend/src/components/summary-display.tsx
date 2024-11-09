import { Summary, SummaryThemeV1 } from '@ideal-enigma/common';
import React from 'react';

interface SummaryDisplayProps {
  summary: Summary;
  count: number;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, count }) => {
  const buildIntro = (count: number): string =>
    `This week, ${count} insights were submitted across various teams, highlighting trends, challenges, and opportunities aligned with the company's strategic objectives. Below is a summary of the most critical insights and actionable steps.`;

  const buildKeyThemes = (themes: SummaryThemeV1[]) =>
    themes.map((theme, index) => (
      <div key={index} className="theme mb-4">
        <h4 className="font-bold text-lg">
          {index + 1}. {theme.title}
        </h4>
        <p>
          <strong>Objective:</strong> {theme.objective}
        </p>
        <p>
          <strong>Trend:</strong> {theme.trend}
        </p>
        <p>
          <strong>Actionable Insight:</strong> {theme.insight.interpretation}
        </p>
      </div>
    ));

  const buildImmediateActions = (actions: string[]) =>
    actions.map((action, index) => (
      <li key={index} className="mb-2">
        {action}
      </li>
    ));

  return (
    <div className="mt-8">
      {/* Introduction Section */}
      <div className="mb-4">
        <p>{buildIntro(count)}</p>
      </div>

      {/* Key Themes Section */}
      <div className="key-themes mb-4">
        <h3 className="text-lg font-semibold">Key Themes</h3>
        {buildKeyThemes(summary.data.themes)}
      </div>

      {/* Immediate Actions Section */}
      <div className="immediate-actions mb-6">
        <h3 className="text-lg font-semibold">Immediate Actions</h3>
        <ul className="list-disc list-inside">
          {buildImmediateActions(summary.data.actions)}
        </ul>
      </div>

      {/* Conclusion Section */}
      <div className="conclusion">
        <p>{summary.data.conclusion}</p>
      </div>
    </div>
  );
};

export default SummaryDisplay;
