import { App } from "@slack/bolt";
import actions from "./actions";
import events from "./events";
import views from "./views";

const registerListeners = (app: App) => {
  actions.register(app);
  events.register(app);
  views.register(app);
};

export default registerListeners;
