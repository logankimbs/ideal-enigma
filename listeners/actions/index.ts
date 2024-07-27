import { App } from "@slack/bolt";
import openModalCallback, { OPEN_MODAL_ACTION_ID } from "./open-modal";

const register = (app: App) => {
  app.action(OPEN_MODAL_ACTION_ID, openModalCallback);
};

export default { register };
