import { App } from "@slack/bolt";
import { SUBMIT_INSIGHT } from "../../constants";
import submitInsight from "./submitInsight";

const register = (app: App) => {
  app.view(SUBMIT_INSIGHT, submitInsight);
};

export default { register };
