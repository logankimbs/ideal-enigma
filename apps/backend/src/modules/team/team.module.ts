import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightModule } from '../insight/insight.module';
import { SummaryModule } from '../summary/summary.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Module({
  imports: [
    forwardRef(() => InsightModule),
    forwardRef(() => SummaryModule),
    TypeOrmModule.forFeature([Team]),
    forwardRef(() => UserModule),
    TagModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
