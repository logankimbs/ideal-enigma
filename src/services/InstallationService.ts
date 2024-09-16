import { Installation, InstallationQuery, InstallationStore } from "@slack/bolt"
import { WebClient } from "@slack/web-api"
import logger from "../utils/logger"
import { installationRepo } from "../repositories"
import { SlackService } from "./SlackService"
import { teamService } from "./TeamService"
import { userService } from "./UserService"
import { InstallationEntity } from "../entities"
import { message } from "../messages"

export const installationService: InstallationStore = {
    storeInstallation: async function <AuthVersion extends "v1" | "v2">(
        installation: Installation<AuthVersion, boolean>,
    ): Promise<void> {
        try {
            if (installation.isEnterpriseInstall && installation.enterprise) {
                logger.warn(
                    "Enterprise wide app installation is not yet supported",
                )
                // TODO: Implement enterprise app installation
                return
            }

            if (installation.team) {
                await handleSingleTeamInstallation(installation)
                return
            }

            throw new Error("Installation is missing required information.")
        } catch (error) {
            logger.error("Failed to save installation:", error)
        }
    },

    fetchInstallation: async function (
        query: InstallationQuery<boolean>,
    ): Promise<Installation<"v1" | "v2", boolean>> {
        const id = getInstallationId(query)
        const installation = await installationRepo.findOneBy({ id })

        if (!installation) {
            throw new Error("Installation was not found.")
        }

        return installation.data as Installation
    },

    deleteInstallation: async function (
        query: InstallationQuery<boolean>,
    ): Promise<void> {
        const id = getInstallationId(query)

        try {
            await installationRepo.softDelete({ id })
        } catch (error) {
            logger.error("Error deleting installation:", error)
        }
    },
}

/*********************/
/* Helper Functions */
async function handleSingleTeamInstallation(
    installation: Installation,
): Promise<void> {
    try {
        const slackInstallation = await saveInstallation(
            installation.team!.id,
            installation,
        )

        const webClient = new WebClient(slackInstallation.token)
        const slackService = new SlackService(webClient)
        const slackTeam = await slackService.getTeamInfo(installation.team!.id)
        const slackUsers = await slackService.getUsersList(
            installation.team!.id,
        )
        const teamEntity = await teamService.saveTeam(slackTeam)

        if (slackUsers) {
            await Promise.all(
                slackUsers.map(async (user) => {
                    // Schedules the message for 1 minute and 30 seconds later
                    const postAt = Math.floor(Date.now() / 1000) + 90
                    const slackUser = await userService.saveUser(
                        user,
                        teamEntity,
                    )
                    const welcomeMessage = message.getWelcomeMessage({
                        userId: slackUser.id,
                    })

                    await slackService.scheduleMessage(
                        slackUser.id,
                        welcomeMessage.text,
                        postAt,
                        welcomeMessage.blocks,
                    )
                }),
            )
        }
    } catch (error) {
        console.error("Error handling single team installation:", error)
        throw new Error(
            `Failed to handle installation for team: ${installation.team?.id}`,
        )
    }
}

async function saveInstallation(id: string, installation: Installation) {
    try {
        const installationEntity = InstallationEntity.createInstallationEntity(
            installation,
            id,
        )
        return await installationRepo.save(installationEntity)
    } catch (error) {
        throw new Error(`Failed to save installation: ${installation}`)
    }
}

function getInstallationId(
    query: InstallationQuery<boolean>,
): string | undefined {
    return query.isEnterpriseInstall ? query.enterpriseId : query.teamId
}
