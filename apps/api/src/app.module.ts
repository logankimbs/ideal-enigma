import { Module } from "@nestjs/common";
import { Config } from "./config/config.module.";
import { Modules } from "./modules";
import { Database } from "./database/database.module";

@Module({ imports: [Config, Database, ...Modules] })
export class AppModule {}
