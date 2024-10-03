import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
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
    return await this.usersService.create(createUserDto);
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }
}
