import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import {
  Company,
  CompanyIntegration,
  Insight,
  InsightTag,
  Integration,
  Tag,
  User,
  UserIntegration,
} from "./entities";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Company,
    // CompanyIntegration,
    Insight,
    // InsightTag,
    // Integration,
    Tag,
    User,
    // UserIntegration,
  ],
  migrations: [],
  subscribers: [],
});
