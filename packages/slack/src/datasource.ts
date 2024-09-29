import { DataSource } from "typeorm";
import { join } from "path";
import config from "./config";

let datasource: DataSource | null = null;

const getDatasource = (): DataSource => {
  if (datasource) return datasource;

  datasource = new DataSource({
    type: "postgres",
    synchronize: config.isDev,
    ssl: config.isDev ? false : { rejectUnauthorized: false },
    entities: [join(__dirname, "entities", "*.{ts,js}")],
    migrations: [join(__dirname, "migrations", "*.{ts,js}")],
    ...config.datasource,
  });

  return datasource;
};

export default getDatasource();
