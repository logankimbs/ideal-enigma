import { Module } from '@nestjs/common';
import { OpenAIModule } from '../../../infra/openai/openai.module';
import { SlackModule } from '../../../infra/slack/slack.module';
import { InsightsModule } from '../../insights/insights.module';
import { InstallationsModule } from '../../installations/installations.module';
import { TeamsModule } from '../../teams/teams.module';
import { SummariesModule } from '../summaries.module';
import { GenerateSummariesTaskService } from './generate-summaries.task.service';

@Module({
  imports: [
    SummariesModule,
    InstallationsModule,
    InsightsModule,
    OpenAIModule,
    SlackModule,
    TeamsModule,
  ],
  providers: [GenerateSummariesTaskService],
  exports: [GenerateSummariesTaskService],
})
export class GenerateSummariesTaskModule {}
