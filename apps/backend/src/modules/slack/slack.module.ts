import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { InstallationsModule } from '../installations/installations.module';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { SlackController } from './slack.controller';
import { SlackInstallationStore } from './slack.installation.store';
import { SlackService } from './slack.service';

@Module({
  imports: [
    InstallationsModule,
    TeamsModule,
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [SlackController],
  providers: [SlackService, SlackInstallationStore],
  exports: [SlackService],
})
export class SlackModule {}
