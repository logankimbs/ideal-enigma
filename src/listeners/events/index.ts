import { App } from "@slack/bolt";
import appHomeOpened from "./appHomeOpened";

const register = (app: App) => {
  app.event("app_home_opened", appHomeOpened);
};

export default { register };
