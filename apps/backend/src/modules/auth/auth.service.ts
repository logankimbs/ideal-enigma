import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebClient } from '@slack/web-api';
import { UsersService } from '../users/users.service';
import { SlackAuthorizeDto } from './dtos/slack-authorize.dto';
import { SlackCallbackDto } from './dtos/slack-callback.dto';

@Injectable()
export class AuthService {
  client: WebClient;
  client_id: string;
  client_secret: string;
  state_secret: string;
  nonce_secret: string;
  redirect_uri: string;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.client = new WebClient();

    this.client_id = this.configService.get<string>('slack.clientId');
    this.client_secret = this.configService.get<string>('slack.clientSecret');
    this.state_secret = this.configService.get<string>('slack.state');
    this.nonce_secret = this.configService.get<string>('slack.nonce');
    this.redirect_uri = `${this.configService.get<string>(
      'backendUrl'
    )}/auth/slack/callback`;
  }

  async slackAuthorize(slackAuthorizeDto: SlackAuthorizeDto) {
    const user = await this.userService.findUserById(slackAuthorizeDto.user);

    if (!user) throw new UnauthorizedException();

    const url = new URL('https://slack.com/openid/connect/authorize');
    const params = new URLSearchParams({
      response_type: 'code',
      scope: ['openid', 'profile', 'email'].join(' '),
      client_id: this.client_id,
      state: this.state_secret,
      team: user.team.id,
      nonce: this.nonce_secret,
      redirect_uri: this.redirect_uri,
    });

    url.search = params.toString();

    return { url: url.toString() };
  }

  async slackCallback(slackCallbackDto: SlackCallbackDto) {
    const token = await this.client.openid.connect.token({
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'authorization_code',
      code: slackCallbackDto.code,
      redirect_uri: this.redirect_uri,
    });

    let userAccessToken = token.access_token;

    if (token.refresh_token) {
      const refreshedToken = await this.client.openid.connect.token({
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      });

      userAccessToken = refreshedToken.access_token;
    }

    const tokenWiredClient = new WebClient(userAccessToken);
    const userInfo = await tokenWiredClient.openid.connect.userInfo();
    const accessToken = await this.jwtService.signAsync(userInfo);
    const frontendUrl = this.configService.get<string>('frontendUrl');

    return { url: `${frontendUrl}/api/slack?access_token=${accessToken}` };
  }
}
