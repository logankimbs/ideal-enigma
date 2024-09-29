
import config from "./config";
import app from "./app";
import tasks from "./tasks";
import registerListeners from "./listeners";
import datasource from "@idealgma/datasource";
import logger from "./utils/logger";
import { orm } from "@idealgma/orm";

registerListeners(app);

const startApp = async () => {
  try {
    orm("slack-app")
    tasks.schedule();
    await datasource.initialize();
    await app.start(config.port);
    logger.info("Echo is running");
  } catch (error) {
    logger.error("Echo was unable to start", error);
  }
};

startApp();
