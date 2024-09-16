import { WebClient } from "@slack/web-api"
import { installationRepo, teamRepo } from "../repositories"
import { SlackService } from "../services/SlackService"
import logger from "../utils/logger"
import { getNextOccurrence, getUnixTimestamp } from "../utils/date"
import { message } from "../messages"

/**
 * Runs every Monday at midnight (12:00 AM)
 *
 * This task schedules reminder messages to be sent every Wednesday at 3:00 PM and Friday at 10:00 AM.
 * The reminders are scheduled based on the user's timezone.
 *
 * @todo Consider optimizing for large teams by parallelizing or batching the scheduling process.
 */
export const reminderTask = async () => {
  logger.info(`Starting reminder task...`)

  try {
    // const wedReminder = message.getReminderMessage({ day: "Wednesday" });
    const friReminder = message.getReminderMessage({ day: "Friday" })
    const installations = await installationRepo.find()

    for (const installation of installations) {
      const webClient = new WebClient(installation.token)
      const slackService = new SlackService(webClient)
      const team = await teamRepo.getTeamWithUsers(installation.id)

      if (team?.users !== undefined) {
        for (const user of team.users) {
          // const wednesday = getNextOccurrence(3, 15);
          // const wedTimestamp = getUnixTimestamp(wednesday, user.data.tz);
          const friday = getNextOccurrence(5, 10)
          const friTimestamp = getUnixTimestamp(friday, user.data.tz)

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
          )
        }
      }
    }
  } catch (error) {
    logger.error(`Failed to complete reminder task: ${error}`)
    return
  }

  logger.info("Reminder task completed successfully")
}
