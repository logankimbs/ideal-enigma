import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import config from '../../config';
import { apiRequest } from '../../utils/apiRequest';
import logger from '../../utils/logger';

const teamJoin = async ({
  event,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'team_join'>) => {
  try {
    if (!event.user.is_bot) {
      await apiRequest({
        method: 'post',
        url: config.apiUrl + '/users',
        data: event.user,
      });

      logger.info(
        `Successfully added user ${event.user.id} to team ${event.user.team_id}`
      );
    }
  } catch (error) {
    logger.error(`Error adding user ${event.user.id}: ${error}`);
  }
};

export default teamJoin;
