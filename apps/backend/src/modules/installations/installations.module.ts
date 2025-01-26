import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installation } from '../../infra/database/entities/installation.entity';
import { InstallationsController } from './installations.controller';
import { InstallationsService } from './installations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Installation])],
  controllers: [InstallationsController],
  providers: [InstallationsService],
  exports: [InstallationsService],
})
export class InstallationsModule {}
