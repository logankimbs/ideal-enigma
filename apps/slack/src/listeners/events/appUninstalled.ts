import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import config from '../../config';
import { apiRequest } from '../../utils/apiRequest';
import logger from '../../utils/logger';

const appUninstalled = async ({
  event,
  body,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_uninstalled'>) => {
  logger.info(`App uninstalled event: ${event}`);
  console.log('body', body);

  try {
    // delete installation
    await apiRequest({
      method: 'delete',
      url: config.apiUrl + '/installations/' + body.team_id,
    });
  } catch (error) {
    logger.error(`Error uninstalling app ${event}: ${error}`);
  }
};

export default appUninstalled;
