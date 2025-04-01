import clsx from 'clsx';
import { Button } from './landing/button';

type Props = {
  logo?: boolean;
  
  className?: string;
};

export function SlackInstallButton({
  logo = true,
  className,
  ...props
}: Props) {
  return (
    <Button
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/slack/install`}
      className={clsx({ 'gap-2': logo }, className)}
      {...props}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logo-timeline/slack.svg" alt="Slack Logo" />
      )}
      Get started for free
    </Button>
  );
}
