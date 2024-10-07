import { Module } from "@nestjs/common";
import { Config } from "./config/config.module.";
import { DatabaseModule } from "./database/database.module";
import { Modules } from "./modules";

@Module({ imports: [Config, DatabaseModule, ...Modules] })
export class AppModule {}
