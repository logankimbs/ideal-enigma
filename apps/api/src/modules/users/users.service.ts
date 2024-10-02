import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
