import { App } from "@slack/bolt";
import actions from "./actions";
import events from "./events";
import messages from "./messages";
import views from "./views";

const registerListeners = (app: App) => {
  actions.register(app);
  events.register(app);
  messages.register(app);
  views.register(app);
};

export default registerListeners;
