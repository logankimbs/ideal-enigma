import { Subheading } from '../../components/heading';
import { RepositoryPreview } from '../../components/repository-preview';
import { Stat } from '../../components/stat';
import { SummaryPreview } from '../../components/summary-preview';
import {
  getActiveContributors,
  getAverageTeamInsights,
  getAverageUserInsights,
  getRecentInsights,
  getRecentSummary,
  getTotalTeamInsights,
  getTotalTeamThemes,
  getTotalUserInsights,
  getTotalUserThemes,
  getUserStreak,
} from '../libs/api';

export default async function Home() {
  /* User Stats */
  const totalUserInsights = await getTotalUserInsights();
  const totalUserThemes = await getTotalUserThemes();
  const averageUserInsights = await getAverageUserInsights();
  const userStreak = await getUserStreak();

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
          value={totalUserInsights.value}
          change={totalUserInsights.change}
        />
        <Stat
          title="Total themes"
          value={totalUserThemes.value}
          change={totalUserThemes.change}
        />
        <Stat
          title="Average insights"
          value={`${averageUserInsights.average_including_current.toFixed(2)}`}
          change={`${averageUserInsights.change_from_excluding_to_including}`}
        />
        <Stat title="Current streak" value={`${userStreak.count}`} streak />
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
          value={`${averageTeamInsights.average_including_current.toFixed(2)}`}
          change={`${averageTeamInsights.change_from_excluding_to_including}`}
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
