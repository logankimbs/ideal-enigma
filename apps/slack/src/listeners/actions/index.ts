import { App } from "@slack/bolt";
import { AUTO_LOGIN, OPEN_INSIGHT_MODAL } from "../../constants";
import openInsightModal from "./openInsightModal";
import autoLogin from "./autoLogin";

const register = (app: App) => {
  app.action(OPEN_INSIGHT_MODAL, openInsightModal);
  app.action(AUTO_LOGIN, autoLogin);
};

export default { register };
