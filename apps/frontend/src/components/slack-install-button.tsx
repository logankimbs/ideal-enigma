import { Button } from './landing/button';

type Props = {
  logo?: boolean;
};

export function SlackInstallButton({ logo = true }: Props) {
  return (
    <Button
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/slack/install`}
      className={`${logo && 'gap-2'}`}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logo-timeline/slack.svg" alt="Slack Logo" />
      )}
      Get started for free
    </Button>
  );
}
