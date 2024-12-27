import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<User> {
    try {
      return await this.usersService.findOne(params.id);
    } catch (error: unknown) {
      throw Error(`User does not exist. ${error}`);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error: unknown) {
      return `Unable to create user. ${error}`;
    }
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @Get(':userId/isOnboardingComplete')
  async isOnboardingComplete(@Param('userId') userId: string) {
    return await this.usersService.isOnboardingComplete(userId);
  }

  @Post('enableNotifications')
  async batchEnableNotifications(@Body('userIds') userIds: string[]) {
    await this.usersService.batchEnableNotifications(userIds);
    return true;
  }

  @Put(':userId/completeOnboarding')
  async completeOnboarding(@Param('userId') userId: string) {
    return await this.usersService.completeOnboarding(userId);
  }

  @Get(':userId/tags/analytics')
  async getAnalyticsTags(@Param('userId') userId: string) {
    return await this.usersService.getUserWeeklyTagCountAndChange(userId);
  }

  @Get('team/:teamId/tags/analytics')
  async getTeamAnalyticsTags(@Param('teamId') teamId: string) {
    return await this.usersService.getTeamWeeklyTagCountAndChange(teamId);
  }

  @Get(':userId/insights/streak')
  async getUserInsightStreak(@Param('userId') userId: string) {
    return await this.usersService.getUserInsightStreak(userId);
  }
  @Get(':userId/insights/average')
  async getUserInsightAverage(@Param('userId') userId: string) {
    return await this.usersService.getUserInsightAverage(userId);
  }

}
