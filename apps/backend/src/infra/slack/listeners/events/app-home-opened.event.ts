import { Injectable, Logger } from '@nestjs/common';
import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import homeTabView from '../../surfaces/views/home-tab.view';

@Injectable()
export class AppHomeOpenedEvent {
  private logger = new Logger(AppHomeOpenedEvent.name);

  async handle({
    client,
    event,
  }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_home_opened'>) {
    if (event.tab !== 'home') return;

    try {
      await client.views.publish({
        user_id: event.user,
        view: homeTabView(event.user),
      });
    } catch (error) {
      this.logger.error('Error publishing app home tab:', error);
    }
  }
}
