import datasource from "@idealgma/datasource";
import config from "./config";
import app from "./app";
import tasks from "./tasks";
import registerListeners from "./listeners";
import logger from "./utils/logger";

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
