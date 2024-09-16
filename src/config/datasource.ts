import { DataSource, DataSourceOptions } from "typeorm"
import {
  TeamEntity,
  InstallationEntity,
  UserEntity,
  InsightEntity,
} from "../entities"
import logger from "../utils/logger"

const baseDatasource: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [TeamEntity, InstallationEntity, UserEntity, InsightEntity],
  migrations: [],
  subscribers: [],
}

let datasourceInstance: DataSource | null = null

const getDatasource = (): DataSource => {
  if (!datasourceInstance) {
    logger.info("Initializing database")

    const isDev = process.env.NODE_ENV === "development"
    const specDatasource = isDev
      ? { synchronize: true }
      : { ssl: { rejectUnauthorized: false } }

    datasourceInstance = new DataSource({
      ...baseDatasource,
      ...specDatasource,
    })
  }

  return datasourceInstance
}

export const datasource = getDatasource()
