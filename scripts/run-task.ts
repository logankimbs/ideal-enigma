import app from "../src/app";
import config from "../src/config";
import datasource from "../src/datasource";
import { reminderTask } from "../src/tasks/reminderTask";
// import { summaryTask } from "../src/tasks/summaryTask";
import logger from "../src/utils/logger";

const startApp = async () => {
  try {
    await datasource.initialize();
    await app.start(config.port);
    // await summaryTask();
    await reminderTask();
  } catch (error) {
    logger.error("Error running task", error);
  }

  datasource.destroy();
  app.stop();
};

startApp();
