import { Heading, Subheading } from '../../components/heading';
import { RepositoryPreview } from '../../components/repository-preview';
import { Stat } from '../../components/stat';
import { SummaryPreview } from '../../components/summary-preview';
import {
  getRecentInsights,
  getRecentSummary,
  getTotalTeamInsights,
  getTotalUserInsights,
  getTotalUserTags,
  getTotalTeamTags,
} from '../libs/api';

export default async function Home() {
  const totalUserInsights = await getTotalUserInsights();
  const totalTeamInsights = await getTotalTeamInsights();
  const recentSummary = await getRecentSummary();
  const recentInsights = await getRecentInsights();
  const userTagsAnalytics = await getTotalUserTags();
  const teamTagsAnalytics = await getTotalTeamTags();

  return (
    <>
      <Heading>Good afternoon!</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>My Weekly Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total insights"
          value={totalUserInsights.last_7_days_count}
          change={`${parseFloat(
            totalUserInsights.relative_difference_percent
          ).toFixed(1)}%`}
        />
        <Stat title="Total themes" value={userTagsAnalytics.total_tags_current} change={`${parseFloat(
          userTagsAnalytics.relative_difference_percent
        ).toFixed(1)}%`} />
        <Stat title="Average insights" value="0.8" change="+4.5%" />
        {/* 0-1 no flame. 1-3 one flame. 3-5 two flames. 5+ three flames. */}
        <Stat title="Current streak" value="4" change="🔥🔥🔥" />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Company Weekly Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total insights"
          value={totalTeamInsights.last_7_days_count}
          change={`${parseFloat(
            totalTeamInsights.relative_difference_percent
          ).toFixed(1)}%`}
        />
        <Stat title="Total themes" value={teamTagsAnalytics.total_tags_current} change={`${parseFloat(
          teamTagsAnalytics.relative_difference_percent
        ).toFixed(1)}%`} />
        <Stat title="Average insights per user" value="2" change="+4.5%" />
        <Stat title="Active contributors" value="150" change="+21.2%" />
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-1 xl:grid-cols-2">
        {recentSummary && <SummaryPreview summary={recentSummary} />}
        {recentInsights && recentInsights.length > 0 && (
          <RepositoryPreview repository={recentInsights} />
        )}
      </div>
    </>
  );
}
