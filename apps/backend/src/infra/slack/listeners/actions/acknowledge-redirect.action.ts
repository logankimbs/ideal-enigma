import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';

@Injectable()
export class AcknowledgeRedirectAction {
  private logger = new Logger(AcknowledgeRedirectAction.name);

  async handle({
    ack,
  }: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) {
    try {
      await ack();
    } catch (error) {
      this.logger.error('Error acknowledging button redirect:', error);
    }
  }
}
