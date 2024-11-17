import { SparklesIcon } from '@heroicons/react/16/solid';
import { Subheading } from './heading';
import { Text } from './text';

export default function EmptySummariesState() {
  return (
    <div className="flex justify-center">
      <div className="text-center max-w-lg">
        <SparklesIcon className="mb-4 size-12 mx-auto" />
        <Subheading className="mb-2">
          Looks like your team doesn’t have any summaries yet.
        </Subheading>
        <Text>
          Head over to our Slack app and submit an insight to get started. The
          more insights your team shares, the better the chance of getting a
          summary. Summaries are posted every Monday morning!
        </Text>
      </div>
    </div>
  );
}
