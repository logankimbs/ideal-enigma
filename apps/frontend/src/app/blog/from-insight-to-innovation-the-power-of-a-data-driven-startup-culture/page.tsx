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
import { fromInsightToInnovation } from '../posts';

export default function FromInsightToInnovation() {
  const post = fromInsightToInnovation;

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar
          banner={
            <div className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
              Currently testing in beta
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
              <Avatar alt="" src={post.author.image} className="size-6" />
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
                In the hyper-competitive landscape of startups, the ability to
                innovate rapidly and efficiently is often the difference between
                success and failure. At the heart of this capability lies a
                data-driven culture—one that prioritizes data in decision-making
                and encourages critical thinking and problem-solving across all
                levels of the organization. Such a culture not only accelerates
                innovation but also reduces time to market, providing startups
                with a crucial competitive edge.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                The Role of Data in Driving Innovation
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Data is more than just numbers; it’s the raw material from which
                valuable insights can be extracted. Startups that embed
                data-driven decision-making into their culture are better
                equipped to identify trends, predict customer needs, and make
                informed decisions that propel the business forward. As noted in
                McKinsey's research, data-driven organizations are 23 times more
                likely to acquire customers, six times as likely to retain those
                customers, and 19 times as likely to be profitable (Amazon Web
                Services, Inc.).
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                In a startup environment, where resources are often limited, the
                ability to make precise, data-backed decisions can streamline
                operations, reduce costs, and accelerate innovation. By
                fostering a culture that encourages the use of data in every
                aspect of the business—from product development to marketing
                strategies—startups can ensure that every decision is grounded
                in reality, reducing the risks associated with trial-and-error
                approaches (GLOBIS Insights).
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Fostering Critical Thinking and Problem-Solving
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Critical thinking and problem-solving are essential components
                of a data-driven culture. Encouraging employees to question
                assumptions, analyze data critically, and seek out innovative
                solutions leads to more effective problem-solving and drives
                continuous improvement. As highlighted in Harvard Business
                Review, companies that cultivate these skills tend to be more
                resilient, adaptable, and better positioned to navigate complex
                challenges (Growth Navigate).
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                play a crucial role in supporting this environment by helping
                teams collect, analyze, and share insights across the
                organization. By integrating data-driven insights into daily
                workflows,{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                enables employees to make informed decisions that align with the
                company’s strategic goals, fostering a culture where innovation
                thrives.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Conclusion
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Incorporating data-driven decision-making into a startup’s
                culture is not just a strategy; it’s a necessity. By leveraging
                data to inform decisions, fostering critical thinking, and
                encouraging problem-solving, startups can accelerate innovation,
                reduce time to market, and increase their chances of long-term
                success. With tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>,
                startups can seamlessly integrate these practices into their
                daily operations, ensuring that data-driven insights are at the
                forefront of every business decision.
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
