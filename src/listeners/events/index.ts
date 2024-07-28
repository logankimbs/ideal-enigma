import { App } from "@slack/bolt";
import appHomeOpenedCallback, {
  APP_HOME_OPENED_EVENT_NAME,
} from "./app-home-opened";

const register = (app: App) => {
  app.event(APP_HOME_OPENED_EVENT_NAME, appHomeOpenedCallback);
};

export default { register };
