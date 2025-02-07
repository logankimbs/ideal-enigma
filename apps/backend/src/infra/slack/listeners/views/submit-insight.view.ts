import { Injectable, Logger } from '@nestjs/common';
import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from '@slack/bolt';
import { isValidUrl } from '../../../../common/utils/string.utils';
import { InsightsService } from '../../../../modules/insights/insights.service';
import insightMessage from '../../surfaces/messages/insight.message';

type View = {
  insight: { insight: { type: 'plain_text_input'; value: string } };
  themes: { themes: { type: 'plain_text_input'; value?: string } };
  link: { link: { type: 'url_text_input'; value?: string } };
};

@Injectable()
export class SubmitInsightView {
  private logger = new Logger(SubmitInsightView.name);

  constructor(private readonly insightsService: InsightsService) {}

  async handle({
    ack,
    view,
    body,
    client,
  }: AllMiddlewareArgs & SlackViewMiddlewareArgs) {
    try {
      await ack();

      const v = view.state.values as Partial<View>;
      const insight = v.insight.insight.value ?? '';
      const themes = v.themes.themes?.value ?? undefined;
      const link = v.link.link?.value ?? undefined;
      const validLink = isValidUrl(link) ? link : undefined;
      const parsedThemes = themes
        ?.split(',')
        .map((theme) => theme.toLowerCase().trim())
        .filter((theme) => theme);

      await this.insightsService.create({
        userId: body.user.id,
        text: insight,
        tags: parsedThemes,
        link,
      });

      // Todo: post message as user
      await client.chat.postMessage(
        insightMessage(body.user.id, insight, parsedThemes, validLink)
      );
    } catch (error) {
      this.logger.error(`Error submitting insight:`, error);
    }
  }
}
