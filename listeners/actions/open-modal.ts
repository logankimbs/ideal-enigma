import { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt';
import { blocks } from '../blocks';

const openModalCallback = async ({ ack, client, body }:
  AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    const { trigger_id } = body;
    
    await ack();
    await client.views.open({
      trigger_id,
      view: {
        type: 'modal',
        callback_id: 'sample_view_id',
        title: {
          type: 'plain_text',
          text: 'Echo',
        },
        blocks: blocks.modal,
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default openModalCallback;
