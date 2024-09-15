import "reflect-metadata";
import { App, ExpressReceiver, LogLevel } from "@slack/bolt";
import { config } from "./config";
import { datasource } from "./config/datasource";
import registerListeners from "./listeners";
import logger from "./utils/logger";
import { installationService } from "./services/InstallationService";
import tasks from "./tasks";

const receiver = new ExpressReceiver({
  signingSecret: config.slackSigningSecret,
  clientId: config.slackClientId,
  clientSecret: config.slackClientSecret,
  stateSecret: config.stateSecret,
  scopes: config.scopes,
  installationStore: installationService,
  installerOptions: {
    // Render "Add to Slack" button
    directInstall: false,
  },
  endpoints: {
    events: "/slack/events",
    actions: "/slack/actions",
  },
});

const app = new App({
  logLevel: LogLevel.DEBUG,
  receiver: receiver,
  processBeforeResponse: true,
});

registerListeners(app);

const startApp = async () => {
  try {
    tasks.schedule();
    await datasource.initialize();
    await app.start(config.port);
    logger.info("Echo is running");
  } catch (error) {
    logger.error("Echo was unable to start", error);
  }
};

startApp();
