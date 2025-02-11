import { Module } from '@nestjs/common';
import { SlackModule } from '../../../infra/slack/slack.module';
import { InstallationsModule } from '../../installations/installations.module';
import { TeamsModule } from '../teams.module';
import { ScheduleTeamReminderTaskService } from './schedule-team-reminder.task.service';

@Module({
  imports: [InstallationsModule, TeamsModule, SlackModule],
  providers: [ScheduleTeamReminderTaskService],
  exports: [ScheduleTeamReminderTaskService],
})
export class ScheduleTeamReminderTaskModule {}
