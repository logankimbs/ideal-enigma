import "reflect-metadata";
import { App, LogLevel } from "@slack/bolt";
import * as dotenv from "dotenv";
import registerListeners from "./src/listeners";
import { AppDataSource } from "./src/database/data-source";

dotenv.config();

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
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
    console.error("Unable to start Echo", error);
  }
})();
