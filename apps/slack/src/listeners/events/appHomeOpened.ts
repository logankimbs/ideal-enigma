import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import config from '../../config';
import { AUTO_LOGIN, OPEN_INSIGHT_MODAL } from '../../constants';
import {
  createHeaderBlock,
  createRichTextBlock,
  createSectionWithButton,
} from '../../utils/blocks';

const getHomeViewBlocks = (event: any) => {
  const slackAuthUrl = new URL(`${config.apiUrl}/auth/slack`);
  const params = { user: event.user };

  slackAuthUrl.search = new URLSearchParams({ ...params }).toString();

  return [
    createHeaderBlock('👋 Meet Echo'),
    createSectionWithButton({
      text: "I'm here to help you recall and submit your weekly insights and share them with your teammates in order to circulate and accelerate the rate at which your team can build, measure, and learn. By frequently sharing your insights, you are contributing to building a culture of continuous learning.",
      buttonText: '🔍 Learn More',
      buttonValue: AUTO_LOGIN,
      url: `${process.env.FRONTEND_URL}`,
    }),
    createSectionWithButton({
      text: '*What makes an insight impactful?*\nAn impactful insight sparks action and fuels growth. Here’s what makes it effective:',
      buttonText: '🚀 Impactful Insights',
      buttonValue: AUTO_LOGIN,
      url: `${process.env.FRONTEND_URL}`,
    }),
    createRichTextBlock(
      '1. Clear, Actionable, and Specific:',
      ' Insights should include specific recommendations that teams can act on right away.'
    ),
    createRichTextBlock(
      '2. Data-Driven:',
      ' Ground insights in reliable data for credibility.'
    ),
    createRichTextBlock(
      '3. Relevant and Timely:',
      ' Align insights with strategic goals to drive key metrics.'
    ),
    createRichTextBlock(
      '4. Simple Communication:',
      ' Avoid jargon and keep insights understandable for anyone.'
    ),
    createRichTextBlock(
      'Here is a good example of an impactful insight:',
      ' Analyzing user behavior has revealed that simplifying the onboarding process by reducing the steps from 8 to 5 increases user activation rates by 30%.'
    ),
    createHeaderBlock('Do More with Echo'),
    createSectionWithButton({
      text: '*Submit a Quick Insight*\nSubmit your learnings to share with the team.',
      buttonText: '📩 Submit an Insight',
      buttonValue: OPEN_INSIGHT_MODAL,
    }),
    createSectionWithButton({
      text: '*Explore the Echo Dashboard*\nAccess Echo settings, reporting, and the growing repository of insights.',
      buttonText: '📈 Visit Echo Dashboard',
      url: `${slackAuthUrl}`,
      buttonValue: AUTO_LOGIN,
    }),
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
