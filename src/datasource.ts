import config from "./config";
import { DataSource, DataSourceOptions } from "typeorm";
import {
  TeamEntity,
  InstallationEntity,
  UserEntity,
  InsightEntity,
  TagEntity,
} from "./entities";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const baseDatasource: DataSourceOptions = {
  type: "postgres",
  ...config.database,
  entities: [
    TeamEntity,
    InstallationEntity,
    UserEntity,
    InsightEntity,
    TagEntity,
  ],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
};

let datasourceInstance: DataSource | null = null;

const getDatasource = (): DataSource => {
  if (!datasourceInstance) {
    const specDatasource = config.isDev
      ? { synchronize: true }
      : { ssl: { rejectUnauthorized: false } };

    datasourceInstance = new DataSource({
      ...baseDatasource,
      ...specDatasource,
    });
  }

  return datasourceInstance;
};

export default getDatasource();
