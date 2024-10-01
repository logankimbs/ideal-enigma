import { WebClient } from "@slack/web-api";
import { SlackService } from "../services/SlackService";
import { OpenAIService } from "../services/OpenAIService";
import { message } from "../messages";
import getNextOccurrence from "../utils/date";
import logger from "../utils/logger";
import { getDatasource, InstallationEntity } from "@idealgma/datasource";

const datasource = getDatasource();
const installationRepository = datasource.getRepository(InstallationEntity);
const teamRepository = datasource.getTeamRepository();
const insightRepository = datasource.getInsightRepository();

/**
 * Runs every Sunday at midnight (12:00 AM)
 *
 * This task schedules summary messages to be sent every Monday at 10:00 AM.
 * The summaries are scheduled based on the user's timezone.
 */
export const summaryTask = async () => {
  try {
    logger.info("Starting summary task...");

    const openAI = new OpenAIService();
    const installations = await installationRepository.find();
    const reminder = message.getReminderMessage({ day: "Monday" });

    for (const installation of installations) {
      if (!installation.token) {
        logger.warn(`Skipping installation ${installation.id}: Missing token`);

        continue;
      }

      const webClient = new WebClient(installation.token);
      const slackService = new SlackService(webClient);
      const team = await teamRepository.getTeamWithUsers(installation.id);

      if (team?.users !== undefined) {
        const insights = await insightRepository.getRecentUnsummarizedInsightsForTeam(
          team.id,
        );

        if (insights.length >= 10) {
          let summary;

          try {
            summary = await openAI.summarizeInsights(insights);
          } catch (error) {
            logger.error(
              `Failed to generate summary for installation ${installation.id}: ${error}`,
            );

            continue;
          }

          const summaryMessage = message.getSummaryMessage({
            summary,
            count: insights.length,
          });

          const schedulePromises = team.users.map(async (user) => {
            if (user.data.deleted) return;

            const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

            return slackService.scheduleMessage(
              user.id,
              summaryMessage.text,
              timestamp,
              summaryMessage.blocks,
            );
          });

          await Promise.all(schedulePromises);

          await insightRepository.markInsightsAsSummarized(insights);
        } else {
          const schedulePromises = team.users.map(async (user) => {
            if (user.data.deleted) return;

            logger.info(`Scheduling default summary message for ${user.id}`);

            const timestamp = getNextOccurrence(user.data.tz, 1, 10, 0);

            return slackService.scheduleMessage(
              user.id,
              reminder.text,
              timestamp,
              reminder.blocks,
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

  logger.info("Summary task completed successfully");
};
