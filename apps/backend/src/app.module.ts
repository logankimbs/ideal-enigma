import { Module } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { Config } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { InsightsModule } from './modules/insights/insights.module';
import { InstallationsModule } from './modules/installations/installations.module';
import { SlackModule } from './modules/slack/slack.module';
import { SummariesModule } from './modules/summaries/summaries.module';
import { TagsModule } from './modules/tags/tags.module';
import { TeamsModule } from './modules/teams/teams.module';
import { UsersModule } from './modules/users/users.module';

const Modules = [
  AuthModule,
  InsightsModule,
  InstallationsModule,
  TagsModule,
  TeamsModule,
  UsersModule,
  SummariesModule,
  SlackModule,
];

@Module({
  imports: [Config, DatabaseModule, ...Modules],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
