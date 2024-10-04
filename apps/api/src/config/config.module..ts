import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

const config = () => {
  const isDev = process.env.NODE_ENV === "development";

  return {
    port: parseInt(process.env.PORT || "3001", 10),
    database: {
      port: parseInt(process.env.DATABASE_PORT || "5432", 10),
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: isDev,
      ssl: !isDev ? { rejectUnauthorized: false } : false,
    },
  };
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class Config {}
