import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { DataSource } from "typeorm";
import { DatabaseModule } from "./database/database.module";
import { TeamModule } from "./modules/team/team.module";
import { TagModule } from "./modules/tag/tag.module";
import { InstallationModule } from "./modules/installation/installation.module";
import { InsightModule } from "./modules/insight/insight.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    UsersModule,
    TeamModule,
    TagModule,
    InstallationModule,
    InsightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
