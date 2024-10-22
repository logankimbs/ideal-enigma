import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { AUTO_LOGIN, OPEN_INSIGHT_MODAL } from "../../constants";
import {
  createHeaderBlock,
  createRichTextBlock,
  createSectionWithButton,
} from "../../utils/blocks";
import config from "../../config";

const getHomeViewBlocks = (event: any) => {
  const slackAuthUrl = new URL(`${config.apiUrl}/auth/slack`);
  const params = { user: event.user, team_id: event.view.team_id };

  slackAuthUrl.search = new URLSearchParams({ ...params }).toString();

  return [
    createHeaderBlock("👋 Meet Echo"),
    createSectionWithButton({
      text: "I'm here to help you recall and submit your weekly insights and share them with your teammates in order to circulate and accelerate the rate at which your team can build, measure, and learn. By frequently sharing your insights, you are contributing to building a culture of continuous learning.",
      buttonText: "Learn More",
      buttonValue: "learn_more",
    }),
    { type: "divider" },
    createSectionWithButton({
      text: "*What makes an insight impactful?*\n\nAn impactful insight drives meaningful action, leading to improved performance, user satisfaction, and business growth.",
      buttonText: "Impactful Insights",
      buttonValue: "try_journeys",
    }),
    createRichTextBlock(
      "1. Clear, Actionable, and Specific:",
      " Insights should come with clear, actionable recommendations that teams can act on. Specific, detailed insights that pinpoint exact areas for improvement are more useful.",
    ),
    createRichTextBlock(
      "2. Data-Driven:",
      " Insights should be grounded in concrete qualitative or quantitative data, ensuring they are reliable and credible.",
    ),
    createRichTextBlock(
      "3. Relevant and Timely:",
      " Insights should be relevant to the company’s strategic objectives, helping to drive key metrics like user retention, revenue growth, or operational efficiency.",
    ),
    createRichTextBlock(
      "4. Clearly Communicated:",
      " Insights should be communicated clearly, avoiding jargon and ensuring they are understandable to all stakeholders.",
    ),
    { type: "divider" },
    createRichTextBlock(
      "Here is a good example of an impactful insight:",
      "Analyzing user behavior has revealed that simplifying the onboarding process by reducing the steps from 8 to 5 increases user activation rates by 30%.",
    ),
    createHeaderBlock("Do More With Echo"),
    createSectionWithButton({
      text: "📄 *Submit a Quick Insight*\nCreate an Intros, Watercooler, or Celebrations channel.",
      buttonText: "Submit an Insight",
      buttonValue: OPEN_INSIGHT_MODAL,
    }),
    createSectionWithButton({
      text: "*Checkout your Dashboard*",
      buttonText: "Go to Dashboard",
      url: `${slackAuthUrl}`,
      buttonValue: AUTO_LOGIN,
    }),
  ];
};

const appHomeOpened = async ({
  client,
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"app_home_opened">) => {
  if (event.tab !== "home") return;

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: getHomeViewBlocks(event),
      },
    });
  } catch (error) {
    console.error("Error publishing home view:", error);
  }
};

export default appHomeOpened;
