import { DataSource } from "typeorm";
import { join } from "path";

let datasource: DataSource | null = null;

const getDatasource = (): DataSource => {
  const dev = process.env.NODE_ENV === "development";
  if (datasource) return datasource;

  datasource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: dev,
    ssl: dev ? false : { rejectUnauthorized: false },
    entities: [join(__dirname, "entities", "*.{ts,js}")],
    migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  });

  return datasource;
};

export default getDatasource();