import { UserEntity } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }
}
