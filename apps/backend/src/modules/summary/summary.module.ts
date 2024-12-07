import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightModule } from '../insight/insight.module';
import { InstallationModule } from '../installation/installation.module';
import { TeamModule } from '../team/team.module';
import { SummaryController } from './summary.controller';
import { Summary } from './summary.entity';
import { SummaryService } from './summary.service';

@Module({
  imports: [
    forwardRef(() => TeamModule),
    forwardRef(() => InsightModule),
    InstallationModule,
    TypeOrmModule.forFeature([Summary]),
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
  exports: [SummaryService],
})
export class SummaryModule {}
