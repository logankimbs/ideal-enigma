/* eslint-disable react/no-unescaped-entities */
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Avatar } from '../../../components/avatar';
import { Button } from '../../../components/landing/button';
import { Container } from '../../../components/landing/container';
import { Footer } from '../../../components/landing/footer';
import { GradientBackground } from '../../../components/landing/gradient';
import { Link } from '../../../components/landing/link';
import { Navbar } from '../../../components/landing/navbar';
import { Heading, Subheading } from '../../../components/landing/text';
import { fatalFlaw } from '../posts';

export default function TheFatalFlaw() {
  const post = fatalFlaw;

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar
          banner={
            <div className="flex items-center gap-1 rounded-full bg-[#b060ff] px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
              Beta
            </div>
          }
        />
        <Subheading className="mt-16">{post.publishedAt}</Subheading>
        <Heading as="h1" className="mt-2">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            <div className="flex items-center gap-3">
              <Avatar
                alt="Loop logo"
                src={post.author.image}
                className="size-6 outline-0"
              />
              <div className="text-sm/5 text-gray-700">Loop Team</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href={''}
                  className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                In the fast-paced world of startups, speed is everything. The
                pressure to build quickly, measure outcomes, and iterate fast
                often leads founders and teams to prioritize the "Build" and
                "Measure" phases of the Build-Measure-Learn (BML) cycle. But in
                the rush to bring products to market, many startups make a
                critical error: they de-prioritize the "Learn" phase. This
                oversight can be detrimental, undermining long-term success and
                leading to repeated mistakes, wasted resources, and missed
                opportunities for innovation.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Why Startups Sideline the Learning Phase
              </h2>
              <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    The Urge to Ship Fast:{' '}
                  </strong>
                  Startups often operate under tight timelines and intense
                  pressure from investors to deliver results quickly. This
                  urgency can push teams to focus on building and shipping
                  products as rapidly as possible, with less emphasis on
                  thoroughly analyzing what they’re learning along the way
                  (Growth Navigate).
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Data Overload and Mismanagement:{' '}
                  </strong>{' '}
                  While many startups collect vast amounts of data, they often
                  lack the resources or know-how to effectively analyze it.
                  Without clear processes in place to interpret this data and
                  extract actionable insights, the learning phase can become an
                  afterthought, leading to poorly informed decisions (GLOBIS
                  Insights).
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    A Bias Toward Action:{' '}
                  </strong>
                  Startup culture tends to celebrate action and risk-taking.
                  While these are valuable traits, they can also lead to a “just
                  do it” mentality that prioritizes building and measuring over
                  the reflective and often slower process of learning. This bias
                  can result in a cycle of continuous building without proper
                  learning, where mistakes are repeated rather than learned from
                  (Amazon Web Services, Inc.).
                </li>
              </ol>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                The Consequences of Ignoring the Learn Phase
              </h2>
              <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Inefficient Use of Resources:{' '}
                  </strong>
                  Without adequately learning from previous efforts, startups
                  risk wasting time, money, and talent on projects that are
                  doomed to fail from the outset. Learning from each iteration
                  is essential to optimizing resources and ensuring that every
                  new build is informed by the past (Growth Navigate).
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Missed Opportunities for Innovation:{' '}
                  </strong>{' '}
                  The "Learn" phase is where innovation truly happens. By
                  analyzing what worked, what didn’t, and why, startups can
                  pivot, iterate, or even abandon certain approaches to explore
                  more promising avenues. Ignoring this phase means potentially
                  overlooking breakthrough ideas that could have propelled the
                  business forward (Amazon Web Services, Inc.).
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Increased Risk of Failure:{' '}
                  </strong>
                  Startups are inherently risky, and the odds of failure are
                  high. But these odds are exacerbated when companies don’t take
                  the time to learn from their experiences. Failing to learn
                  means startups are more likely to make the same mistakes
                  repeatedly, decreasing their chances of long-term success
                  (GLOBIS Insights).
                </li>
              </ol>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                How to Reprioritize Learning in the Build Measure Learn Cycle
              </h2>
              <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Embed Learning into the Process:{' '}
                  </strong>
                  Make learning an integral part of your product development
                  cycle. This can be achieved by setting aside dedicated time
                  for reflection after each build-measure phase, ensuring that
                  insights are gathered and acted upon before moving forward.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Leverage Data Effectively:{' '}
                  </strong>{' '}
                  Invest in the tools and expertise needed to analyze data
                  efficiently. This ensures that the "Measure" phase feeds
                  directly into the "Learn" phase, providing the insights needed
                  to inform future builds.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Foster a Culture of Curiosity:{' '}
                  </strong>
                  Encourage a culture where questioning and learning are valued
                  as much as action. This can be achieved by rewarding teams for
                  the insights they uncover and ensuring that these learnings
                  are shared across the organization (Growth Navigate) (Amazon
                  Web Services, Inc.).
                </li>
              </ol>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                can play a pivotal role in this process by providing a
                structured way for teams to gather and share insights
                consistently. By integrating{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                into your workflow, you ensure that the "Learn" phase is never
                overlooked but is instead a core component of your innovation
                strategy.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Conclusion
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                In the race to grow and scale, startups that neglect the "Learn"
                phase of the BML cycle do so at their own peril. By failing to
                prioritize learning, these companies not only waste resources
                but also miss out on the very insights that could drive
                innovation and long-term success. The key to thriving in a
                competitive market is to balance the urgency to build and
                measure with the critical need to learn. Only by doing so can
                startups ensure they’re not just moving fast but also moving in
                the right direction.
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                By leveraging tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>,
                startups can create a structured approach to learning that
                ensures insights are systematically captured and applied,
                transforming potential failure points into stepping stones for
                growth.
              </p>
              <div className="mt-10">
                <Button variant="outline" href="/blog">
                  <ChevronLeftIcon className="size-4" />
                  Back to blog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
