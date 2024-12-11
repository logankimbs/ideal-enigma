import { Module } from '@nestjs/common';
import { InstallationModule } from '../installation/installation.module';
import { TeamModule } from '../team/team.module';
import { UserModule } from '../user/user.module';
import { SlackController } from './slack.controller';
import { SlackInstallationStore } from './slack.installation.store';
import { SlackService } from './slack.service';

@Module({
  imports: [InstallationModule, TeamModule, UserModule],
  controllers: [SlackController],
  providers: [SlackService, SlackInstallationStore],
  exports: [SlackService],
})
export class SlackModule {}
