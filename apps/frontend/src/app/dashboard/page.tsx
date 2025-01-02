import { Subheading } from '../../components/heading';
import { RepositoryPreview } from '../../components/repository-preview';
import { Stat } from '../../components/stat';
import { SummaryPreview } from '../../components/summary-preview';
import {
  getActiveContributors,
  getAverageTeamInsights,
  getRecentInsights,
  getRecentSummary,
  getTotalTeamInsights,
  getTotalTeamThemes,
  getUserStats,
} from '../libs/api';

export default async function Home() {
  const userStats = await getUserStats();

  /* Team Stats */
  const totalTeamInsights = await getTotalTeamInsights();
  const totalTeamThemes = await getTotalTeamThemes();
  const averageTeamInsights = await getAverageTeamInsights();
  const teamContributors = await getActiveContributors();

  const recentSummary = await getRecentSummary();
  const recentInsights = await getRecentInsights(4);

  return (
    <>
      <div className="flex items-end justify-between">
        <Subheading>My Weekly Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total insights"
          value={userStats.totalInsights.value}
          change={userStats.totalInsights.change}
        />
        <Stat
          title="Total themes"
          value={userStats.totalThemes.value}
          change={userStats.totalThemes.change}
        />
        <Stat
          title="Average insights"
          value={userStats.averageInsights.value}
          change={userStats.averageInsights.change}
        />
        <Stat title="Current streak" value={userStats.streak} streak />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Company Weekly Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total insights"
          value={totalTeamInsights.value}
          change={totalTeamInsights.change}
        />
        <Stat
          title="Total themes"
          value={totalTeamThemes.value}
          change={totalTeamThemes.change}
        />
        <Stat
          title="Average insights per user"
          value={averageTeamInsights.value}
          change={averageTeamInsights.change}
        />
        <Stat
          title="Active contributors"
          value={`${teamContributors.this_week_avg}`}
          change={`${teamContributors.change_percent}`}
        />
      </div>
      <div
        className={`mt-8 grid gap-8 sm:grid-cols-1 ${
          recentSummary && recentInsights?.length
            ? 'xl:grid-cols-2'
            : 'xl:grid-cols-1'
        } items-stretch`}
      >
        {recentSummary && (
          <div className="h-full">
            <SummaryPreview summary={recentSummary} />
          </div>
        )}

        {recentInsights && recentInsights.length > 0 && (
          <div className="h-full">
            <RepositoryPreview repository={recentInsights} />
          </div>
        )}
      </div>
    </>
  );
}
