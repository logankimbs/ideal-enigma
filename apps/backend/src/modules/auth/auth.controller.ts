import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { SlackAuthorizeDto } from './dto/slack-authorize.dto';
import { SlackCallbackDto } from './dto/slack-callback.dto';

const frontend_url = process.env.FRONTEND_URL;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('slack')
  @Redirect('https://slack.com', 302)
  slackAuthorize(@Query() slackAuthorizeDto: SlackAuthorizeDto) {
    return this.authService.slackAuthorize(slackAuthorizeDto);
  }

  @Public()
  @Get('slack/callback')
  @Redirect(frontend_url, 302)
  async slackCallback(@Query() slackCallbackDto: SlackCallbackDto) {
    return this.authService.slackCallback(slackCallbackDto);
  }
}
