import { App } from "@slack/bolt";
import appHomeOpened from "./appHomeOpened";
import teamJoin from "./teamJoin";
import userChange from "./userProfileChanged";

const register = (app: App) => {
  app.event("app_home_opened", appHomeOpened);
  app.event("team_join", teamJoin);
  app.event("user_profile_changed", userChange);
};

export default { register };
