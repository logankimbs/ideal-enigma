import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CodedError, Installation, InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { SlackCallbackDto } from '../auth/dto/slack-callback.dto';
import { SlackInstallationStore } from './slack.installation.store';

@Injectable()
export class SlackService {
  private installer: InstallProvider;
  private web: WebClient;

  constructor(
    private readonly slackInstallationStore: SlackInstallationStore,
    private jwtService: JwtService
  ) {
    this.web = new WebClient();
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
      url = await this.handleOnboard(installation.team.id);
    };

    const onFailure = (error: CodedError) => {
      console.log('Installation failed:', error);
      url = `${process.env.FRONT_END}`;
    };

    await this.installer.handleCallback(req, res, {
      success: onSuccess,
      failure: onFailure,
    });

    return { url };
  }

  async handleOnboard(teamId: string) {
    const url = new URL('https://slack.com/openid/connect/authorize');
    const params = new URLSearchParams({
      response_type: 'code',
      scope: ['openid', 'profile', 'email'].join(' '),
      client_id: process.env.SLACK_CLIENT_ID,
      state: process.env.SLACK_STATE_SECRET,
      team: teamId,
      nonce: process.env.SLACK_NONCE,
      redirect_uri: `${process.env.BACKEND_URL}/slack/onboard`,
    });

    url.search = params.toString();

    return url.toString();
  }

  async handleOnboardLogin(slackCallbackDto: SlackCallbackDto) {
    const token = await this.web.openid.connect.token({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: slackCallbackDto.code,
      redirect_uri: `${process.env.BACKEND_URL}/slack/onboard`,
    });

    let userAccessToken = token.access_token;

    if (token.refresh_token) {
      const refreshedToken = await this.web.openid.connect.token({
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      });

      userAccessToken = refreshedToken.access_token;
    }

    const tokenWiredClient = new WebClient(userAccessToken);
    const userInfo = await tokenWiredClient.openid.connect.userInfo();
    const accessToken = await this.jwtService.signAsync(userInfo);

    return {
      url: `${process.env.FRONTEND_URL}/api/slack/onboard?access_token=${accessToken}`,
    };
  }
}
