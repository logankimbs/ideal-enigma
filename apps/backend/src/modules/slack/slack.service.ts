import { Injectable } from '@nestjs/common';
import { CodedError, Installation, InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  EnterpriseInstallError,
  UnauthorizedInstallError,
} from '../../common/errors';
import { InstallationService } from '../installation/installation.service';
import { TeamService } from '../team/team.service';
import { createWelcomeMessage } from './messages/globals';
import { SlackInstallationStore } from './slack.installation.store';

@Injectable()
export class SlackService {
  private installer: InstallProvider;

  constructor(
    private readonly slackInstallationStore: SlackInstallationStore,
    private readonly teamService: TeamService,
    private readonly installationService: InstallationService
  ) {
    this.installer = new InstallProvider({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      stateSecret: process.env.SLACK_STATE_SECRET,
      directInstall: true,
      installationStore: this.slackInstallationStore,
      installUrlOptions: {
        scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
        userScopes: ['openid', 'profile', 'email'],
        redirectUri: `${process.env.BACKEND_URL}/slack/install/callback`,
      },
    });
  }

  async handleInstall(req: IncomingMessage, res: ServerResponse) {
    return await this.installer.handleInstallPath(req, res);
  }

  async handleInstallRedirect(req: IncomingMessage, res: ServerResponse) {
    let url: string | undefined;

    const onSuccess = async (installation: Installation) => {
      console.log('Installation successful:', installation);
      url = `${process.env.BACKEND_URL}/auth/slack?user=${installation.user.id}`;
    };

    const onFailure = (error: CodedError) => {
      const baseUrl = process.env.FRONTEND_URL || '';
      let path = '/slack/install/error';

      if (error.message.includes('cancelled the OAuth')) {
        return (url = baseUrl);
      }

      if (error instanceof UnauthorizedInstallError) {
        path += '/unauthorized';
      } else if (error instanceof EnterpriseInstallError) {
        path += '/unsupported-plan';
      }

      url = `${baseUrl}${path}`;
    };

    await this.installer.handleCallback(req, res, {
      success: onSuccess,
      failure: onFailure,
    });

    return { url };
  }

  async sendWelcomeMessageToTeam(teamId: string) {
    const team = await this.teamService.find(teamId);
    const users = team.users.filter((user) => {
      return user.notifications === true;
    });

    const installation = await this.installationService.findOne(team.id);
    const client = new WebClient(installation.token);

    await Promise.all(
      users.map((user) =>
        client.chat.postMessage(createWelcomeMessage(user.id))
      )
    );
  }
}
