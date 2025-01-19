import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insight } from '../domain/entities/insight.entity';
import { Installation } from '../domain/entities/installation.entity';
import { Summary } from '../domain/entities/summary.entity';
import { Tag } from '../domain/entities/tag.entity';
import { Team } from '../domain/entities/team.entity';
import { User } from '../domain/entities/user.entity';

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
        ssl: configService.get<boolean>('database.ssl'),
        entities,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
