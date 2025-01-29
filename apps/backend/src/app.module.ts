import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Config } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { InsightModule } from './modules/insight/insight.module';
import { InstallationModule } from './modules/installation/installation.module';
import { SlackModule } from './modules/slack/slack.module';
import { SummaryModule } from './modules/summary/summary.module';
import { TagModule } from './modules/tag/tag.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';

const Modules = [
  AuthModule,
  InsightModule,
  InstallationModule,
  TagModule,
  TeamModule,
  UserModule,
  SummaryModule,
  SlackModule,
  TasksModule,
];

@Module({
  imports: [Config, DatabaseModule, ScheduleModule.forRoot(), ...Modules],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
