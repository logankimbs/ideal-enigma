import { Button } from '../../../../../components/landing/button';
import { GradientBackground } from '../../../../../components/landing/gradient';
import {
  Heading,
  Lead,
  Subheading,
} from '../../../../../components/landing/text';

export default function UnauthorizedInstallErrorPage() {
  return (
    <main className="overflow-hidden bg-white">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-4xl">
          <Subheading>Access Restricted</Subheading>
          <Heading as="h1" className="mt-2">
            Only Slack workspace admins can install Loop.
          </Heading>
          <Lead className="mt-4">
            It looks like you don’t have the right permissions to install the
            app. No worries—just ask your Slack workspace admin to help with the
            installation.
          </Lead>
          <div className="mt-10 flex gap-x-6">
            <Button href={'/'}>Go back home</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
