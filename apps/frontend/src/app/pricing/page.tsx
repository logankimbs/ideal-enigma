import type { Metadata } from 'next';
import { Button } from '../../components/landing/button';
import { Container } from '../../components/landing/container';
import { Footer } from '../../components/landing/footer';
import {
  Gradient,
  GradientBackground,
} from '../../components/landing/gradient';
import { LogoCloud } from '../../components/landing/logo-cloud';
import { Navbar } from '../../components/landing/navbar';
import { Heading, Lead, Subheading } from '../../components/landing/text';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Companies all over the world have closed millions of deals with Radiant. Sign up today and start selling smarter.',
};

const tiers = [
  {
    name: 'Free' as const,
    slug: 'free',
    description: 'Everything you need to get started with Loop.',
    priceMonthly: 0,
    href: `${process.env.NEXT_PUBLIC_BACKEND_URL}/slack/install`,
    disabled: false,
    highlights: [
      { description: 'Up to 20 team members' },
      { description: '1 submission per user per week' },
      { description: 'AI powered monthly summaries' },
      { description: 'Access to advanced analytics', disabled: true },
      { description: 'Customizable settings', disabled: true },
    ],
    features: [
      { section: 'Features', name: 'Accounts', value: 3 },
      { section: 'Features', name: 'Deal progress boards', value: 5 },
      { section: 'Features', name: 'Sourcing platforms', value: 'Select' },
      { section: 'Features', name: 'Contacts', value: 100 },
      { section: 'Features', name: 'AI assisted outreach', value: false },
      { section: 'Analysis', name: 'Competitor analysis', value: false },
      { section: 'Analysis', name: 'Dashboard reporting', value: false },
      { section: 'Analysis', name: 'Community insights', value: false },
      { section: 'Analysis', name: 'Performance analysis', value: false },
      { section: 'Support', name: 'Email support', value: true },
      { section: 'Support', name: '24 / 7 call center support', value: false },
      { section: 'Support', name: 'Dedicated account manager', value: false },
    ],
  },
  {
    name: 'Growth' as const,
    slug: 'growth',
    description: 'All the extras for your growing team.',
    priceMonthly: 99,
    href: '',
    disabled: true,
    highlights: [
      { description: 'Up to 250 team members' },
      { description: 'Up to 3 submissions per user per week' },
      { description: 'AI powered weekly & monthly summaries' },
      { description: 'Access to advanced analytics', disabled: true },
      { description: 'Customizable settings', disabled: true },
    ],
    features: [
      { section: 'Features', name: 'Accounts', value: 10 },
      { section: 'Features', name: 'Deal progress boards', value: 'Unlimited' },
      { section: 'Features', name: 'Sourcing platforms', value: '100+' },
      { section: 'Features', name: 'Contacts', value: 1000 },
      { section: 'Features', name: 'AI assisted outreach', value: true },
      { section: 'Analysis', name: 'Competitor analysis', value: '5 / month' },
      { section: 'Analysis', name: 'Dashboard reporting', value: true },
      { section: 'Analysis', name: 'Community insights', value: true },
      { section: 'Analysis', name: 'Performance analysis', value: true },
      { section: 'Support', name: 'Email support', value: true },
      { section: 'Support', name: '24 / 7 call center support', value: true },
      { section: 'Support', name: 'Dedicated account manager', value: false },
    ],
  },
  {
    name: 'Enterprise' as const,
    slug: 'enterprise',
    description: 'Added flexibility to accelerate teams at scale.',
    priceMonthly: 299,
    href: '#',
    disabled: true,
    highlights: [
      { description: 'Unlimited team members' },
      { description: 'Unlimited submissions per user per week' },
      { description: 'Custom scheduling of AI powered summaries' },
      { description: 'Access to advanced analytics' },
      { description: 'Customizable settings' },
    ],
    features: [
      { section: 'Features', name: 'Accounts', value: 'Unlimited' },
      { section: 'Features', name: 'Deal progress boards', value: 'Unlimited' },
      { section: 'Features', name: 'Sourcing platforms', value: '100+' },
      { section: 'Features', name: 'Contacts', value: 'Unlimited' },
      { section: 'Features', name: 'AI assisted outreach', value: true },
      { section: 'Analysis', name: 'Competitor analysis', value: 'Unlimited' },
      { section: 'Analysis', name: 'Dashboard reporting', value: true },
      { section: 'Analysis', name: 'Community insights', value: true },
      { section: 'Analysis', name: 'Performance analysis', value: true },
      { section: 'Support', name: 'Email support', value: true },
      { section: 'Support', name: '24 / 7 call center support', value: true },
      { section: 'Support', name: 'Dedicated account manager', value: true },
    ],
  },
];

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Pricing that grows with your team size.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Sign up today and start accelerating growth.
      </Lead>
    </Container>
  );
}

