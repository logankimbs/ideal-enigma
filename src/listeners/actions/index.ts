import { App } from "@slack/bolt";
import openModal, { OPEN_MODAL } from "./open-modal";

const register = (app: App) => {
  app.action(OPEN_MODAL, openModal);
};

export default { register };
