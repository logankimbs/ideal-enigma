import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";
import { Insight } from "../../database/entities/Insight";
import { AppDataSource } from "../../database/data-source";

export const HISTORY_VIEW_CALLBACK_ID = "history_view_callback";

const historyViewCallback = async ({
  ack,
  view,
  body,
  client,
}: AllMiddlewareArgs & SlackViewMiddlewareArgs) => {
  await ack();

  try {
    const { input_block_id } = view.state.values;
    const inputValue = input_block_id.sample_input_id.value ?? "";

    const insight = new Insight();
    insight.text = inputValue;

    await AppDataSource.manager.save(insight);

    client.chat.postMessage({
      channel: body.user.id,
      text: `${inputValue}`,
    });
  } catch (error) {
    console.error(error);
  }
};

export default historyViewCallback;
