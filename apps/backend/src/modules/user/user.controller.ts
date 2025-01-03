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

  // Called when user joins team after post install.
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createAndSendWelcomeMessage(createUserDto);
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

  @Get(':userId/stats')
  async getUserStats(@Param('userId') userId: string) {
    return await this.usersService.getUserStats(userId);
  }
}
