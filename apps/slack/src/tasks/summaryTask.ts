import {
  Insight,
  Installation,
  Summary,
  SummaryData,
  User,
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
    let installations: Installation[];

    try {
      installations = await apiRequest({
        method: 'get',
        url: `${config.apiUrl}/installations`,
      });
    } catch (error) {
      logger.error(`Failed to get installations: ${error}`);
    }

    const reminder = message.getReminderMessage({ day: 'Monday' });

    for (const installation of installations) {
      if (!installation.token) {
        logger.warn(`Skipping installation ${installation.id}: Missing token`);
        continue;
      }

      const webClient = new WebClient(installation.token);
      const slackService = new SlackService(webClient);

      logger.info(`Grabbing team ${installation.id}...`);

      let users: User[];
      try {
        users = await apiRequest({
          method: 'get',
          url: `${config.apiUrl}/teams/${installation.id}/users/notifications-enabled`,
        });
      } catch (error) {
        logger.error(`Failed to get users: ${error}`);
        continue;
      }

      if (users && users.length > 0) {
        logger.info(`Grabbing insights for team ${installation.id}...`);
        let insights: Insight[];

        try {
          insights = await apiRequest({
            method: 'get',
            url: `${config.apiUrl}/insights/summarize?teamId=${installation.id}`,
          });
        } catch (error) {
          logger.error(`Failed to get insights: ${error}`);
        }

        if (insights.length >= 10) {
          let summary: SummaryData;

          try {
            summary = await openAI.summarizeInsights(insights);
            // IMPORTANT!!!
            // The summary version will help us when displaying in frontend and slack.
            // each version can have its own structure. We are storing summary as jsonb in db.
            // TODO: Find a better way to set the summary version? Maybe in the summary service?
            summary.version = 2;
          } catch (error) {
            logger.error(
              `Failed to generate summary for installation ${installation.id}: ${error}`
            );

            continue;
          }

          let summaryResponse: Summary;

          try {
            // Save summary response
            summaryResponse = await apiRequest<Summary>({
              method: 'post',
              url: `${config.apiUrl}/summaries`,
              data: {
                teamId: installation.id,
                data: summary,
                version: summary.version,
              },
            });
          } catch (error) {
            logger.error(
              `Failed to save summary for team ${installation.id}: ${error}`
            );
          }

          const summaryMessage = message.getSummaryMessage({
            summary,
            count: insights.length,
          });

          const schedulePromises = users.map(async (user) => {
            if (user.data.deleted) return;

            const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

            logger.info(`Scheduling summary message to be sent to ${user.id}`);

            try {
              await slackService.scheduleMessage(
                user.id,
                summaryMessage.text,
                timestamp,
                summaryMessage.blocks
              );
            } catch (error) {
              logger.error(
                `Failed to schedule summary message for ${user.id}: ${error}`
              );
            }
          });

          await Promise.all(schedulePromises);

          logger.info('Marking insights as summarized...');

          try {
            await apiRequest({
              method: 'put',
              url: `${config.apiUrl}/insights`,
              data: { insights, summary: summaryResponse },
            });
          } catch (error) {
            logger.info(`Failed to mark insights as summarized: ${error}`);
          }
        } else {
          const schedulePromises = users.map(async (user) => {
            if (user.data.deleted) return;

            const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

            logger.info(
              `Scheduling Monday morning message to be sent to ${user.id}`
            );

            try {
              await slackService.scheduleMessage(
                user.id,
                reminder.text,
                timestamp,
                reminder.blocks
              );
            } catch (error) {
              logger.error(
                `Failed to schedule Monday morning message for ${user.id}: ${error}`
              );
            }
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

// -- current --
// get all installations that aren't deleted
// for each installation:
// get all users associated with that install (team) and have notifications enabled
// get all insights associated with that install (team) that haven't been summarized
// if the team submitted ten or more insights than:
// generate summary
// save summary
// format summary
// mark insights as summarized
// for each user with notifications enabled:
// send the formatted summary
// else:
// for each user with notifications enabled:
// send reminder message

// -- refactor --
// get all installations that aren't deleted
// get all users that aren't deleted and have notifications enabled (DIFF)
// get all insights that aren't deleted and haven't been summarized (DIFF)
// for each installation:
// if the team submitted ten or more insights than:
// generate summary
// save summary
// format summary
// for each user associated with that install:
// send the formatted summary
// else:
// for each user with notifications enabled:
// send reminder message

// --------------------- //

function getInstallations(): Map<string, Installation> {
  const installations = new Map<string, Installation>();

  if (!installations || installations.size === 0) {
    throw new Error('No installations found.');
  }

  return installations;
}

function getUsers(): Map<string, User[]> {
  const users = new Map<string, User[]>();

  if (!users || users.size === 0) {
    throw new Error('No users found.');
  }

  return users;
}

function getInsights(): Map<string, Insight[]> {
  const insights = new Map<string, Insight[]>();

  if (!insights || insights.size === 0) {
    throw new Error('No insights found.');
  }

  return insights;
}

// calls open ai and generates the summary based on the given insights
function generateSummary(insights: any): SummaryData {}

function saveSummary(summary: SummaryData): Summary {}

function formatSummary(summary: Summary): string {}

function sendmessage(token: string, team: User[], fSummary: string) {}

function summarizeInsights(insights: any) {}

function runSummaryTask() {
  try {
    const installations = getInstallations(); // point of failure
    const users = getUsers(); // point of failure
    const i = getInsights(); // point of failure

    for (const [key, value] of installations) {
      const insights = i[key] ?? [];
      const team = users[key] ?? [];

      try {
        if (insights && insights.length >= 10) {
          const summaryData = generateSummary(insights); // point of failure
          const summary = saveSummary(summaryData); // point of failure
          const fSummary = formatSummary(summary); // point of failure - possible

          sendmessage(value.token, team, fSummary); // point of failure
          summarizeInsights(insights); // point of failure
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
