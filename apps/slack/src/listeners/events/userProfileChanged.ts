import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import logger from '../../utils/logger';

const userProfileChanged = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'user_profile_changed'>) => {
  try {
    logger.info(`Implement updating user ${event.user.id}`);
    // await apiRequest({
    //   method: "put",
    //   url: config.apiUrl + "/users",
    //   data: event.user,
    // });
  } catch (error) {
    logger.error(`Error updating user ${event.user}: ${error}`);
  }
};

export default userProfileChanged;
