import { Insight } from '@ideal-enigma/common';
import { Avatar } from './avatar';
import { Divider } from './divider';
import { Subheading } from './heading';
import { Table, TableBody, TableCell, TableRow } from './table';
import { Text } from './text';

type RepositoryPreviewProps = {
  repository: Insight[];
};

export async function RepositoryPreview({
  repository,
}: RepositoryPreviewProps) {
  return (
    <>
      <div className="flex items-end justify-between">
        <Subheading>Recent Insights</Subheading>
      </div>
      <Divider className="mt-4" />
      <div className="mt-3">
        <Table
          dense
          striped
          className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
        >
          <TableBody>
            {repository.map((insight) => (
              <TableRow
                key={insight.id}
                href={`/dashboard/repository/${insight.id}`}
              >
                <TableCell className="py-2">
                  <div className="flex items-center gap-4">
                    <div className="mx-2">
                      <Avatar
                        src={insight.user.data.profile.image_72}
                        className="size-10"
                      />
                    </div>
                    <div className="whitespace-normal break-words">
                      <div>{insight.user.data.profile.real_name}</div>
                      <Text className="line-clamp-1">{insight.text}</Text>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
