import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";
import { insightService } from "../../services/InsightService";
import logger from "../../utils/logger";

const submitInsight = async ({
  ack,
  view,
  body,
  client,
}: AllMiddlewareArgs & SlackViewMiddlewareArgs) => {
  await ack();

  try {
    const { input_block_id } = view.state.values;
    const inputValue = input_block_id.sample_input_id.value ?? "";

    await insightService.saveInsight(body.user.id, inputValue);

    // TODO: Figure out how to post message as user
    await client.chat.postMessage({
      channel: body.user.id,
      text: `${inputValue}`,
    });
  } catch (error) {
    logger.error(error);
  }
};

export default submitInsight;
