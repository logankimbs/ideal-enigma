import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { TlsOptions } from "tls";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        port: configService.get<number>("database.port"),
        host: configService.get<string>("database.host"),
        database: configService.get<string>("database.name"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        synchronize: configService.get<boolean>("database.synchronize"),
        ssl: configService.get<boolean | TlsOptions>("database.ssl"),
        entities: [__dirname + "/../**/*.entity.js"],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
