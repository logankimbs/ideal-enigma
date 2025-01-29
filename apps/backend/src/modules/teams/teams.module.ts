import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../infra/database/entities/team.entity';
import { InsightsModule } from '../insights/insights.module';
import { SummariesModule } from '../summaries/summaries.module';
import { UsersModule } from '../users/users.module';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    forwardRef(() => InsightsModule),
    forwardRef(() => SummariesModule),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Team]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
