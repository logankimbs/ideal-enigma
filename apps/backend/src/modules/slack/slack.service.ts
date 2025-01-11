import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CodedError, Installation, InstallProvider } from '@slack/oauth';
import { WebClient } from '@slack/web-api';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  EnterpriseInstallError,
  UnauthorizedInstallError,
} from '../../common/errors';
import { AuthService } from '../auth/auth.service';
import { InstallationService } from '../installation/installation.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { createWelcomeMessage } from './messages/globals';
import { SlackInstallationStore } from './slack.installation.store';

const slack_callback_path = '/api/auth/callback/slack';
const frontend_url = process.env.FRONTEND_URL;
const redirect_uri = frontend_url + slack_callback_path;

@Injectable()
export class SlackService {
  private client: WebClient;
  private installer: InstallProvider;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly slackInstallationStore: SlackInstallationStore,
    private readonly teamService: TeamService,
    private readonly installationService: InstallationService,
    private readonly authService: AuthService,
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
        redirectUri: `${process.env.BACKEND_URL}/slack/install/callback`,
      },
    });
  }

  async handleLogin(code: string) {
    const userId = await this.cacheManager.get<string>(code);
    if (!userId) return { status: 'fail' };

    return this.getLoginUrl(userId);
  }

  async handleLogin2(code: string, state: string) {
    const token = await this.client.openid.connect.token({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    });

    let userAccessToken = token.access_token;

    if (token.refresh_token) {
      const refreshedToken = await this.client.openid.connect.token({
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      });

      userAccessToken = refreshedToken.access_token;
    }

    const tokenWiredClient = new WebClient(userAccessToken);
    const userInfo = await tokenWiredClient.openid.connect.userInfo();
    const accessToken = await this.authService.sign(userInfo);
    const user = await this.userService.findOne(userInfo.sub);

    return { accessToken, user };
  }

  async getLoginUrl(userId: string) {
    const user = await this.userService.findOne(userId);

    if (!user) throw new UnauthorizedException();

    const url = new URL('https://slack.com/openid/connect/authorize');
    const params = new URLSearchParams({
      response_type: 'code',
      scope: ['openid', 'profile', 'email'].join(' '),
      client_id: process.env.SLACK_CLIENT_ID,
      state: process.env.SLACK_STATE_SECRET,
      team: user.team.id,
      nonce: process.env.SLACK_NONCE,
      redirect_uri: redirect_uri,
    });

    url.search = params.toString();

    return { url: url.toString() };
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
