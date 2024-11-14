import { Summary } from '@ideal-enigma/common';
import { Divider } from './divider';
import { Link } from './link';

type SummaryStackedListProps = {
  summaries: Summary[];
};

export function SummaryStackedList(props: SummaryStackedListProps) {
  const { summaries } = props;

  return (
    <ul className="mt-10">
      {summaries.map((summary, index) => (
        <>
          <li key={summary.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={summary.id} className="flex gap-6 py-6">
                <div className="space-y-1.5">
                  <div className="text-base/6 font-semibold">
                    <Link href={`/dashboard/summaries/${summary.id}`}>
                      {new Date(summary.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(summary.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Link>
                  </div>
                  <div className="text-xs/6 text-zinc-400">
                    {summary.data.actions.join(' ')}
                  </div>
                  {/* <div className="text-xs/6 text-zinc-600">
                      {`{number of insights submitted}`} insights submitted
                    </div> */}
                </div>
              </div>
            </div>
          </li>
        </>
      ))}
    </ul>
  );
}
