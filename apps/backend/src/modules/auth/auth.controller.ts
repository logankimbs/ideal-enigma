import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SlackAuthorizeDto } from './dto/slack-authorize.dto';
import { SlackCallbackDto } from './dto/slack-callback.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { Public } from '../../common/constants';

const frontend_url = process.env.FRONTEND_URL;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('slack-login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public() // Should this be public?
  @HttpCode(HttpStatus.OK)
  @Post('validate-token')
  validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    return this.authService.validateToken(validateTokenDto);
  }

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
