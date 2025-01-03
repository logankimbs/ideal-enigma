import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import config from '../../config';
import { apiRequest } from '../../utils/apiRequest';
import logger from '../../utils/logger';

const userProfileChanged = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'user_profile_changed'>) => {
  logger.info(`Implement updating user ${event.user.id}`);

  try {
    await apiRequest({
      method: 'put',
      url: config.apiUrl + '/users',
      data: event.user,
    });
  } catch (error) {
    logger.error(`Error updating user ${event.user}: ${error}`);
  }
};

export default userProfileChanged;
