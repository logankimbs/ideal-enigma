import { Injectable, Logger } from '@nestjs/common';
import { createMap } from '../../common/utils';
import { Installation } from '../installation/installation.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // @Cron('45 * * * * *')
  async generateSummaries() {
    try {
      let installations: Installation[] =
        await this.installationService.findAll(); // point of failure
      let users = await this.userService.findAll(); // point of failure
      let i = await this.insightService.findAll(); // point of failure

      // convert to maps
      installations = createMap(installations, (item) => item.id);

      for (const [key, value] of installations) {
        const insights = i[key] ?? [];
        const team = users[key] ?? [];

        try {
          if (insights && insights.length >= 10) {
            const summaryData = await this.openaiService.generateSummary(
              insights
            ); // point of failure
            const summary = await this.summaryService.create(); // point of failure
            const fSummary = formatSummary(summary); // point of failure - possible

            sendmessage(value.token, team, fSummary); // point of failure
            this.insightService.markInsightsSummarized(insights); // point of failure
            continue; // continue to next iteration
          }

          sendmessage(value.token, team, 'Submit more insights message.'); // point of failure
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
