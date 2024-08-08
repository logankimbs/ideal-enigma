import { Installation } from "@slack/bolt";
import { AppDataSource } from "../data-source";
import { SlackInstallation } from "../entities";

export const SlackInstallationRepository = AppDataSource.getRepository(
  SlackInstallation,
).extend({
  async saveInstallation(installation: Installation) {
    const slackInstallation = new SlackInstallation();

    slackInstallation.team_id = installation.team?.id;
    slackInstallation.enterprise_id = installation.enterprise?.id;
    slackInstallation.installation = installation;

    console.log("slack installation", slackInstallation);

    return await this.save(slackInstallation);
  },
});
