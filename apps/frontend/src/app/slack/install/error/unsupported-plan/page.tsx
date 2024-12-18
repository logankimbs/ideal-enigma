import { Button } from '../../../../../components/landing/button';
import { GradientBackground } from '../../../../../components/landing/gradient';
import {
  Heading,
  Lead,
  Subheading,
} from '../../../../../components/landing/text';

export default function UnsupportedPlanErrorPage() {
  return (
    <main className="grid min-h-full bg-white px-6 py-24 sm:py-32 lg:px-8">
      <GradientBackground relative={false} />
      <div>
        <Subheading>Unsupported Plan</Subheading>
        <Heading as="h1" className="mt-2">
          We currently don’t support Slack Enterprise Grid plans.
        </Heading>
        <Lead className="mt-4">
          We’re actively working to expand support for Enterprise Grid plans in
          the future. In the meantime, our app is fully supported for standard
          Slack workspaces. We apologize for the inconvenience and appreciate
          your understanding.
        </Lead>
        <div className="mt-10 flex gap-x-6">
          <Button href={'/'}>Go back home</Button>
        </div>
      </div>
    </main>
  );
}
