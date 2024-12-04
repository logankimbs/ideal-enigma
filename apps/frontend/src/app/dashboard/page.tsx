import { Heading, Subheading } from '../../components/heading';
import { RepositoryPreview } from '../../components/repository-preview';
import { Stat } from '../../components/stat';
import { SummaryPreview } from '../../components/summary-preview';
import { getRecentInsights, getRecentSummary } from '../libs/api';

export default async function Home() {
  const recentSummary = await getRecentSummary();
  const recentInsights = await getRecentInsights();

  return (
    <>
      <Heading>Good afternoon!</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>My Weekly Overview</Subheading>
        {/*<div>*/}
        {/*  <Select name="period">*/}
        {/*    <option value="last_week">Last week</option>*/}
        {/*    <option value="last_two">Last two weeks</option>*/}
        {/*    <option value="last_month">Last month</option>*/}
        {/*    <option value="last_quarter">Last quarter</option>*/}
        {/*  </Select>*/}
        {/*</div>*/}
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total insights" value="$2.6M" change="+4.5%" />
        <Stat title="Total themes" value="$455" change="-0.5%" />
        <Stat title="Average insights" value="5,888" change="+4.5%" />
        {/* constant */}
        {/* 0-1 no flame*/}
        {/* 1-3 1 flame*/}
        {/* 3-5 2 flame*/}
        {/* 5+ 3 flame*/}
        <Stat title="Current streak" value="4" change="🔥🔥🔥" />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Company Weekly Overview</Subheading>
        {/*<div>*/}
        {/*  <Select name="period">*/}
        {/*    <option value="last_week">Last week</option>*/}
        {/*    <option value="last_two">Last two weeks</option>*/}
        {/*    <option value="last_month">Last month</option>*/}
        {/*    <option value="last_quarter">Last quarter</option>*/}
        {/*  </Select>*/}
        {/*</div>*/}
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total insights" value="$2.6M" change="+4.5%" />
        <Stat title="Total themes" value="$455" change="-0.5%" />
        <Stat title="Average insights per user" value="5,888" change="+4.5%" />
        <Stat title="Active contributors" value="823,067" change="+21.2%" />
      </div>
      <div className="mt-8 flex grid gap-8 sm:grid-cols-1 xl:grid-cols-2">
        {recentSummary && <SummaryPreview summary={recentSummary} />}
        {recentInsights && recentInsights.length > 0 && (
          <RepositoryPreview repository={recentInsights} />
        )}
      </div>
    </>
  );
}
