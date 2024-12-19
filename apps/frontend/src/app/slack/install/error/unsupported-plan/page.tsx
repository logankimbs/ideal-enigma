import { Button } from '../../../../../components/landing/button';
import { GradientBackground } from '../../../../../components/landing/gradient';
import {
  Heading,
  Lead,
  Subheading,
} from '../../../../../components/landing/text';

export default function UnsupportedPlanErrorPage() {
  return (
    <main className="overflow-hidden bg-white">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-4xl">
          <Subheading>Unsupported Plan</Subheading>
          <Heading as="h1" className="mt-2">
            We currently don’t support Slack Enterprise Grid plans.
          </Heading>
          <Lead className="mt-4">
            We’re actively working to expand support for Enterprise Grid plans
            in the future. In the meantime, our app is fully supported for
            standard Slack workspaces. We apologize for the inconvenience and
            appreciate your understanding.
          </Lead>
          <div className="mt-10 flex gap-x-6">
            <Button href={'/'}>Go back home</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
