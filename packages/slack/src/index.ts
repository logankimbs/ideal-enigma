import "reflect-metadata";
import config from "./config";
import app from "./app";
import tasks from "./tasks";
import registerListeners from "./listeners";
import datasource from "./datasource";
import logger from "./utils/logger";
import { getSharedDataSource } from "@idealgma/datasource";

registerListeners(app);

const startApp = async () => {
  try {
    getSharedDataSource();
    tasks.schedule();
    await datasource.initialize();
    await app.start(config.port);
    logger.info("Echo is running");
  } catch (error) {
    logger.error("Echo was unable to start", error);
  }
};

startApp();
