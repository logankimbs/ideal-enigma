import { Module } from "@nestjs/common";
import { Config } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { Modules } from "./modules";
// import { AuthGuard } from "./modules/auth/auth.gaurd";

@Module({
  imports: [Config, DatabaseModule, ...Modules],
  providers: [
    // Makes all endpoint private
    // { provide: "APP_GUARD", useClass: AuthGuard },
  ],
})
export class AppModule {}
