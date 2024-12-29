/****** ANALYTICS ******/
export type ActiveContributors = {
  this_week_avg: number;
  change_percent: number;
};

export type AverageInsights = {
  average_including_current: number;
  average_excluding_current: number;
  change_from_excluding_to_including: number;
};

export type TotalInsights = {
  last_7_days_count: string;
  previous_7_days_count: string;
  relative_difference_percent: string;
};

export type Stat = {
  value: string;
  change: string;
};

export type UserStreak = {
  count: number;
};
