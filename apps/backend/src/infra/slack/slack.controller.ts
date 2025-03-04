import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Public } from '../../common/decorators/public.decorator';
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

  @Post('message/welcome')
  async sendWelcomeMessage(@Body('teamId') teamId: string) {
    return await this.slackService.sendWelcomeMessageToTeam(teamId);
  }
}
