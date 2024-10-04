import { getDatasource, InstallationEntity } from "@idealgma/datasource";
import { WebClient } from "@slack/web-api";
import { message } from "../messages";
import { SlackService } from "../services/SlackService";
import getNextOccurrence from "../utils/date";
import logger from "../utils/logger";

const datasource = getDatasource();
const installationRepository = datasource.getRepository(InstallationEntity);
const teamRepository = datasource.getTeamRepository();

/**
 * Runs every Monday at midnight (12:00 AM)
 *
 * This task schedules reminder messages to be sent every Wednesday at 3:00 PM and Friday at 10:00 AM.
 * The reminders are scheduled based on the user's timezone.
 *
 * @todo Consider optimizing for large teams by parallelizing or batching the scheduling process.
 */
export const reminderTask = async () => {
  logger.info(`Starting reminder task...`);

  try {
    // const wedReminder = message.getReminderMessage({ day: "Wednesday" });
    const friReminder = message.getReminderMessage({ day: "Friday" });
    const installations = await installationRepository.find();

    for (const installation of installations) {
      const webClient = new WebClient(installation.token);
      const slackService = new SlackService(webClient);
      const team = await teamRepository.getTeamWithUsers(installation.id);

      if (team?.users !== undefined) {
        for (const user of team.users) {
          // const wedTimestamp = getNextOccurrence(user.data.tz, 3, 15, 0);
          const friTimestamp = getNextOccurrence(user.data.tz, 5, 10, 0);

          // await slackService.scheduleMessage(
          //   user.id,
          //   wedReminder.text,
          //   wedTimestamp,
          //   wedReminder.blocks,
          // );

          await slackService.scheduleMessage(
            user.id,
            friReminder.text,
            friTimestamp,
            friReminder.blocks,
          );
        }
      }
    }
  } catch (error) {
    logger.error(`Failed to complete reminder task: ${error}`);
    return;
  }

  logger.info("Reminder task completed successfully");
};
