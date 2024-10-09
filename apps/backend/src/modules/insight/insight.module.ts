import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "../tag";
import { User } from "../user";
import { InsightController } from "./insight.controller";
import { Insight } from "./insight.entity";
import { InsightService } from "./insight.service";

@Module({
  imports: [TypeOrmModule.forFeature([Insight, User, Tag])],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
