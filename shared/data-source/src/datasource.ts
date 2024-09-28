import { DataSource } from "typeorm";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

let datasource: DataSource | null = null;

const getDatasource = (): DataSource => {
  console.log("Accessing the shared datasource");
  const dev = process.env.NODE_ENV === "development";

  if (datasource) return datasource;

  console.log(process.env.DATABASE_HOST,process.env.DATABASE_NAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD)

  datasource = new DataSource({
    type: "postgres",
    synchronize: dev,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: dev ? false : { rejectUnauthorized: false },
    entities: [join(__dirname, "entities", "*.{ts,js}")],
    migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  });

  return datasource;
};

export default getDatasource();