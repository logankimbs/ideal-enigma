import "reflect-metadata";
import { App, LogLevel } from "@slack/bolt";
import { config } from "dotenv";
import registerListeners from "./listeners";
import { AppDataSource } from "./database/data-source";
import { installationStore } from "./installation-store";

config();

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: "my-state-secret",
  scopes: ["channels:history", "chat:write", "commands"],
  installationStore: installationStore,
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
