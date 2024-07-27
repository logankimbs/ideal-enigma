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
    const { input_block_id, select_channel_block_id } = view.state.values;
    const sampleInputValue = input_block_id.sample_input_id.value;
    const sampleConvoValue =
      select_channel_block_id.sample_dropdown_id.selected_conversation;

    client.chat.postMessage({
      channel: sampleConvoValue || body.user.id,
      text: `<@${body.user.id}> submitted the following :sparkles: hopes and dreams :sparkles:: \n\n ${sampleInputValue}`,
    });
  } catch (error) {
    console.error(error);
  }
};

export default historyViewCallback;
