import { ExpressReceiver } from '@slack/bolt';
import installationService from './services/InstallationService';

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  installationStore: installationService,
  installerOptions: { directInstall: true },
  scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
  endpoints: { events: '/slack/events', actions: '/slack/actions' },
});

export default receiver;
