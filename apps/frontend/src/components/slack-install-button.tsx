import clsx from 'clsx';
import { Button } from './landing/button';

type Props = {
  logo?: boolean;
};

export function SlackInstallButton({ logo = true }: Props) {
  console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <Button
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/slack/install`}
      className={clsx({ 'gap-2': logo })}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logo-timeline/slack.svg" alt="Slack Logo" />
      )}
      Get started for free
    </Button>
  );
}
