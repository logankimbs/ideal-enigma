import { Insight } from './insight';
import { Team } from './team';
import { Timestamp } from './timestamp';

export interface Summary extends Timestamp {
  id: string;
  data: SummaryData;
  startDate: Date;
  version: number;
  team: Team;
  insights: Insight[];
}

// SummaryData is a union type of all the summary versions we accept
// As new versions are released, append the new version using a union.
export type SummaryData = SummaryTextV1 | SummaryTextV2 | SummaryTextV3;

/* ~~~~~ Version 1 ~~~~~ */
export interface SummaryTextV1 {
  version: 1;
  themes: SummaryThemeV1[];
  actions: string[];
  conclusion: string;
}

export interface SummaryThemeV1 {
  title: string;
  objective: string;
  trend: string;
  insight: SummaryInsightV1;
}

export interface SummaryInsightV1 {
  origin: {
    userId: string;
    insight: string;
  };
  interpretation: string;
}

/* ~~~~~ Version 2 ~~~~~ */
export interface SummaryTextV2 {
  version: 2;
  themes: SummaryThemeV2[];
  actions: SummaryActionV2[];
  conclusion: string;
}

export interface SummaryThemeV2 {
  title: string;
  objective: string;
  themeSummary: string;
  insights: SummaryInsightV2[];
  action: string;
  responsibility: string;
}

export interface SummaryInsightV2 {
  origin: {
    id: string;
    userId: string;
    text: string;
  };
}

export interface SummaryActionV2 {
  text: string;
  responsibility: string;
}

/* ~~~~~ Version 3 ~~~~~ */
export interface SummaryTextV3 {
  themes: SummaryThemeV3[];
  conclusion: string;
}

export interface SummaryThemeV3 {
  title: string;
  objective: string;
  insightIds: string[];
  action: SummaryActionV3;
  summary: string;
}

export interface SummaryActionV3 {
  description: string;
  owners: string[];
}
