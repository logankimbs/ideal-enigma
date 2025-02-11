import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import insightModalView from '../../surfaces/views/insight-modal.view';

@Injectable()
export class OpenInsightModalAction {
  private logger = new Logger(OpenInsightModalAction.name);

  async handle({
    ack,
    client,
    body,
  }: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) {
    try {
      await ack();
      await client.views.open({
        trigger_id: body.trigger_id,
        view: insightModalView(),
      });
    } catch (error) {
      this.logger.error('Error opening insight modal:', error);
    }
  }
}
