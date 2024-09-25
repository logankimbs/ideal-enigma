import { ExpressReceiver } from "@slack/bolt";
import { installationService } from "./services/InstallationService";
import config from "./config";

const receiver = new ExpressReceiver({
  signingSecret: config.slack.signingSecret,
  clientId: config.slack.clientId,
  clientSecret: config.slack.clientSecret,
  stateSecret: config.slack.stateSecret,
  scopes: config.slack.scopes,
  installationStore: installationService,
  installerOptions: {
    // Render "Add to Slack" button
    directInstall: false,
  },
  endpoints: {
    events: "/slack/events",
    actions: "/slack/actions",
  },
});

export default receiver;
