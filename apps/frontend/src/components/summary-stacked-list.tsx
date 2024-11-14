import { Summary } from '@ideal-enigma/common';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Text } from './text';

type SummaryStackedListProps = {
  summaries: Summary[];
};

export function SummaryStackedList(props: SummaryStackedListProps) {
  const { summaries } = props;

  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {summaries.map((summary) => (
          <TableRow
            key={summary.id}
            href={`/dashboard/summaries/${summary.id}`}
          >
            <TableCell>
              <div className="gap-4">
                <div className="font-medium">
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
                </div>

                <div className="whitespace-normal break-words line-clamp-3">
                  <Text>{summary.data.actions.join(' ')}</Text>
                </div>
              </div>

              {/* Badges */}
              {/* <div className="flex flex-wrap gap-1 mt-6">
                {insight.tags &&
                  insight.tags.map((tag) => (
                    <Badge key={tag.text}>{tag.text}</Badge>
                  ))}
              </div> */}
            </TableCell>
            {/* <TableCell className="whitespace-normal break-words">
              <div className="line-clamp-3">
                {summary.data.actions.join(' ')}
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


// return (
//   <ul className="mt-10">
//     {summaries.map((summary, index) => (
//       <>
//         <li key={summary.id}>
//           <Divider soft={index > 0} />
//           <div className="flex items-center justify-between">
//             <div key={summary.id} className="flex gap-6 py-6">
//               <div className="space-y-1.5">
//                 <div className="text-base/6 font-semibold">
//                   <Link href={`/dashboard/summaries/${summary.id}`}>
                    // {new Date(summary.startDate).toLocaleDateString('en-US', {
                    //   year: 'numeric',
                    //   month: 'short',
                    //   day: 'numeric',
                    // })}{' '}
                    // -{' '}
                    // {new Date(summary.createdAt).toLocaleDateString('en-US', {
                    //   year: 'numeric',
                    //   month: 'short',
                    //   day: 'numeric',
                    // })}
//                   </Link>
//                 </div>
//                 <div className="text-xs/6 text-zinc-400">
//                   {summary.data.actions.join(' ')}
//                 </div>
//                 {/* <div className="text-xs/6 text-zinc-600">
//                     {`{number of insights submitted}`} insights submitted
//                   </div> */}
//               </div>
//             </div>
//           </div>
//         </li>
//       </>
//     ))}
//   </ul>
// );
