import { Square2StackIcon } from '@heroicons/react/16/solid';
import { Subheading } from './heading';
import { Text } from './text';

export default function EmptyRepositoryState() {
  return (
    <div className="flex justify-center">
      <div className="text-center max-w-lg">
        <Square2StackIcon className="mb-4 size-12 mx-auto" />
        <Subheading className="mb-2">
          Looks like no one on your team has submitted an insight yet.
        </Subheading>
        <Text>
          Head over to our Slack app and be the first to submit an insight. The
          more insights your team shares, the better the chance of getting a
          summary. Summaries are posted every Monday morning!
        </Text>
      </div>
    </div>
  );
}
