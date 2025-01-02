import { Subheading } from '../../components/heading';
import { RepositoryPreview } from '../../components/repository-preview';
import { Stat } from '../../components/stat';
import { SummaryPreview } from '../../components/summary-preview';
import {
  getRecentInsights,
  getRecentSummary,
  getTeamStats,
  getUserStats,
} from '../libs/api';

export default async function Home() {
  const userStats = await getUserStats();
  const teamStats = await getTeamStats();
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
          value={teamStats.totalInsights.value}
          change={teamStats.totalInsights.change}
        />
        <Stat
          title="Total themes"
          value={teamStats.totalThemes.value}
          change={teamStats.totalThemes.change}
        />
        <Stat
          title="Average insights per user"
          value={teamStats.averageInsights.value}
          change={teamStats.averageInsights.change}
        />
        <Stat
          title="Active contributors"
          value={teamStats.activeContributors.value}
          change={teamStats.activeContributors.change}
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
