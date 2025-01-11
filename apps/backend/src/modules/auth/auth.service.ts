import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebClient } from '@slack/web-api';
import { v4 as uuid } from 'uuid';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SlackAuthorizeDto } from './dto/slack-authorize.dto';
import { SlackCallbackDto } from './dto/slack-callback.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

type AuthPayload = {
  access_token: string;
};

const backend_url = process.env.BACKEND_URL;
const slack_callback_path = '/auth/slack/callback';
const redirect_uri = backend_url + slack_callback_path;
const frontend_url = process.env.FRONTEND_URL;

@Injectable()
export class AuthService {
  client: WebClient;
  client_id: string;
  client_secret: string;
  state_secret: string;
  nonce_secret: string;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.client = new WebClient();

    // Why does this seem weird?
    this.client_id = this.configService.get<string>('slack.clientId')!;
    this.client_secret = this.configService.get<string>('slack.clientSecret')!;
    this.state_secret = this.configService.get<string>('slack.openId.state')!;
    this.nonce_secret = this.configService.get<string>('slack.openId.nonce')!;
  }

  async generateLoginCode(userId: string) {
    const code = uuid();
    await this.cacheManager.set(code, userId, 300000);

    return code;
  }

  async login(loginDto: LoginDto): Promise<AuthPayload> {
    const user = await this.userService.findOne(loginDto.id);

    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validateToken(validateTokenDto: ValidateTokenDto) {
    try {
      const payload = this.jwtService.verify(validateTokenDto.token);
      const user = await this.userService.findOne(payload.sub);

      if (!user) throw new UnauthorizedException('User not found');

      // Generate a new token for the session
      const authToken = this.jwtService.sign(
        { sub: user.id, email: user.data.profile.email },
        { expiresIn: '1h' }
      );

      return { authToken };
    } catch (error: unknown) {
      console.log('Error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async slackAuthorize(slackAuthorizeDto: SlackAuthorizeDto) {
    const user = await this.userService.findOne(slackAuthorizeDto.user);

    if (!user) throw new UnauthorizedException();

    const url = new URL('https://slack.com/openid/connect/authorize');
    const params = new URLSearchParams({
      response_type: 'code',
      scope: ['openid', 'profile', 'email'].join(' '),
      client_id: this.client_id,
      state: this.state_secret,
      team: user.team.id,
      nonce: this.nonce_secret,
      redirect_uri: redirect_uri,
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
      redirect_uri,
    });

    let userAccessToken = token.access_token;

    if (token.refresh_token) {
      // token.refresh_token can exist if the token rotation is enabled.
      // The following lines of code demonstrate how to refresh the token.
      // If you don't enable token rotation, you can safely remove this part.
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

    return { url: `${frontend_url}/api/slack?access_token=${accessToken}` };
  }
}
