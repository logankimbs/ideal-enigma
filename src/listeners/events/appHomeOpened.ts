import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { OPEN_MODAL } from "../actions/open-modal";
import {
  createHeaderBlock,
  createRichTextBlock,
  createSectionWithButton,
} from "../../utils/blocks";

const getHomeViewBlocks = () => [
  createHeaderBlock("👋 Meet Echo"),
  createSectionWithButton(
    "I'm here to help you recall and submit your weekly insights and share them with your teammates in order to circulate and accelerate the rate at which your team can build, measure, and learn. By frequently sharing your insights, you are contributing to building a culture of continuous learning.",
    "Learn More",
    "learn_more",
  ),
  { type: "divider" },
  createSectionWithButton(
    "*What makes an insight impactful?*\n\nAn impactful insight drives meaningful action, leading to improved performance, user satisfaction, and business growth.",
    "Impactful Insights",
    "try_journeys",
  ),
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
  createSectionWithButton(
    "📄 *Submit a Quick Insight*\nCreate an Intros, Watercooler, or Celebrations channel.",
    "Submit an Insight",
    OPEN_MODAL,
  ),
];

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
        blocks: getHomeViewBlocks(),
      },
    });
  } catch (error) {
    console.error("Error publishing home view:", error);
  }
};

export default appHomeOpened;
