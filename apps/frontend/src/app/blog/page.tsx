import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '../../components/landing/container';
import { Footer } from '../../components/landing/footer';
import { GradientBackground } from '../../components/landing/gradient';
import { Link } from '../../components/landing/link';
import { Navbar } from '../../components/landing/navbar';
import { Heading, Lead, Subheading } from '../../components/landing/text';
import { getFeaturedPosts, getPosts } from './posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay in the Loop with product updates, company news, and insights to help your company work smarter and grow faster.',
};

async function FeaturedPosts() {
  const posts = getFeaturedPosts();

  return (
    <div className="mt-16 pb-14">
      <Container>
        <h2 className="text-2xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={
                'building-a-culture-of-curiosity-how-weekly-insight-reminders-can-transform-your-business'
              }
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5"
            >
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">
                  {post.publishedAt}
                </div>
                <div className="mt-2 text-base/7 font-medium">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {post.excerpt}
                </div>
                {/*<div className="mt-6 flex items-center gap-3">*/}
                {/*  <Avatar alt="" src={post.author.image} className="size-6" />*/}
                {/*  <div className="text-sm/5 text-gray-700">*/}
                {/*    {post.author.name}*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

async function Posts({ page, category }: { page: number; category?: string }) {
  const posts = getPosts();

  if (posts.length === 0 && (page > 1 || category)) {
    notFound();
  }

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-500">No posts found.</p>;
  }

  return (
    <div className="mt-6">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {post.publishedAt}
            </div>
            {/*{post.author && (*/}
            {/*  <div className="mt-2.5 flex items-center gap-3">*/}
            {/*    {post.author.image && (*/}
            {/*      <Avatar alt="" src={post.author.image} className="size-6" />*/}
            {/*    )}*/}
            {/*    <div className="text-sm/5 text-gray-700">*/}
            {/*      {post.author.name}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <h2 className="text-sm/5 font-medium">{post.title}</h2>
            <p className="mt-3 text-sm/6 text-gray-500">{post.excerpt}</p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center gap-1 text-sm/5 font-medium"
              >
                <span className="absolute inset-0" />
                Read more
                <ChevronRightIcon className="size-4 fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    'page' in searchParams
      ? typeof searchParams.page === 'string' && parseInt(searchParams.page) > 1
        ? parseInt(searchParams.page)
        : notFound()
      : 1;

  const category =
    typeof searchParams.category === 'string'
      ? searchParams.category
      : undefined;

  return (
    <main className="overflow-hidden !bg-white">
      <GradientBackground />
      <Container>
        <Navbar
          banner={
            <div className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
              Currently testing in beta
            </div>
          }
        />
        <Subheading className="mt-16">Blog</Subheading>
        <Heading as="h1" className="mt-2">
          What’s happening at Loop.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Stay in the{' '}
          <strong className="font-semibold text-gray-950">Loop</strong> with
          product updates, company news, and insights to help your company work
          smarter and grow faster.
        </Lead>
      </Container>
      {page === 1 && !category && <FeaturedPosts />}
      <Container className="mt-16 pb-24">
        {/*  <Categories selected={category} />*/}
        <Posts page={page} category={category} />
        {/*  <Pagination page={page} category={category} />*/}
      </Container>
      <Footer />
    </main>
  );
}
