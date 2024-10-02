import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { DatabaseModule } from "./database/database.module";
import { TeamModule } from "./modules/team/team.module";
import { TagModule } from "./modules/tag/tag.module";
import { InstallationModule } from "./modules/installation/installation.module";
import { InsightModule } from "./modules/insight/insight.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
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
export class AppModule {}
