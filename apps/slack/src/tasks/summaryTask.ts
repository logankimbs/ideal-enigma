import {
  Insight,
  Installation,
  Summary,
  SummaryTextV1,
  Team,
} from '@ideal-enigma/common';
import { WebClient } from '@slack/web-api';
import config from '../config';
import { message } from '../messages';
import { OpenAIService } from '../services/OpenAIService';
import { SlackService } from '../services/SlackService';
import { apiRequest } from '../utils/apiRequest';
import getNextOccurrence from '../utils/date';
import logger from '../utils/logger';

/**
 * Runs every Sunday at midnight (12:00 AM)
 *
 * This task schedules summary messages to be sent every Monday at 10:00 AM.
 * The summaries are scheduled based on the user's timezone.
 */
export const summaryTask = async () => {
  try {
    logger.info('Starting summary task...');

    const openAI = new OpenAIService();
    logger.info('Grabbing installations...');
    const installations: Installation[] = await apiRequest({
      method: 'get',
      url: `${config.apiUrl}/installations`,
    });
    const reminder = message.getReminderMessage({ day: 'Monday' });

    for (const installation of installations) {
      if (!installation.token) {
        logger.warn(`Skipping installation ${installation.id}: Missing token`);
        continue;
      }

      const webClient = new WebClient(installation.token);
      const slackService = new SlackService(webClient);

      logger.info(`Grabbing team ${installation.id}...`);
      const team: Team = await apiRequest({
        method: 'get',
        url: `${config.apiUrl}/teams/${installation.id}`,
      });

      if (team?.users !== undefined) {
        logger.info(`Grabbing insights for team ${team.id}...`);
        const insights: Insight[] = await apiRequest({
          method: 'get',
          url: `${config.apiUrl}/insights/summarize?teamId=${team.id}`,
        });

        if (insights.length >= 10) {
          // IMPORTANT!!!
          // The summary version will help us when displaying in frontend and slack.
          // each version can have its own structure. We are storing summary as jsonb in db.
          // TODO: Find a better way to set the summary version? Maybe in the summary service?
          const SUMMARY_VERSION = 1;
          let summary: SummaryTextV1;

          try {
            summary = await openAI.summarizeInsights(insights);
          } catch (error) {
            logger.error(
              `Failed to generate summary for installation ${installation.id}: ${error}`
            );

            continue;
          }

          const summaryResponse = await apiRequest<Summary>({
            method: 'post',
            url: `${config.apiUrl}/summaries`,
            data: { teamId: team.id, data: summary, version: SUMMARY_VERSION },
          });

          const summaryMessage = message.getSummaryMessage({
            summary,
            count: insights.length,
          });

          const schedulePromises = team.users.map(async (user) => {
            if (user.data.deleted) return;

            const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

            logger.info(`Scheduling summary message to be sent to ${user.id}`);
            return slackService.scheduleMessage(
              user.id,
              summaryMessage.text,
              timestamp,
              summaryMessage.blocks
            );
          });

          await Promise.all(schedulePromises);

          logger.info('Marking insights as summarized...');
          await apiRequest({
            method: 'put',
            url: `${config.apiUrl}/insights`,
            data: { insights, summary: summaryResponse },
          });
        } else {
          const schedulePromises = team.users.map(async (user) => {
            if (user.data.deleted) return;

            const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

            logger.info(
              `Scheduling Monday morning message to be sent to ${user.id}`
            );
            return slackService.scheduleMessage(
              user.id,
              reminder.text,
              timestamp,
              reminder.blocks
            );
          });

          await Promise.all(schedulePromises);
        }
      }
    }
  } catch (error) {
    logger.error(`Failed to complete summary task: ${error}`);
    return;
  }

  logger.info('Summary task completed successfully');
};
