import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import config from '../../config';
import {
  IMPACTFUL_INSIGHTS,
  LEARN_MORE,
  OPEN_INSIGHT_MODAL,
  VISIT_DASHBOARD,
} from '../../constants';

const getHomeViewBlocks = (event: any) => {
  const slackAuthUrl = new URL(`${config.apiUrl}/auth/slack`);
  const params = { user: event.user };

  slackAuthUrl.search = new URLSearchParams({ ...params }).toString();

  return [
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: '📩 Submit an Insight',
          },
          style: 'primary',
          value: OPEN_INSIGHT_MODAL,
          action_id: OPEN_INSIGHT_MODAL,
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: '📈 Visit Loop Dashboard',
          },
          value: VISIT_DASHBOARD,
          action_id: VISIT_DASHBOARD,
          url: slackAuthUrl,
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: '🔍 Learn More',
          },
          value: LEARN_MORE,
          action_id: LEARN_MORE,
          url: process.env.FRONTEND_URL,
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            emoji: true,
            text: '🚀 Impactful Insights',
          },
          value: IMPACTFUL_INSIGHTS,
          action_id: IMPACTFUL_INSIGHTS,
          url: `${process.env.FRONTEND_URL}/blog/unlocking-growth-the-secret-behind-impactful-insights`,
        },
      ],
    },
    { type: 'divider' },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        emoji: true,
        text: '👋 Meet Echo',
      },
    },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        emoji: true,
        text: "I'm here to help you recall and submit your weekly insights, share them with your teammates, and accelerate your team's ability to build, measure, and learn. By frequently sharing insights, you're contributing to a culture of continuous learning.",
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*What makes an insight impactful?*',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*1️⃣ Clear, Actionable, and Specific.* Insights should include specific recommendations that teams can act on right away.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*2️⃣ Data-Driven.* Ground insights in reliable data for credibility.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*3️⃣ Relevant and Timely.* Align insights with strategic goals to drive key metrics.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*4️⃣ Simple Communication.* Avoid jargon and keep insights understandable for anyone.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Example:* Analyzing user behavior has revealed that simplifying the onboarding process by reducing the steps from 8 to 5 increases user activation rates by 30%.',
      },
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        emoji: true,
        text: '🥇 Do More with Echo',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '*Capture* 📝\n' +
          '*Effortlessly capture employee insights*\n' +
          'Loop seamlessly integrates with your team’s communication tools, making it simple to capture, organize, and share valuable insights across every department.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '*Centralize* 🌐\n' +
          '*Valuable information all in one place*\n' +
          'Bring all your team’s insights together in a unified, searchable repository, ensuring that the knowledge you need is always right at your fingertips.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '*Curate* 🤖\n' +
          '*Create actionable summaries from employee insights*\n' +
          'Leverage AI-driven summaries that distill your team’s collective intelligence into easily digestible insights, helping everyone quickly understand the “why” behind the work.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '*Circulate* 🔄\n' +
          '*Automate the distribution of knowledge*\n' +
          'Keep your team in the loop with timely summaries delivered directly to their workspace—sparking discussions, fueling follow-ups, and guiding next steps.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '*Cultivate* 🌱\n' +
          '*Enable your team to operate with curiosity*\n' +
          'Empower your team to approach challenges with a growth mindset, turning shared insights into a culture of continuous learning and innovation.',
      },
    },
  ];
};

const appHomeOpened = async ({
  client,
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_home_opened'>) => {
  if (event.tab !== 'home') return;

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: getHomeViewBlocks(event),
      },
    });
  } catch (error) {
    console.error('Error publishing home view:', error);
  }
};

export default appHomeOpened;
