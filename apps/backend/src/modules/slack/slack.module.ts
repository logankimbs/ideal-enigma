import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { InstallationModule } from '../installation/installation.module';
import { TeamModule } from '../team/team.module';
import { UserModule } from '../user/user.module';
import { SlackController } from './slack.controller';
import { SlackInstallationStore } from './slack.installation.store';
import { SlackService } from './slack.service';

@Module({
  imports: [
    InstallationModule,
    TeamModule,
    UserModule,
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
