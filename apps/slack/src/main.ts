import app from './app';
import config from './config';
import registerListeners from './listeners';
import tasks from './tasks';
import logger from './utils/logger';

registerListeners(app);

const startApp = async () => {
  try {
    tasks.schedule();
    await app.start(config.port);
    logger.info('Loop is running');
  } catch (error) {
    logger.error('Loop was unable to start', error);
  }
};

startApp();
