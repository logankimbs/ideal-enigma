import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { Avatar } from '../../../components/avatar';
import { Button } from '../../../components/landing/button';
import { Container } from '../../../components/landing/container';
import { Footer } from '../../../components/landing/footer';
import { GradientBackground } from '../../../components/landing/gradient';
import { Link } from '../../../components/landing/link';
import { Navbar } from '../../../components/landing/navbar';
import { Heading, Subheading } from '../../../components/landing/text';
import { transparencyAndCollaboration } from '../posts';

export default function TheRoleOfTransparencyAndCollaboration() {
  const post = transparencyAndCollaboration;

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
                In the ever-evolving world of startups, continuous learning is
                essential for staying ahead of the competition. However,
                fostering a culture of continuous learning requires more than
                just access to information; it demands a foundation of
                transparency and collaboration. When organizations prioritize
                open communication and create an environment where insights are
                freely shared and acted upon, they unlock the full potential of
                their teams and drive sustainable business growth.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                The Importance of Transparency
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Transparency is the cornerstone of a learning-oriented culture.
                When information is shared openly across the organization, it
                empowers employees to make informed decisions, align their
                efforts with the company’s goals, and contribute to the
                collective knowledge base. According to a study by Glassdoor,
                organizations that prioritize transparency tend to have higher
                levels of employee engagement, which in turn drives innovation
                and productivity (Amazon Web Services, Inc.).
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Transparent communication also helps to build trust within the
                organization. When employees feel that they have access to the
                same information as their leaders, they are more likely to take
                ownership of their work, share insights, and collaborate
                effectively. This trust creates a positive feedback loop where
                open communication leads to greater collaboration, and greater
                collaboration leads to more meaningful learning experiences
                (Amazon Web Services, Inc.).
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Collaboration as a Catalyst for Learning
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Collaboration is the engine that drives continuous learning in a
                transparent environment. When employees from different
                departments and levels of the organization work together, they
                bring diverse perspectives and ideas to the table, leading to
                richer insights and more innovative solutions. A collaborative
                culture not only enhances problem-solving but also accelerates
                the Build-Measure-Learn cycle by ensuring that lessons learned
                are quickly disseminated and applied across the organization
                (GLOBIS Insights).
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                are instrumental in facilitating this collaborative learning
                process. By compiling and sharing insights across teams, Loop
                ensures that valuable knowledge is not siloed but is accessible
                to everyone who can benefit from it. This collaborative approach
                to learning helps startups to adapt quickly, innovate faster,
                and maintain a competitive edge in the market.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Conclusion
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Creating a culture of continuous learning is essential for any
                startup looking to thrive in today’s fast-paced business
                environment. By prioritizing transparency and collaboration,
                organizations can unlock the full potential of their teams,
                drive innovation, and ensure long-term success. Tools like{' '}
                <strong className="font-semibold text-gray-950">Loop</strong>{' '}
                can support this cultural shift by enabling seamless
                communication and collaboration, turning insights into
                actionable strategies that fuel business growth.
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
