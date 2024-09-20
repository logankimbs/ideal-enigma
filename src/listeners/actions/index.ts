import { App } from "@slack/bolt";
import { OPEN_INSIGHT_MODAL } from "../../constants";
import openModal from "./openModal";

const register = (app: App) => {
  app.action(OPEN_INSIGHT_MODAL, openModal);
};

export default { register };
