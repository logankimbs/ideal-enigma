import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CodedError, Installation, InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  EnterpriseInstallError,
  UnauthorizedInstallError,
} from '../../common/exceptions/install.exceptions';
import { InstallationsService } from '../installations/installations.service';
import { TeamsService } from '../teams/teams.service';
import { welcomeMessage } from './messages/welcome.message';
import { SlackInstallationStore } from './slack.installation.store';

@Injectable()
export class SlackService {
  private installer: InstallProvider;

  constructor(
    private readonly slackInstallationStore: SlackInstallationStore,
    private readonly teamService: TeamsService,
    private readonly installationService: InstallationsService,
    private configService: ConfigService
  ) {
    this.installer = new InstallProvider({
      clientId: this.configService.get<string>('slack.clientId'),
      clientSecret: this.configService.get<string>('slack.clientSecret'),
      stateSecret: this.configService.get<string>('slack.state'),
      directInstall: true,
      installationStore: this.slackInstallationStore,
      installUrlOptions: {
        scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
        userScopes: ['openid', 'profile', 'email'],
        redirectUri: `${this.configService.get<string>(
          'backendUrl'
        )}/slack/install/callback`,
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
      url = `${this.configService.get<string>('backendUrl')}/auth/slack?user=${
        installation.user.id
      }`;
    };

    const onFailure = (error: CodedError) => {
      const baseUrl = this.configService.get<string>('frontendUrl') || '';
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
      users.map((user) => client.chat.postMessage(welcomeMessage(user.id)))
    );
  }
}
