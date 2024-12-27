import { Subheading } from '../../components/heading';
import { RepositoryPreview } from '../../components/repository-preview';
import { Stat } from '../../components/stat';
import { SummaryPreview } from '../../components/summary-preview';
import { getRecentInsights, getRecentSummary } from '../libs/api';

export default async function Home() {
  const recentSummary = await getRecentSummary();
  const recentInsights = await getRecentInsights();

  return (
    <>
      <div className="flex items-end justify-between">
        <Subheading>My Weekly Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total insights" value="87" change="+4.5%" />
        <Stat title="Total themes" value="10" change="-0.5%" />
        <Stat title="Average insights" value="0.8" change="+4.5%" />
        {/* 0-1 no flame. 1-3 one flame. 3-5 two flames. 5+ three flames. */}
        <Stat title="Current streak" value="4" change="🔥🔥🔥" />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Company Weekly Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total insights" value="2,746" change="+4.5%" />
        <Stat title="Total themes" value="150" change="-0.5%" />
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
