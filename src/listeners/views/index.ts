import { App } from "@slack/bolt";
import historyViewCallback, { HISTORY_VIEW_CALLBACK_ID } from "./history-view";

const register = (app: App) => {
  app.view(HISTORY_VIEW_CALLBACK_ID, historyViewCallback);
};

export default { register };
