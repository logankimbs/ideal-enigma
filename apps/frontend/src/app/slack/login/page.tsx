import { redirect } from 'next/navigation';
import { GradientBackground } from '../../../components/landing/gradient';
import { Heading, Lead, Subheading } from '../../../components/landing/text';

type SlackLoginProps = {
  searchParams: Promise<{ code: string }>;
};

export default async function SlackLogin({ searchParams }: SlackLoginProps) {
  const { code } = await searchParams;

  if (!code) {
    redirect('/');
  }

  return (
    <main className="overflow-hidden bg-white">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-4xl">
          <Subheading>Loading...</Subheading>
          <Heading as="h1" className="mt-2">
            We are logging you in. {code}
          </Heading>
          <Lead className="mt-4">
            This should only take a couple of seconds.
          </Lead>
        </div>
      </div>
    </main>
  );
}
