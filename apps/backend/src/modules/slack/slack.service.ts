import { LoginResponse } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CodedError, Installation, InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  EnterpriseInstallError,
  UnauthorizedInstallError,
} from '../../common/errors';
import { InstallationService } from '../installation/installation.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { createWelcomeMessage } from './messages/globals';
import { SlackInstallationStore } from './slack.installation.store';

const REDIRECT_URI = `${process.env.FRONTEND_URL}/api/login/slack/callback`;

@Injectable()
export class SlackService {
  private client: WebClient;
  private installer: InstallProvider;

  constructor(
    private readonly slackInstallationStore: SlackInstallationStore,
    private readonly teamService: TeamService,
    private readonly installationService: InstallationService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
    this.client = new WebClient();
    this.installer = new InstallProvider({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      stateSecret: process.env.SLACK_STATE_SECRET,
      directInstall: true,
      installationStore: this.slackInstallationStore,
      installUrlOptions: {
        scopes: ['chat:write', 'users:read', 'users:read.email', 'team:read'],
        userScopes: ['openid', 'profile', 'email'],
        redirectUri: REDIRECT_URI,
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

  getAuthUrl(teamId: string): string {
    const redirectUrl = new URL('https://slack.com/openid/connect/authorize');

    redirectUrl.search = new URLSearchParams({
      response_type: 'code',
      scope: ['openid', 'profile', 'email'].join(' '),
      client_id: process.env.SLACK_CLIENT_ID,
      state: process.env.SLACK_STATE_SECRET,
      team: teamId,
      nonce: process.env.SLACK_NONCE,
      // Redirect response to frontend
      redirect_uri: REDIRECT_URI,
    }).toString();

    return redirectUrl.toString();
  }

  async handleLogin(code: string, state: string): Promise<LoginResponse> {
    const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = process.env;

    // Function to request tokens from Slack
    const requestToken = async (params: Record<string, string>) =>
      this.client.openid.connect.token({
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        ...params,
      });

    // Exchange the authorization code for tokens
    const openIdToken = await requestToken({
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    });

    // Use refresh token if available to get the latest access token
    const accessToken = openIdToken.refresh_token
      ? (
          await requestToken({
            grant_type: 'refresh_token',
            refresh_token: openIdToken.refresh_token,
          })
        ).access_token
      : openIdToken.access_token;

    // Fetch user information
    const tokenWiredClient = new WebClient(accessToken);
    const userInfo = await tokenWiredClient.openid.connect.userInfo();

    // Generate a JWT and find the user in the database
    const token = await this.jwtService.signAsync(userInfo);
    const user = await this.userService.findOne(userInfo.sub);

    return { token, user } as LoginResponse;
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
