import { Button } from '../../../../components/landing/button';
import { GradientBackground } from '../../../../components/landing/gradient';
import { Heading, Lead, Subheading } from '../../../../components/landing/text';

export default function InstallErrorPage(): React.ReactElement {
  return (
    <main className="grid min-h-full bg-white px-6 py-24 sm:py-32 lg:px-8">
      <GradientBackground relative={false} />
      <div>
        <Subheading>Something Went Wrong</Subheading>
        <Heading as="h1" className="mt-2">
          We couldn’t complete the install.
        </Heading>
        <Lead className="mt-4">
          It looks like something didn’t go as planned. This could be due to a
          temporary issue or an unexpected error. Please try again in a few
          minutes. If the issue persists, don’t hesitate to contact our support
          team for assistance. We apologize for the inconvenience and appreciate
          your patience.
        </Lead>
        <div className="mt-10 flex gap-x-6">
          <Button href={'/'}>Go back home</Button>
        </div>
      </div>
    </main>
  );
}
