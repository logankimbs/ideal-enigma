import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { HISTORY_VIEW_CALLBACK_ID } from "../views/history-view";
import {
  createContextBlock,
  createInputBlock,
  createSectionBlock,
} from "../../utils/blocks";

export const OPEN_MODAL = "open_modal";

const getModalBlocks = () => [
  createSectionBlock(
    "plain_text",
    "We hope you accomplished a lot this week! More importantly, we hope you learned a lot. Submitting and sharing these learnings with your team will empower the entire organization to move faster and smarter.",
  ),
  createInputBlock("What was the most impactful thing you learned this week?"),
  createContextBlock(
    "For guidance on what makes a learning impactful, <https://google.com|click here>.",
  ),
];

const openModal = async ({
  ack,
  client,
  body,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: HISTORY_VIEW_CALLBACK_ID,
        title: {
          type: "plain_text",
          text: "Echo",
        },
        blocks: getModalBlocks(),
        submit: {
          type: "plain_text",
          text: "Submit",
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default openModal;
