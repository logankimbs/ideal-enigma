import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Team } from '../team/team.entity';
import {TagModule} from "../tag/tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([User, Team]), TagModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
