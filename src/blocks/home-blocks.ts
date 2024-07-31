import { AppHomeOpenedEvent } from "@slack/bolt";
import { OPEN_MODAL_ACTION_ID } from "../listeners/actions/open-modal";

export const getHomeBlocks = (event: AppHomeOpenedEvent) => {
  const introduction = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Hey there <@${event.user}> 👋 I'm Echo. I'm here to help you recall and submit your weekly insights that will be shared with your teammates in order to circulate and accelerate the rate at which we build, measure, and learn.\n\nThere are two ways to quickly submit insights:`,
    },
  };

  const insightCommand = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*1️⃣ Use the `/insight` command*. Type `/insight` followed by a concise description of your learning. We love the format, 'This week I learned... which leads me to believe that we should...' Try it out by using the `/insight` command in this channel.",
    },
  };

  const insightAction = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*2️⃣ Use the _Create an Insight action.* If you want to create an Insight from a message, select `Create a Insight` in a message's context menu. Try it out by selecting the _Create a Insight_ action for this message (shown below).",
    },
  };

  const image = {
    type: "image",
    title: {
      type: "plain_text",
      text: "image1",
      emoji: true,
    },
    image_url:
      "https://api.slack.com/img/blocks/bkb_template_images/onboardingComplex.jpg",
    alt_text: "image1",
  };

  const helper = {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: "👀 View all insights with `/insight list`\n❓Get help at any time with `/task help` or type *help* in a DM with me",
      },
    ],
  };

  const actionButton = {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Click Me",
          emoji: true,
        },
        style: "primary",
        value: "click_me_123",
        action_id: OPEN_MODAL_ACTION_ID,
      },
    ],
  };

  return [
    introduction,
    insightCommand,
    insightAction,
    image,
    helper,
    actionButton,
  ];
};
