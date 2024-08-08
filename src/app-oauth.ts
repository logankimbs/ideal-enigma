import "reflect-metadata";
import { App, LogLevel } from "@slack/bolt";
import { config } from "dotenv";
import registerListeners from "./listeners";
import { Company, SlackInstallation } from "./database/entities";
import {
  CompanyRepository,
  SlackInstallationRepository,
  SourceRepository,
} from "./database/repositories";
import { AppDataSource } from "./database/data-source";

config();

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: "my-state-secret",
  scopes: ["channels:history", "chat:write", "commands"],
  installationStore: {
    storeInstallation: async (installation) => {
      const { isEnterpriseInstall, enterprise } = installation;

      // Org-wide installation
      if (isEnterpriseInstall && enterprise !== undefined) {
        console.log("Org installation", installation);

        // Get the slack source from the source table
        const slackSource = await SourceRepository.findOneBy({ name: "slack" });
        console.log("Slack", slackSource);

        if (!slackSource) throw new Error("Slack source not found");

        // Create company
        const company = new Company();
        company.name = enterprise.name || "";
        company.sources = [slackSource];

        // Save company
        const savedCompany = await CompanyRepository.save(company);
        console.log("Company", savedCompany);

        // Create a new SlackInstallation entity
        const newInstallation = new SlackInstallation();
        if (installation.team) {
          newInstallation.team = {
            id: installation.team.id,
            name: installation.team.name || "", // Ensure name is a string
          };
        } else {
          newInstallation.team = undefined;
        }

        if (installation.enterprise) {
          newInstallation.enterprise = {
            id: installation.enterprise.id,
            name: installation.enterprise.name || "", // Ensure name is a string
          };
        } else {
          newInstallation.enterprise = undefined;
        }

        newInstallation.user = installation.user;
        newInstallation.token_type = installation.tokenType || "";
        newInstallation.is_enterprise_install =
          installation.isEnterpriseInstall || false;
        newInstallation.app_id = installation.appId || "";
        newInstallation.auth_version = installation.authVersion || "";
        if (installation.bot) {
          newInstallation.bot = {
            scopes: installation.bot.scopes,
            token: installation.bot.token,
            user_id: installation.bot.userId,
            id: installation.bot.id,
          };
        }
        newInstallation.enterprise_url = installation.enterpriseUrl || "";

        // Save installation
        const savedInstallation =
          await SlackInstallationRepository.save(newInstallation);
        console.log("Slack Installation", savedInstallation);
        return;
      }
      // Single team installation
      if (installation.team !== undefined) {
        console.log(installation);
        // INSTALATION FOR SINGLE TEAM
        // installation: {
        //   team: { id: 'T07ESUM7XPA', name: 'The Playground' },
        //   enterprise: undefined,
        //   user: { token: undefined, scopes: undefined, id: 'U07E6KL1RUL' },
        //   tokenType: 'bot',
        //   isEnterpriseInstall: false,
        //   appId: 'A07EH2LU06M',
        //   authVersion: 'v2',
        //   bot: {
        //     scopes: [
        //       'channels:history',
        //       'chat:write',
        //       'commands',
        //       'im:write',
        //       'im:history',
        //       'users:read',
        //       'chat:write.customize'
        //     ],
        //     token: 'xoxb-######',
        //     userId: '',
        //     id: ''
        //   }
        // }
        return;
      }
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      // Org-wide installation lookup
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        //
      }
      // Single team installation lookup
      if (installQuery.teamId !== undefined) {
        // return tempDB.get(installQuery.teamId);
      }
      throw new Error("Failed fetching installation");
    },
    deleteInstallation: async (installQuery) => {
      // Org-wide installation deletion
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        // tempDB.delete(installQuery.enterpriseId);
        return;
      }
      // Single team installation deletion
      if (installQuery.teamId !== undefined) {
        // tempDB.delete(installQuery.teamId);
        return;
      }
      throw new Error("Failed to delete installation");
    },
  },
  installerOptions: {
    // If true, /slack/install redirects installers to the Slack Authorize URL
    // without rendering the web page with "Add to Slack" button
    directInstall: false,
  },
});

/** Register Listeners */
registerListeners(app);

/** Start Echo */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("Echo is running!");
    await AppDataSource.initialize();
    console.log("Database connection established!");
  } catch (error) {
    console.error("Unable to start App", error);
  }
})();
