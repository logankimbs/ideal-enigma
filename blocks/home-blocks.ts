import { AppHomeOpenedEvent } from "@slack/bolt";
import { OPEN_MODAL_ACTION_ID } from "../listeners/actions/open-modal";

export const getHomeBlocks = (event: AppHomeOpenedEvent) => {
  const blockOne = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*Hey <@${event.user}>!*\n\nLooks like its time to report your learnings.`,
    },
  };

  const blockTwo = {
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

  return [blockOne, blockTwo];
};
