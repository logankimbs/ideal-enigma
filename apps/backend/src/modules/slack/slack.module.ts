import { Module } from '@nestjs/common';
import { InstallationsModule } from '../installations/installations.module';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { SlackController } from './slack.controller';
import { SlackInstallationStore } from './slack.installation.store';
import { SlackService } from './slack.service';

@Module({
  imports: [InstallationsModule, TeamsModule, UsersModule],
  controllers: [SlackController],
  providers: [SlackService, SlackInstallationStore],
  exports: [SlackService],
})
export class SlackModule {}
