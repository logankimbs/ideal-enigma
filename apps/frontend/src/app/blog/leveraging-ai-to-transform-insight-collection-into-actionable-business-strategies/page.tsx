import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Avatar } from '../../../components/avatar';
import { Button } from '../../../components/landing/button';
import { Container } from '../../../components/landing/container';
import { Footer } from '../../../components/landing/footer';
import { GradientBackground } from '../../../components/landing/gradient';
import { Link } from '../../../components/landing/link';
import { Navbar } from '../../../components/landing/navbar';
import { Heading, Subheading } from '../../../components/landing/text';
import { leveragingAi } from '../posts';

export default function LeveragingAIToTransformInsightCollection() {
  const post = leveragingAi;

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
                In the age of big data, the ability to collect, analyze, and act
                on insights is a critical factor in driving business success.
                For startups, harnessing the power of AI to transform raw data
                into actionable business strategies can be a game-changer. By
                leveraging AI-powered tools like Loop, companies can streamline
                the insight collection process, identify patterns and trends,
                and develop strategies that drive growth and innovation.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                The Role of AI in Insight Collection
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Artificial intelligence has revolutionized the way businesses
                handle data. With AI, companies can analyze vast amounts of
                information at unprecedented speeds, uncovering insights that
                might otherwise go unnoticed. For startups, this capability is
                particularly valuable, as it allows them to quickly adapt to
                changing market conditions, respond to customer needs, and stay
                ahead of competitors (Amazon Web Services, Inc.).
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                AI-powered tools like Loop take this a step further by not only
                collecting insights but also synthesizing them into actionable
                strategies. By analyzing data from across the organization, Loop
                can identify key trends, highlight areas for improvement, and
                suggest strategies that align with the company’s goals. This
                level of analysis not only saves time but also ensures that
                every decision is based on the most relevant and up-to-date
                information (GLOBIS Insights).
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Turning Insights into Actionable Strategies
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                The true value of AI lies in its ability to turn insights into
                action. With the help of AI, startups can move beyond simply
                gathering data to developing strategies that drive tangible
                business outcomes. For example, AI can help identify which
                product features are most popular with customers, allowing teams
                to prioritize development efforts accordingly. Similarly, AI can
                highlight inefficiencies in operations, enabling startups to
                optimize processes and reduce costs (Amazon Web Services, Inc.).
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                By integrating tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                into their workflow, startups can ensure that every insight
                collected is translated into a clear, actionable strategy. This
                not only accelerates the Build-Measure-Learn cycle but also
                enhances the company’s ability to innovate and grow in a
                competitive market.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Conclusion
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Leveraging AI to transform insight collection into actionable
                business strategies is no longer a luxury; it’s a necessity for
                startups aiming to succeed in today’s data-driven world. By
                using AI-powered tools like Loop, companies can streamline the
                insight collection process, develop strategies that align with
                their goals, and accelerate innovation. In a market where speed
                and adaptability are key, AI provides startups with the tools
                they need to thrive and grow.
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
