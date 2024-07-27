import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";

const sampleViewCallback = async ({
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

export default sampleViewCallback;
