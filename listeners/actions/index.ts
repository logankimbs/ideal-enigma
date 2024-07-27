import { App } from '@slack/bolt';
import openModalCallback from './open-modal';

const register = (app: App) => {
  app.action('open_modal', openModalCallback);
};

export default { register };
