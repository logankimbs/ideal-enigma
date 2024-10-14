import { Installation, Team, User } from "@idealgma/common";
import {
  InstallationQuery,
  InstallationStore,
  Installation as SlackInstallation,
} from "@slack/bolt";
import { WebClient } from "@slack/web-api";
import config from "../config";
import { message } from "../messages";
import { apiRequest } from "../utils/apiRequest";
import logger from "../utils/logger";
import { SlackService } from "./SlackService";

const installationService: InstallationStore = {
  storeInstallation: async function <AuthVersion extends "v1" | "v2">(
    installation: SlackInstallation<AuthVersion, boolean>,
  ): Promise<void> {
    try {
      if (installation.isEnterpriseInstall && installation.enterprise) {
        logger.warn("Enterprise wide app installation is not yet supported");
        // TODO: Implement enterprise app installation
        return;
      }

      if (installation.team) {
        await handleSingleTeamInstallation(installation);
        return;
      }

      throw new Error("Installation is missing required information.");
    } catch (error) {
      logger.error("Failed to save installation:", error);
    }
  },

  fetchInstallation: async function (
    query: InstallationQuery<boolean>,
  ): Promise<SlackInstallation<"v1" | "v2", boolean>> {
    const id = getInstallationId(query);
    logger.info(`Fetching installation for ${id}`);
    const installationEntity: Installation = await apiRequest({
      method: "get",
      url: `${config.apiUrl}/installations/${id}`,
    });

    if (!installationEntity) {
      throw new Error("Installation was not found.");
    }

    return installationEntity.data as SlackInstallation;
  },

  deleteInstallation: async function (
    query: InstallationQuery<boolean>,
  ): Promise<void> {
    const id = getInstallationId(query);

    try {
      await apiRequest({
        method: "delete",
        url: `${config.apiUrl}/installations/${id}`,
      });
    } catch (error) {
      logger.error(`Error deleting installation ${id}: ${error}`);
    }
  },
};

/*********************/
/* Helper Functions */
async function handleSingleTeamInstallation(
  installation: SlackInstallation,
): Promise<void> {
  try {
    const slackInstallation = await saveInstallation(
      installation.team!.id,
      installation,
    );

    const webClient = new WebClient(slackInstallation.token);
    const slackService = new SlackService(webClient);
    const slackTeam = await slackService.getTeamInfo(installation.team!.id);
    const slackUsers = await slackService.getUsersList(installation.team!.id);

    logger.info(`Saving team ${slackTeam?.id}`);
    const teamEntity: Team = await apiRequest({
      method: "post",
      url: `${config.apiUrl}/teams`,
      data: slackTeam,
    });

    if (slackUsers) {
      logger.info(`Saving a batch of users for team ${teamEntity.id}`);
      const userEntities: User[] = await apiRequest({
        method: "post",
        url: `${config.apiUrl}/users/batch?teamId=${teamEntity.id}`,
        data: { users: slackUsers },
      });

      await Promise.all(
        userEntities.map(async (user: User) => {
          // Schedules the message for 1 minute and 30 seconds later
          const postAt = Math.floor(Date.now() / 1000) + 90;
          const welcomeMessage = message.getWelcomeMessage({
            userId: user.id,
          });

          logger.info(`Scheduling welcome message for user ${user.id}`);
          await slackService.scheduleMessage(
            user.id,
            welcomeMessage.text,
            postAt,
            welcomeMessage.blocks,
          );
        }),
      );
    }
  } catch (error) {
    console.error("Error handling single team installation:", error);
    throw new Error(
      `Failed to handle installation for team: ${installation.team?.id}`,
    );
  }
}

async function saveInstallation(
  id: string,
  installation: SlackInstallation,
): Promise<Installation> {
  logger.info(`Saving installation for ${id}`);

  try {
    const installationEntity: Installation = await apiRequest({
      method: "post",
      url: `${config.apiUrl}/installations`,
      data: {
        id,
        installation,
        token: installation.bot?.token,
      },
    });

    console.log(installationEntity);

    return installationEntity;
  } catch (error: unknown) {
    throw new Error(`Failed to save installation for ${id}: ${error}`);
  }
}

function getInstallationId(
  query: InstallationQuery<boolean>,
): string | undefined {
  return query.isEnterpriseInstall ? query.enterpriseId : query.teamId;
}

export default installationService;
