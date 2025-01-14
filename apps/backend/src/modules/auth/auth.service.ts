import { User } from '@ideal-enigma/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SlackService } from '../slack/slack.service';
import { UserService } from '../user/user.service';

const CODE_EXPIRY_MS = 300000; // 5 minutes

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
    private slackService: SlackService
  ) {}

  // TODO: DONT STORE THE WHOLE USER. THIS TAKES UP MEMORY!
  async getAuthCode(userId: string) {
    console.log('generating auth code for', userId);

    const user = await this.userService.findOne(userId);
    const code = uuid();
    await this.cacheManager.set(code, user, CODE_EXPIRY_MS);

    console.log('auth code generated', code);
    return code;
  }

  /** Validates auth code and returns the auth redirect url for slack login. **/
  async validateAuthCode(code: string) {
    const user = await this.cacheManager.get<User>(code);
    console.log('code belongs to', user.id);

    if (!user) {
      console.log('Auth code validation failed:', code);
      throw new UnauthorizedException('Invalid or expired auth code');
    }

    await this.cacheManager.del(code);
    const url = this.slackService.getAuthUrl(user.team.id);
    console.log('Generated auth URL for user:', user.id);

    return { url };
  }
}
