import { CustomDataSource } from "./classes/CustomDataSource";
import { join } from "path";

let datasource: CustomDataSource | null = null;

const getDatasource = (): CustomDataSource => {
  if (datasource) return datasource;

  const isDev = process.env.NODE_ENV === "development";

  datasource = new CustomDataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: isDev,
    ssl: !isDev ? { rejectUnauthorized: false } : false,
    entities: [join(__dirname, "entities", "*.{ts,js}")],
    migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  });

  return datasource;
};

export default getDatasource;
