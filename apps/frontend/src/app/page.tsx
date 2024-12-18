import { BentoCard } from '../components/landing/bento-card';
import { Button } from '../components/landing/button';
import { Container } from '../components/landing/container';
import { Footer } from '../components/landing/footer';
import { Gradient } from '../components/landing/gradient';
import { Keyboard } from '../components/landing/keyboard';
import { LogoCloud } from '../components/landing/logo-cloud';
import { LogoCluster } from '../components/landing/logo-cluster';
import { Map } from '../components/landing/map';
import { Navbar } from '../components/landing/navbar';
import { Screenshot } from '../components/landing/screenshot';
import { Heading, Subheading } from '../components/landing/text';

function Hero() {
  console.log('BackendURL', process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-[32px] ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar
          banner={
            <div className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
              Currently testing in beta
            </div>
          }
        />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Cultivate a culture of curiosity.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            The ultimate learnings repository for fast-paced teams to capture,
            share, and discuss weekly insights.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/slack/install`}
              className="gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-timeline/slack.svg" alt="Slack Logo" /> Get
              started for free
            </Button>
            <Button
              variant="secondary"
              href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule a demo"
            >
              Schedule demo
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          A centralized repository of your teams learnings.
        </Heading>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
          className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
        />
      </Container>
    </div>
  );
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Value</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Build, Measure, and <strong>Learn</strong>
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Capture"
          title="Effortlessly capture employee insights"
          description="Loop seamlessly integrates with your team communication tool, making it easy to capture, organize, and share valuable insights across your team."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Centralize"
          title="Valuable information all in one place"
          description="Consolidate your team’s insights into a unified, searchable repository, ensuring knowledge is always at your fingertips."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Curate"
          title="Create actionable summaries based on employee insights"
          description="Loop leverages AI to transform submitted insights into actionable summaries, tailored for employees at all levels to quickly understand."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Circulate"
          title="Automate the distribution of knowledge"
          description="We deliver summaries to your team, sparking meaningful conversations, follow-ups, and actionable next steps."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Cultivate"
          title="Enable your team to operate with curiosity"
          description="Accelerate your team's growth by inspiring employees to lead with curiosity at the heart of their work."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  );
}

// function DarkBentoSection() {
//   return (
//     <div className="mx-2 mt-2 rounded-[32px] bg-gray-900 py-32">
//       <Container>
//         <Subheading dark>Outreach</Subheading>
//         <Heading as="h3" dark className="mt-2 max-w-3xl">
//           Customer outreach has never been easier.
//         </Heading>

//         <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
//           <BentoCard
//             dark
//             eyebrow="Networking"
//             title="Sell at the speed of light"
//             description="Our RadiantAI chat assistants analyze the sentiment of your conversations in real time, ensuring you're always one step ahead."
//             graphic={
//               <div className="h-80 bg-[url(/screenshots/networking.png)] bg-[size:851px_344px] bg-no-repeat" />
//             }
//             fade={['top']}
//             className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
//           />
//           <BentoCard
//             dark
//             eyebrow="Integrations"
//             title="Meet leads where they are"
//             description="With thousands of integrations, no one will be able to escape your cold outreach."
//             graphic={<LogoTimeline />}
//             // `!overflow-visible` is needed to work around a Chrome bug that disables the mask on the graphic.
//             className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
//           />
//           <BentoCard
//             dark
//             eyebrow="Meetings"
//             title="Smart call scheduling"
//             description="Automatically insert intro calls into your leads' calendars without their consent."
//             graphic={<LinkedAvatars />}
//             className="lg:col-span-2 lg:rounded-bl-4xl"
//           />
//           <BentoCard
//             dark
//             eyebrow="Engagement"
//             title="Become a thought leader"
//             description="RadiantAI automatically writes LinkedIn posts that relate current events to B2B sales, helping you build a reputation as a thought leader."
//             graphic={
//               <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-[size:851px_344px] bg-no-repeat" />
//             }
//             fade={['top']}
//             className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
//           />
//         </div>
//       </Container>
//     </div>
//   );
// }

export default async function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        {/* <DarkBentoSection /> */}
      </main>
      {/*<Testimonials />*/}
      <Footer />
    </div>
  );
}
