import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightModule } from '../insight/insight.module';
import { SummaryModule } from '../summary/summary.module';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Module({
  imports: [
    forwardRef(() => InsightModule),
    forwardRef(() => SummaryModule),
    TypeOrmModule.forFeature([Team]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
