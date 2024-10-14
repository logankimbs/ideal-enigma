import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  CreateUserDto,
  CreateUsersListDto,
  CreateUsersListQueryDto,
} from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(":id")
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

  @Post("batch")
  async createBatch(
    @Query() createUsersListQueryDto: CreateUsersListQueryDto,
    @Body() createUsersListDto: CreateUsersListDto,
  ) {
    return await this.usersService.createBatch(
      createUsersListQueryDto,
      createUsersListDto,
    );
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }
}
