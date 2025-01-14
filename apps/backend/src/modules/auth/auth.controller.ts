import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('code/:userId')
  async getAuthCode(@Param('userId') userId: string) {
    return await this.authService.getAuthCode(userId);
  }

  @Public()
  @Get('code/validate/:code')
  async validateAuthCode(@Param('code') code: string) {
    return await this.authService.validateAuthCode(code);
  }
}
