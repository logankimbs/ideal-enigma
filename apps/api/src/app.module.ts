import { Module } from "@nestjs/common";
import { Config } from "./config/config.module.";
import { Modules } from "./modules";
import { DatabaseModule } from "./database/database.module";

@Module({ imports: [Config, DatabaseModule, ...Modules] })
export class AppModule {}
