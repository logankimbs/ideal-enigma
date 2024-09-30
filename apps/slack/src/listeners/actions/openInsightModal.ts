import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { insightModal } from "../views/insightModal";

const openInsightModal = async ({
  ack,
  client,
  body,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: insightModal,
    });
  } catch (error) {
    console.error(error);
  }
};

export default openInsightModal;
