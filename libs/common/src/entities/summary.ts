import { Team } from './team';
import { Timestamp } from './timestamp';

export interface Summary extends Timestamp {
  id: string;
  data: SummaryData;
  startDate: Date;
  version: number;
  team: Team;
}

// IMPORTANT!!!
// As new versions are released, append the new version using a union.
export type SummaryData = SummaryTextV1;

/* ~~~~~ Version 1 ~~~~~ */
export interface SummaryTextV1 {
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
/* ~~~~~~~~~~~~~~~~~~~~~ */
