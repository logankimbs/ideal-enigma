import { User } from '../entities';

export type Stat = {
  value: string;
  change: string;
};

export type UserStats = {
  totalInsights: Stat;
  totalThemes: Stat;
  averageInsights: Stat;
  streak: string;
};

export type TeamStats = {
  totalInsights: Stat;
  totalThemes: Stat;
  averageInsights: Stat;
  activeContributors: Stat;
};

export type LoginResponse = {
  token: string;
  user: User;
};
