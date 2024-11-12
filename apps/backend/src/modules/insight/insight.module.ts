import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightController } from './insight.controller';
import { Insight } from './insight.entity';
import { InsightService } from './insight.service';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Insight, User, Tag])],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
