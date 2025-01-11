import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('code/:userId')
  async getAuthCode(@Param('userId') userId: string) {
    return await this.authService.getAuthCode(userId);
  }
}
