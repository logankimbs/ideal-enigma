import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + "/../**/*.entity.js"],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
