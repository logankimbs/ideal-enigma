import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }
}
