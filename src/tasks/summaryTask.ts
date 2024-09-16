import { WebClient } from "@slack/web-api"
import { installationRepo, insightRepo, teamRepo } from "../repositories"
import logger from "../utils/logger"
import { SlackService } from "../services/SlackService"
import { getNextOccurrence, getUnixTimestamp } from "../utils/date"
import { OpenAIService } from "../services/OpenAIService"
import { message } from "../messages"

/**
 * Runs every Sunday at midnight (12:00 AM)
 *
 * This task schedules summary messages to be sent every Monday at 10:00 AM.
 * The summaries are scheduled based on the user's timezone.
 */
export const summaryTask = async () => {
  try {
    logger.info("Starting summary task...")

    const openAI = new OpenAIService()
    const installations = await installationRepo.find()
    const reminder = message.getReminderMessage({ day: "Friday" })

    for (const installation of installations) {
      if (!installation.token) {
        logger.warn(`Skipping installation ${installation.id}: Missing token`)

        continue
      }

      const webClient = new WebClient(installation.token)
      const slackService = new SlackService(webClient)
      const team = await teamRepo.getTeamWithUsers(installation.id)

      if (team?.users !== undefined) {
        const insights = await insightRepo.getRecentUnsummarizedInsightsForTeam(
          team.id,
        )

        if (insights.length >= 10) {
          let summary

          try {
            summary = await openAI.summarizeInsights(insights)
          } catch (error) {
            logger.error(
              `Failed to generate summary for installation ${installation.id}: ${error}`,
            )

            continue
          }

          const summaryMessage = message.getSummaryMessage({
            summary,
            count: insights.length,
          })

          const schedulePromises = team.users.map(async (user) => {
            const monday = getNextOccurrence(2, 10)
            const monTimestamp = getUnixTimestamp(monday, user.data.tz)

            return slackService.scheduleMessage(
              user.id,
              summaryMessage.text,
              monTimestamp,
              summaryMessage.blocks,
            )
          })

          await Promise.all(schedulePromises)

          await insightRepo.markInsightsAsSummarized(insights)
        } else {
          const schedulePromises = team.users.map(async (user) => {
            const monday = getNextOccurrence(2, 10)
            const monTimestamp = getUnixTimestamp(monday, user.data.tz)

            return slackService.scheduleMessage(
              user.id,
              reminder.text,
              monTimestamp,
              reminder.blocks,
            )
          })

          await Promise.all(schedulePromises)
        }
      }
    }
  } catch (error) {
    logger.error(`Failed to complete summary task: ${error}`)
    return
  }

  logger.info("Summary task completed successfully")
}
