import { ExpressReceiver } from "@slack/bolt";
import config from "./config";
import installationService from "./services/InstallationService";

const receiver = new ExpressReceiver({
  ...config.receiver,
  installationStore: installationService,
  installerOptions: { directInstall: true },
  scopes: ["chat:write", "users:read", "users:read.email", "team:read"], // Make const?
  endpoints: { events: "/slack/events", actions: "/slack/actions" }, // Make router?
});

export default receiver;
