import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async findUserById(@Param('userId') userId: string) {
    return await this.usersService.findUserById(userId);
  }

  @Get(':userId/isOnboardingComplete')
  async isOnboardingComplete(@Param('userId') userId: string) {
    return await this.usersService.isOnboardingComplete(userId);
  }

  // Todo: move to team controller
  @Post('enableNotifications')
  async batchEnableNotifications(@Body('userIds') userIds: string[]) {
    await this.usersService.batchEnableNotifications(userIds);
    return true;
  }

  @Put(':userId/completeOnboarding')
  async completeOnboarding(@Param('userId') userId: string) {
    return await this.usersService.completeOnboarding(userId);
  }

  @Get(':userId/stats')
  async getUserStats(@Param('userId') userId: string) {
    return await this.usersService.getUserStats(userId);
  }
}
