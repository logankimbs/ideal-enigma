import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { blocks } from '../blocks';

const reminderMessageCallback = async ({ client, event }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>) => {
  try {
    await client.chat.postMessage({
        channel: event.channel,
        blocks: blocks.reminder
    })
  } catch (error) {
    console.error(error);
  }
};

export default reminderMessageCallback;
