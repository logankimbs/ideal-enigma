import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstallationController } from "./installation.controller";
import { Installation } from "./installation.entity";
import { InstallationService } from "./installation.service";

@Module({
  imports: [TypeOrmModule.forFeature([Installation])],
  controllers: [InstallationController],
  providers: [InstallationService],
})
export class InstallationModule {}
