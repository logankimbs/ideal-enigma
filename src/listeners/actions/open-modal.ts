import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { getModalBlocks } from "../../blocks/modal-blocks";
import { HISTORY_VIEW_CALLBACK_ID } from "../views/history-view";

export const OPEN_MODAL = "open_modal";

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
