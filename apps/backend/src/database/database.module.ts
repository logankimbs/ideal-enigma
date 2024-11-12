import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TlsOptions } from 'tls';
import { Insight } from '../modules/insight/insight.entity';
import { Installation } from '../modules/installation/installation.entity';
import { Summary } from '../modules/summary/summary.entity';
import { Tag } from '../modules/tag/tag.entity';
import { Team } from '../modules/team/team.entity';
import { User } from '../modules/user/user.entity';

const entities = [Insight, Installation, Tag, Team, User, Summary];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get<number>('database.port'),
        host: configService.get<string>('database.host'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        synchronize: configService.get<boolean>('database.synchronize'),
        ssl: configService.get<boolean | TlsOptions>('database.ssl'),
        entities,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
