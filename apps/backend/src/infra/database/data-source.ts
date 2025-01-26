import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { Insight } from './entities/insight.entity';
import { Installation } from './entities/installation.entity';
import { Summary } from './entities/summary.entity';
import { Tag } from './entities/tag.entity';
import { Team } from './entities/team.entity';
import { User } from './entities/user.entity';

export default (configService: ConfigService): DataSourceOptions => {
  const entities = [Insight, Installation, Tag, Team, User, Summary];
  const isDevelopment =
    configService.get<string>('environment') === 'development';

  return {
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    database: configService.get<string>('database.name'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    synchronize: true, // Todo: figure out migrations then set to false.
    ssl: !isDevelopment ? { rejectUnauthorized: false } : false,
    entities: entities,
    migrations: [join(__dirname, '../../infra/database/migrations/*.{js,ts}')],
  };
};
