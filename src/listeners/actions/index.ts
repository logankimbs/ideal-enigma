import { App } from "@slack/bolt";
import { OPEN_INSIGHT_MODAL } from "../../constants";
import openInsightModal from "./openInsightModal";

const register = (app: App) => {
  app.action(OPEN_INSIGHT_MODAL, openInsightModal);
};

export default { register };
