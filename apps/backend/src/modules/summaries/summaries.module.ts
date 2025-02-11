import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from '../../infra/database/entities/summary.entity';
import { InsightsModule } from '../insights/insights.module';
import { InstallationsModule } from '../installations/installations.module';
import { TeamsModule } from '../teams/teams.module';
import { SummariesController } from './summaries.controller';
import { SummariesService } from './summaries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Summary]),
    forwardRef(() => TeamsModule),
    forwardRef(() => InsightsModule),
    InstallationsModule,
  ],
  controllers: [SummariesController],
  providers: [SummariesService],
  exports: [SummariesService],
})
export class SummariesModule {}
