import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";

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
    const sampleInputValue = input_block_id.sample_input_id.value;

    client.chat.postMessage({
      channel: body.user.id,
      text: `${sampleInputValue}`,
    });
  } catch (error) {
    console.error(error);
  }
};

export default historyViewCallback;
