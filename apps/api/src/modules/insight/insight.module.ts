import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Insight } from "./insight.entity";
import { InsightService } from "./insight.service";
import { InsightController } from "./insight.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Insight])],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
