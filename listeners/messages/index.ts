import { App } from "@slack/bolt";
import reminderMessageCallback from "./reminder-message";

const register = (app: App) => {
  app.message(/^(hi|hello|hey).*/, reminderMessageCallback);
};

export default { register };