function PricingCards() {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 bottom-0 top-48 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier, tierIndex) => (
            <PricingCard key={tierIndex} tier={tier} />
          ))}
        </div>
        <LogoCloud className="mt-24" />
      </Container>
    </div>
  );
}

function PricingCard({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5 drop-shadow-lg">
          <Subheading>{tier.name}</Subheading>
          <p className="mt-2 text-sm/6 text-gray-950/75">{tier.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="text-5xl font-medium text-gray-950">
              ${tier.priceMonthly}
            </div>
            <div className="text-sm/5 text-gray-950/75">
              <p>USD</p>
              <p>per month</p>
            </div>
          </div>
          <div className="mt-8">
            {tier.disabled ? (
              <Button disabled={tier.disabled}>Coming soon</Button>
            ) : (
              <Button href={tier.href} disabled={tier.disabled}>
                Start a free trial
              </Button>
            )}
          </div>
          <div className="mt-8">
            {/*<h3 className="text-sm/6 font-medium text-gray-950">*/}
            {/*  Start selling with:*/}
            {/*</h3>*/}
            <ul className="mt-3 space-y-3">
              {tier.highlights.map((props, featureIndex) => (
                <FeatureItem key={featureIndex} {...props} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// function PricingTable({
//   selectedTier,
// }: {
//   selectedTier: (typeof tiers)[number];
// }) {
//   return (
//     <Container className="py-24">
//       <table className="w-full text-left">
//         <caption className="sr-only">Pricing plan comparison</caption>
//         <colgroup>
//           <col className="w-3/5 sm:w-2/5" />
//           <col
//             data-selected={selectedTier === tiers[0] ? true : undefined}
//             className="w-2/5 data-[selected]:table-column max-sm:hidden sm:w-1/5"
//           />
//           <col
//             data-selected={selectedTier === tiers[1] ? true : undefined}
//             className="w-2/5 data-[selected]:table-column max-sm:hidden sm:w-1/5"
//           />
//           <col
//             data-selected={selectedTier === tiers[2] ? true : undefined}
//             className="w-2/5 data-[selected]:table-column max-sm:hidden sm:w-1/5"
//           />
//         </colgroup>
//         <thead>
//           <tr className="max-sm:hidden">
//             <td className="p-0" />
//             {tiers.map((tier) => (
//               <th
//                 key={tier.slug}
//                 scope="col"
//                 data-selected={selectedTier === tier ? true : undefined}
//                 className="p-0 data-[selected]:table-cell max-sm:hidden"
//               >
//                 <Subheading as="div">{tier.name}</Subheading>
//               </th>
//             ))}
//           </tr>
//           <tr className="sm:hidden">
//             <td className="p-0">
//               <div className="relative inline-block">
//                 <Menu>
//                   <MenuButton className="flex items-center justify-between gap-2 font-medium">
//                     {selectedTier.name}
//                     <ChevronUpDownIcon className="size-4 fill-slate-900" />
//                   </MenuButton>
//                   <MenuItems
//                     anchor="bottom start"
//                     className="min-w-[--button-width] rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
//                   >
//                     {tiers.map((tier) => (
//                       <MenuItem key={tier.slug}>
//                         <Link
//                           scroll={false}
//                           href={`/pricing?tier=${tier.slug}`}
//                           data-selected={
//                             tier === selectedTier ? true : undefined
//                           }
//                           className="group flex items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-200"
//                         >
//                           {tier.name}
//                           <CheckIcon className="hidden size-4 group-data-[selected]:block" />
//                         </Link>
//                       </MenuItem>
//                     ))}
//                   </MenuItems>
//                 </Menu>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
//                   <ChevronUpDownIcon className="size-4 fill-slate-900" />
//                 </div>
//               </div>
//             </td>
//             <td colSpan={3} className="p-0 text-right">
//               <Button variant="outline" href={selectedTier.href}>
//                 Get started
//               </Button>
//             </td>
//           </tr>
//           <tr className="max-sm:hidden">
//             <th className="p-0" scope="row">
//               <span className="sr-only">Get started</span>
//             </th>
//             {tiers.map((tier) => (
//               <td
//                 key={tier.slug}
//                 data-selected={selectedTier === tier ? true : undefined}
//                 className="px-0 pb-0 pt-4 data-[selected]:table-cell max-sm:hidden"
//               >
//                 <Button variant="outline" href={tier.href}>
//                   Get started
//                 </Button>
//               </td>
//             ))}
//           </tr>
//         </thead>
//         {[...new Set(tiers[0].features.map(({ section }) => section))].map(
//           (section) => (
//             <tbody key={section} className="group">
//               <tr>
//                 <th
//                   scope="colgroup"
//                   colSpan={4}
//                   className="px-0 pb-0 pt-10 group-first-of-type:pt-5"
//                 >
//                   <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
//                     {section}
//                   </div>
//                 </th>
//               </tr>
//               {tiers[0].features
//                 .filter((feature) => feature.section === section)
//                 .map(({ name }) => (
//                   <tr
//                     key={name}
//                     className="border-b border-gray-100 last:border-none"
//                   >
//                     <th
//                       scope="row"
//                       className="px-0 py-4 text-sm/6 font-normal text-gray-600"
//                     >
//                       {name}
//                     </th>
//                     {tiers.map((tier) => {
//                       const value = tier.features.find(
//                         (feature) =>
//                           feature.section === section && feature.name === name
//                       )?.value;

//                       return (
//                         <td
//                           key={tier.slug}
//                           data-selected={
//                             selectedTier === tier ? true : undefined
//                           }
//                           className="p-4 data-[selected]:table-cell max-sm:hidden"
//                         >
//                           {value === true ? (
//                             <>
//                               <CheckIcon className="size-4 fill-green-600" />
//                               <span className="sr-only">
//                                 Included in {tier.name}
//                               </span>
//                             </>
//                           ) : value === false || value === undefined ? (
//                             <>
//                               <MinusIcon className="size-4 fill-gray-400" />
//                               <span className="sr-only">
//                                 Not included in {tier.name}
//                               </span>
//                             </>
//                           ) : (
//                             <div className="text-sm/6">{value}</div>
//                           )}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))}
//             </tbody>
//           )
//         )}
//       </table>
//     </Container>
//   );
// }

function FeatureItem({
  description,
  disabled = false,
}: {
  description: string;
  disabled?: boolean;
}) {
  return (
    <li
      data-disabled={disabled ? true : undefined}
      className="flex items-start gap-4 text-sm/6 text-gray-950/75 data-[disabled]:text-gray-950/25"
    >
      <span className="inline-flex h-6 items-center">
        <PlusIcon className="size-[0.9375rem] shrink-0 fill-gray-950/25" />
      </span>
      {disabled && <span className="sr-only">Not included:</span>}
      {description}
    </li>
  );
}

function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" {...props}>
      <path clipRule="evenodd" d="M8 0H7v7H0v1h7v7h1V8h7V7H8V0z" />
    </svg>
  );
}

function Testimonial() {
  return (
    <div className="mx-2 my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pb-24 pt-72 lg:pt-36">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
          <div className="-mt-96 lg:-mt-52">
            <div className="-m-2 rounded-4xl max-lg:mx-auto max-lg:max-w-xs">
              <div className="rounded-4xl p-2">
                <div className="overflow-hidden rounded-3xl shadow-white/15 shadow-2xl outline outline-1 -outline-offset-1 outline-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src="/testimonials/tina-yards.jpg"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-lg:mt-16 lg:col-span-2 lg:px-16">
            <figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
              <blockquote>
                <p className="relative text-3xl tracking-tight text-white before:absolute before:-translate-x-full before:content-['“'] after:absolute after:content-['”'] lg:text-4xl">
                  Thanks to Radiant, we&apos;re finding new leads that we never
                  would have found with legal methods.
                </p>
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-sm/6 font-medium text-white">Tina Yards</p>
                <p className="text-sm/6 font-medium">
                  <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                    VP of Sales, Protocol
                  </span>
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <Container>
      <section id="faqs" className="scroll-mt-8">
        <Subheading className="text-center">
          Frequently asked questions
        </Subheading>
        <Heading as="div" className="mt-2 text-center">
          Your questions answered.
        </Heading>
        <div className="mx-auto mb-32 mt-16 max-w-xl space-y-12">
          <dl>
            <dt className="text-sm font-semibold">
              How often will Loop prompt me to submit insights, and can I adjust
              this frequency?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Soon. Loop will allow you to customize your reminder schedule so
              it aligns with your team’s pace. If you find weekly reminders too
              frequent, simply adjust the frequency in your settings. Our goal
              is to encourage consistent insight sharing without overwhelming
              your workflow.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Can I find insights shared by other departments or teams within
              the company?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Absolutely. Loop is designed to break down silos, making
              cross-departmental knowledge easily accessible. By browsing
              themes, applying filters, or using keyword search, you can
              discover insights from other teams, gaining a more holistic
              understanding of what’s happening across the organization.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              How do I ensure the AI summaries aren’t missing important details?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Our AI is trained to identify key themes and essential points, but
              we understand the importance of accuracy. If you ever feel
              something’s missing, you can access the full original insight,
              leave a comment for clarification, or mark the summary for
              improvement. Your feedback helps us refine our AI models over
              time.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Is it possible to bookmark or highlight certain insights for easy
              reference later?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Soon Loop will let you “favorite” insights or add them to custom
              collections. This makes it simple to return to valuable learnings,
              share them in meetings, or reference them when making decisions.
              You’ll never have to dig through old channels or documents to find
              those crucial nuggets of information again.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              How does Loop help me understand the impact of insights on our
              company’s decisions?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Loop provides engagement metrics showing how often an insight is
              viewed, commented on, or referenced. Over time, you can see which
              ideas influenced strategies, aligned teams, or sparked successful
              initiatives. This visibility helps you appreciate the real-world
              impact of shared knowledge.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Can I filter insights by specific projects or goals?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Yes. Loop’s filtering tools let you organize and view insights
              based on projects, departments, tags, or key initiatives. This
              helps you focus on what’s most relevant to your current work and
              ensures that valuable information never gets lost in the shuffle.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Does Loop integrate with our project management or analytics
              tools?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Absolutely. Loop is designed to fit into your existing ecosystem.
              From project management platforms to data visualization tools, we
              offer the ability to link to projects in other tools that let you
              flow insights into your current workflows. By connecting your
              knowledge hub to the apps you rely on, Loop enhances collaboration
              across all your tools.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              What if our company’s workflows evolve over time?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Loop is built with flexibility in mind. As your processes mature
              or shift, you can easily adjust settings, reminder frequencies,
              categories, and integrations. Whether you’re scaling up,
              reorganizing teams, or embracing new methodologies, Loop adapts to
              help your organization continue learning and growing together.
            </dd>
          </dl>
        </div>
      </section>
    </Container>
  );
}

export default function Pricing({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tier =
    typeof searchParams.tier === 'string'
      ? tiers.find(({ slug }) => slug === searchParams.tier)!
      : tiers[0];

  return (
    <main className="overflow-hidden bg-white">
      <GradientBackground />
      <Container>
        <Navbar
          banner={
            <div className="flex items-center gap-1 rounded-full bg-[#b060ff] px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
              Beta
            </div>
          }
        />
      </Container>
      <Header />
      <PricingCards />
      <div className="py-24" />
      {/* <PricingTable selectedTier={tier} /> */}
      {/*<Testimonial />*/}
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  );
}
