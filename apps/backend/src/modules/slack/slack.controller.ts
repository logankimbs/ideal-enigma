import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Public } from '../../common/constants';
import { SlackCallbackDto } from '../auth/dto/slack-callback.dto';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Public()
  @Get('install')
  async install(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    return await this.slackService.handleInstall(req, res);
  }

  @Public()
  @Get('install/callback')
  @Redirect()
  async installRedirect(
    @Req() req: IncomingMessage,
    @Res() res: ServerResponse
  ) {
    return await this.slackService.handleInstallRedirect(req, res);
  }

  @Public()
  @Get('onboard')
  @Redirect()
  async slackCallback(@Query() slackCallbackDto: SlackCallbackDto) {
    return this.slackService.handleOnboardLogin(slackCallbackDto);
  }
}
