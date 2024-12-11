import { Injectable } from '@nestjs/common';
import { InstallProvider } from '@slack/oauth';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { SlackInstallationStore } from './slack.installation.store';

@Injectable()
export class SlackService {
  private installer: InstallProvider;

  constructor(private readonly slackInstallationStore: SlackInstallationStore) {
    this.installer = new InstallProvider({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      stateSecret: process.env.SLACK_STATE_SECRET,
      directInstall: true,
      installationStore: this.slackInstallationStore,
      installUrlOptions: {
        scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
        redirectUri: `${process.env.BACKEND_URL}/slack/install/callback`,
      },
    });
  }

  async handleInstall(req: IncomingMessage, res: ServerResponse) {
    return await this.installer.handleInstallPath(req, res);
  }

  async handleInstallRedirect(req: IncomingMessage, res: ServerResponse) {
    let url = process.env.FRONTEND_URL;

    await this.installer.handleCallback(req, res, {
      success: (installation) => {
        console.log('Installation successful:', installation);
        url = `${url}/pricing`;
      },
      failure: (error) => {
        console.log('Installation failed:', error);
        url = `${url}`;
      },
    });

    return { url };
  }
}
