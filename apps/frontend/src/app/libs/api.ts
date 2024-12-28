import {
  ActiveContributors,
  AverageInsights,
  Insight,
  Summary,
  TotalInsights,
  TotalTags,
  User,
  UserStreak,
} from '@ideal-enigma/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from './session';

interface ApiRequestOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  endpoint: string;
  headers?: Record<string, string>;
  data?: unknown;
}

export async function api<T>(options: ApiRequestOptions): Promise<T> {
  const session = await getSession();

  const config: AxiosRequestConfig = {
    method: options.method,
    url: `${process.env.BACKEND_URL}/${options.endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
      ...options.headers,
    },
    data: options.data,
  };

  try {
    const response: AxiosResponse<T> = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(`Backend request failed: ${error}`);
    throw error;
  }
}

export async function getSessionUser(): Promise<User> {
  const session = await getSession();
  const response: User = await api({
    method: 'get',
    endpoint: `users/${session.payload.sub}`,
  });

  return response;
}

export async function getRespository(): Promise<Insight[]> {
  const session = await getSession();
  const response: Insight[] = await api({
    method: 'get',
    endpoint: `insights/repository?userId=${session.payload.sub}`,
  });

  return response;
}

export async function getRecentInsights(limit = 5): Promise<Insight[]> {
  const session = await getSession();
  const teamId = session.payload['https://slack.com/team_id'];
  const response: Insight[] = await api({
    method: 'get',
    endpoint: `teams/${teamId}/insights/recent?limit=${limit}`,
  });

  return response;
}

export async function getInsight(insightId: string): Promise<Insight> {
  const response: Insight = await api({
    method: 'get',
    endpoint: `insights?id=${insightId}`,
  });

  return response;
}

export async function getSummaries(): Promise<Summary[]> {
  const session = await getSession();
  const response: Summary[] = await api({
    method: 'get',
    endpoint: `summaries/team/${session.payload['https://slack.com/team_id']}`,
  });

  return response;
}

export async function getRecentSummary(): Promise<Summary> {
  const session = await getSession();
  const teamId = session.payload['https://slack.com/team_id'];
  const response: Summary = await api({
    method: 'get',
    endpoint: `teams/${teamId}/summaries/recent`,
  });

  return response;
}

export async function getSummary(summaryId: string): Promise<Summary> {
  const response: Summary = await api({
    method: 'get',
    endpoint: `summaries/${summaryId}`,
  });

  return response;
}

export async function getInsightsInSummary(
  summaryId: string
): Promise<Insight[]> {
  const response: Insight[] = await api({
    method: 'get',
    endpoint: `summaries/${summaryId}/insights`,
  });

  return response;
}

export async function getUsersForTeam(teamId: string): Promise<User[]> {
  return await api({
    method: 'get',
    endpoint: `teams/${teamId}/users`,
  });
}

export async function isOnboardingComplete(userId: string): Promise<boolean> {
  return await api({
    method: 'get',
    endpoint: `users/${userId}/isOnboardingComplete`,
  });
}

export async function getTotalUserTags(): Promise<TotalTags> {
  const session = await getSession();
  const userId = session.payload.sub;

  return await api({
    method: 'get',
    endpoint: `users/${userId}/tags/analytics`,
  });
}

export async function getTotalTeamTags(): Promise<TotalTags> {
  const session = await getSession();
  const teamId = session.payload['https://slack.com/team_id'];

  return await api({
    method: 'get',
    endpoint: `teams/${teamId}/tags/analytics`,
  });
}

export async function getTotalUserInsights(): Promise<TotalInsights> {
  const session = await getSession();
  const userId = session.payload.sub;

  return await api({
    method: 'get',
    endpoint: `users/${userId}/insights/total`,
  });
}

export async function getTotalTeamInsights(): Promise<TotalInsights> {
  const session = await getSession();
  const teamId = session.payload['https://slack.com/team_id'];

  return await api({
    method: 'get',
    endpoint: `teams/${teamId}/insights/total`,
  });
}

export async function getUserStreak(): Promise<UserStreak> {
  const session = await getSession();
  const userId = session.payload.sub;

  return await api({
    method: 'get',
    endpoint: `users/${userId}/insights/streak`,
  });
}

export async function getUserAverageInsight(): Promise<AverageInsights> {
  const session = await getSession();
  const userId = session.payload.sub;

  return await api({
    method: 'get',
    endpoint: `users/${userId}/insights/average`,
  });
}

export async function getTeamAverageInsight(): Promise<AverageInsights> {
  const session = await getSession();
  const teamId = session.payload['https://slack.com/team_id'];

  return await api({
    method: 'get',
    endpoint: `teams/${teamId}/insights/average`,
  });
}

export async function getActiveContributors(): Promise<ActiveContributors> {
  const session = await getSession();
  const teamId = session.payload['https://slack.com/team_id'];

  return await api({
    method: 'get',
    endpoint: `teams/${teamId}/contributors`,
  });
}
