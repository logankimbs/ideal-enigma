import { forwardRef, Module } from '@nestjs/common';
import { InsightsModule } from '../../modules/insights/insights.module';
import { InstallationsModule } from '../../modules/installations/installations.module';
import { TeamsModule } from '../../modules/teams/teams.module';
import { UsersModule } from '../../modules/users/users.module';
import {
  actionRegistry,
  eventRegistry,
  viewRegistry,
} from './listeners/listeners.registry';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';
import { InstallationStore } from './stores/installation.store';

@Module({
  imports: [
    InstallationsModule,
    forwardRef(() => TeamsModule),
    UsersModule,
    InsightsModule,
  ],
  controllers: [SlackController],
  providers: [
    SlackService,
    InstallationStore,
    ...actionRegistry.map((listener) => listener.token),
    ...eventRegistry.map((listener) => listener.token),
    ...viewRegistry.map((listener) => listener.token),
  ],
  exports: [SlackService],
})
export class SlackModule {}
