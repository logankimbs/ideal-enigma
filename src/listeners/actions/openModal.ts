import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { insightModalView } from "../views/insightModal";

const openModal = async ({
  ack,
  client,
  body,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: insightModalView,
    });
  } catch (error) {
    console.error(error);
  }
};

export default openModal;
