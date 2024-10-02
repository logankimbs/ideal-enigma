import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { DataSource } from "typeorm";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { TeamModule } from "./modules/team/team.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
