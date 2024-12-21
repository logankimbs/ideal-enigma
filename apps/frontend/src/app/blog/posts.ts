export type Post = {
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  title: string;
  excerpt: string;
  slug: string;
  categories: string[];
};

export const cultureOfCuriosity: Post = {
  publishedAt: 'Monday, December 3, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title:
    'Building a Culture of Curiosity: How Weekly Insight Reminders Can Transform Your Business',
  excerpt:
    'Weekly insight reminders encourage curiosity and reflection, empowering teams to uncover valuable ideas, accelerate innovation, and drive sustainable business growth.',
  slug: 'building-a-culture-of-curiosity-how-weekly-insight-reminders-can-transform-your-business',
  categories: ['Culture', 'Growth'],
};

export const fromInsightToInnovation: Post = {
  publishedAt: 'Tuesday, November 26, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title:
    'From Insight to Innovation: The Power of a Data-Driven Startup Culture',
  excerpt:
    'A data-driven culture empowers startups to accelerate innovation, reduce risks, and make informed decisions, fostering critical thinking and problem-solving for long-term success.',
  slug: 'from-insight-to-innovation-the-power-of-a-data-driven-startup-culture',
  categories: ['Growth', 'Innovation'],
};

export const leveragingAi: Post = {
  publishedAt: 'Wednesday, November 20, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title:
    'Leveraging AI to Transform Insight Collection into Actionable Business Strategies',
  excerpt:
    'AI-powered tools transform insight collection into actionable strategies, enabling startups to drive innovation, optimize operations, and accelerate growth in a competitive landscape.',
  slug: 'leveraging-ai-to-transform-insight-collection-into-actionable-business-strategies',
  categories: ['Artificial Intelligence', 'Strategy'],
};

export const fatalFlaw: Post = {
  publishedAt: 'Monday, November 4, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title:
    'The Fatal Flaw: Why Startups Overlook the "Learn" in Build-Measure-Learn',
  excerpt:
    'Startups often overlook the critical "Learn" phase of the Build-Measure-Learn cycle, missing opportunities to innovate, optimize resources, and ensure long-term success.',
  slug: 'the-fatal-flaw-why-startups-overlook-the-learn-in-build-measure-learn',
  categories: ['Build', 'Measure', 'Learn'],
};

export const growthKiller: Post = {
  publishedAt: 'Wednesday, October 9, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title:
    'The Hidden Growth Killer: Why Startups Struggle to Maintain a Clean Repository of Insights',
  excerpt:
    'Neglecting a clean insights repository slows decisions and growth, making structured processes and knowledge sharing crucial.',
  slug: 'the-hidden-growth-killer-why-startups-struggle-to-maintain-a-clean-repository-of-insights',
  categories: ['Culture', 'Growth'],
};

export const transparencyAndCollaboration: Post = {
  publishedAt: 'Tuesday, October 1, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title:
    'The Role of Transparency and Collaboration in Creating a Culture of Continuous Learning',
  excerpt:
    'Transparency and collaboration are key to fostering continuous learning, enabling teams to share insights, drive innovation, and sustain growth.',
  slug: 'the-role-of-transparency-and-collaboration-in-creating-a-culture-of-continuous-learning',
  categories: ['Culture', 'Collaboration', 'Transparency'],
};

export const unlockingGrowth: Post = {
  publishedAt: 'Friday, September 27, 2024',
  author: {
    name: 'Loop Team',
    image: '/company/mark-gradient.svg',
  },
  title: 'Unlocking Growth: The Secret Behind Impactful Insights',
  excerpt:
    'Transparency and collaboration are key to fostering continuous learning, enabling teams to share insights, drive innovation, and sustain growth.',
  slug: 'unlocking-growth-the-secret-behind-impactful-insights',
  categories: ['Growth', 'Insight'],
};

export function getPosts(): Post[] {
  return [
    fromInsightToInnovation,
    leveragingAi,
    growthKiller,
    transparencyAndCollaboration,
  ];
}

export function getFeaturedPosts(): Post[] {
  return [cultureOfCuriosity, fatalFlaw, unlockingGrowth];
}
