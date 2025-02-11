import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './common/guards/auth.guard';
import appConfig from './config/app.config';
import dataSource from './infra/database/data-source';
import { OpenAIModule } from './infra/openai/openai.module';
import { SlackModule } from './infra/slack/slack.module';
import { AuthModule } from './modules/auth/auth.module';
import { InsightsModule } from './modules/insights/insights.module';
import { InstallationsModule } from './modules/installations/installations.module';
import { SummariesModule } from './modules/summaries/summaries.module';
import { GenerateSummariesTaskModule } from './modules/summaries/tasks/generate-summaries.task.module';
import { TagsModule } from './modules/tags/tags.module';
import { ScheduleTeamReminderTaskModule } from './modules/teams/tasks/schedule-team-reminder.task.module';
import { TeamsModule } from './modules/teams/teams.module';
import { UsersModule } from './modules/users/users.module';

const TaskModules = [
  GenerateSummariesTaskModule,
  ScheduleTeamReminderTaskModule,
];

const Modules = [
  AuthModule,
  InsightsModule,
  InstallationsModule,
  TagsModule,
  TeamsModule,
  UsersModule,
  SummariesModule,
  SlackModule,
  OpenAIModule,
  ...TaskModules,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => dataSource(configService),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ScheduleModule.forRoot(),
    ...Modules,
  ],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
