import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './common/guards/auth.guard';
import appConfig from './config/app.config';
import dataSource from './infra/database/data-source';
import { OpenAIModule } from './infra/openai/openai.module';
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
  OpenAIModule,
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
