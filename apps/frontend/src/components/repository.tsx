import { Insight } from '@ideal-enigma/common';
import { Avatar } from './avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

type RepositoryTableProps = {
  insights: Insight[];
};

function RepositoryTable(props: RepositoryTableProps) {
  const { insights } = props;

  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          <TableHeader>User</TableHeader>
          <TableHeader>Insight</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {insights.map((insight) => (
          <TableRow
            key={insight.id}
            href={`/dashboard/repository/${insight.id}`}
          >
            <TableCell>
              <div className="flex items-center gap-4">
                <Avatar
                  src={insight.user.data.profile.image_72}
                  className="size-10"
                />

                <div className="text-sm hidden sm:block">
                  <div>{insight.user.data.profile.real_name}</div>

                  <div className="text-zinc-500">
                    {new Date(insight.createdAt).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </div>
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
            <TableCell className="whitespace-normal break-words">
              <Text className="line-clamp-2">{insight.text}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function filterRepository(
  repository: Insight[],
  query: string,
  activeButton: 'All' | 'Mine',
  userId?: string
): Insight[] {
  return repository.filter((insight) => {
    const textMatch = insight.text.toLowerCase().includes(query.toLowerCase());
    const tagsMatch = insight.tags?.some((tag) =>
      tag.text.toLowerCase().includes(query.toLowerCase())
    );
    const userMatch = activeButton === 'All' || insight.user.id === userId;

    return (textMatch || tagsMatch) && userMatch;
  });
}

// function SearchBar({
//   query,
//   setQuery,
//   setActiveButton,
//   activeButton,
// }) {
//   const buttons = [
//     { id: 'All', label: 'All insights' },
//     { id: 'Mine', label: 'Mine' },
//   ];

//   return (
//     <div className="max-sm:w-full sm:flex-1">
//       <Heading>Repository</Heading>
//       <div className="mt-4 flex max-w-xl gap-4">
//         <div className="flex-1">
//           <InputGroup>
//             <MagnifyingGlassIcon />
//             <Input
//               placeholder="Search repository&hellip;"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </InputGroup>
//         </div>
//         <Select name="sort_by">
//           <option value="name">Sort by name</option>
//           <option value="date">Sort by date</option>
//           <option value="status">Sort by status</option>
//         </Select>
//       </div>
//       <div className="mt-4">
//         <ButtonGroup
//           buttons={buttons}
//           activeButton={activeButton}
//           onSetActive={setActiveButton}
//         />
//       </div>
//     </div>
//   );
// }

// type RepositoryProps = {
//   repository: Insight[];
// };

// export function Repository(props: RepositoryProps) {
//   const { repository } = props;

//   if (!repository.length) return <EmptyRepositoryState />;

//   return (

//   )
// }
