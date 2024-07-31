import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "albatross",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
