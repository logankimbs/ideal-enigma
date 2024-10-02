import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Installation } from "./installation.entity";
import { InstallationController } from "./installation.controller";
import { InstallationService } from "./installation.service";

@Module({
  imports: [TypeOrmModule.forFeature([Installation])],
  controllers: [InstallationController],
  providers: [InstallationService],
  exports: [TypeOrmModule],
})
export class InstallationModule {}
