import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TlsOptions } from 'tls';
import { Insight } from '../modules/insight';
import { Installation } from '../modules/installation';
import { Tag } from '../modules/tag';
import { Team } from '../modules/team';
import { User } from '../modules/user';

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
        // entities: [__dirname + '/../**/*.entity.js'],
        entities: [Insight, Installation, Tag, Team, User],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
