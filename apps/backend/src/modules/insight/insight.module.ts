import { Insight, Tag, User } from "@idealgma/common";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InsightController } from "./insight.controller";
import { InsightService } from "./insight.service";

@Module({
  imports: [TypeOrmModule.forFeature([Insight, User, Tag])],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
