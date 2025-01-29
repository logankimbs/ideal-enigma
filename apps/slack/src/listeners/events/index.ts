import { App } from '@slack/bolt';
import appHomeOpened from './appHomeOpened';
import appUninstalled from './appUninstalled';
import teamJoin from './teamJoin';
import userProfileChanged from './userProfileChanged';

const register = (app: App) => {
  app.event('app_home_opened', appHomeOpened);
  app.event('team_join', teamJoin);
  app.event('user_profile_changed', userProfileChanged);
  app.event('app_uninstalled', appUninstalled);
};

export default { register };
